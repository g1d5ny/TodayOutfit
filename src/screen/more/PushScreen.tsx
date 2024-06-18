// import { useCallback, useMemo } from "react"
// import { Text, TouchableOpacity, View } from "react-native"
// import { useSubscription } from "use-subscription"

// type Store<T> = {
//     getState: () => T
//     setState: (action: T | ((prev: T) => T)) => void
//     subscribe: (callback: () => void) => () => void
// }

// const createStore = <T extends unknown>(initialState: T): Store<T> => {
//     let state = initialState
//     const callbacks = new Set<() => void>()
//     const getState = () => state
//     const setState = (nextState: T | ((prev: T) => T)) => {
//         state = typeof nextState === "function" ? (nextState as (prev: T) => T)(state) : nextState
//         callbacks.forEach(callback => callback())
//     }
//     const subscribe = (callback: () => void) => {
//         callbacks.add(callback)
//         return () => {
//             callbacks.delete(callback)
//         }
//     }
//     return { getState, setState, subscribe }
// }

// const store = createStore({ count1: 0, count2: 0 })

// const useStoreSelector = <T, S>(store: Store<T>, selector: (state: T) => S) => {
//     console.log("store.getState(): ", selector(store.getState()), store.getState())
//     console.log(
//         "11111" +
//             useSubscription(
//                 useMemo(
//                     () => ({
//                         getCurrentValue: () => selector(store.getState()),
//                         subscribe: store.subscribe
//                     }),
//                     [store, selector]
//                 )
//             )
//     )

//     return useSubscription(
//         useMemo(
//             () => ({
//                 getCurrentValue: () => selector(store.getState()),
//                 subscribe: store.subscribe
//             }),
//             [store, selector]
//         )
//     )
// }

// const Component1 = () => {
//     const state = useStoreSelector(
//         store,
//         useCallback(state => state.count1, [])
//     )

//     const inc = () => {
//         store.setState(prev => ({
//             ...prev,
//             count1: prev.count1 + 1
//         }))
//     }
//     return (
//         <View>
//             <Text>count1:{state}</Text>
//             <TouchableOpacity onPress={inc}>
//                 <Text>+1</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// const selectCount2 = (state: ReturnType<typeof store.getState>) => state.count2

// const Component2 = () => {
//     const state = useStoreSelector(store, selectCount2)
//     console.log("state: ", state)
//     const inc = () => {
//         store.setState(prev => ({
//             ...prev,
//             count2: prev.count2 + 1
//         }))
//     }
//     return (
//         <View>
//             <Text> count2:{state} </Text>
//             <TouchableOpacity onPress={inc}>
//                 <Text>+1</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export const PushScreen = () => {
//     return (
//         <>
//             <Component1 />
//             <Component1 />
//             <Component2 />
//             <Component2 />
//         </>
//     )
// }

import { ReactNode, createContext, useContext, useRef, useMemo } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useSubscription } from "use-subscription"

type Store<T> = {
    getState: () => T
    setState: (action: T | ((prev: T) => T)) => void
    subscribe: (callback: () => void) => () => void
}

const createStore = <T extends unknown>(initialState: T): Store<T> => {
    let state = initialState
    const callbacks = new Set<() => void>()
    const getState = () => state
    const setState = (nextState: T | ((prev: T) => T)) => {
        console.log("typeof nextState: ", typeof nextState + ", ", JSON.stringify((nextState as (prev: T) => T)(state)))
        state = typeof nextState === "function" ? (nextState as (prev: T) => T)(state) : nextState
        callbacks.forEach(callback => callback())
    }
    const subscribe = (callback: () => void) => {
        callbacks.add(callback)
        return () => {
            callbacks.delete(callback)
        }
    }
    return { getState, setState, subscribe }
}

type State = { count: number; text?: string }

const StoreContext = createContext<Store<State>>(createStore<State>({ count: 0, text: "hello" }))

const StoreProvider = ({ initialState, children }: { initialState: State; children: ReactNode }) => {
    const storeRef = useRef<Store<State>>()
    console.log("initialState: ", initialState, storeRef.current?.getState())

    if (!storeRef.current) {
        storeRef.current = createStore(initialState)
    }
    return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
}

const useSelector = <S extends unknown>(selector: (state: State) => S) => {
    const store = useContext(StoreContext)
    return useSubscription(
        useMemo(
            () => ({
                getCurrentValue: () => selector(store.getState()),
                subscribe: store.subscribe
            }),
            [store, selector]
        )
    )
}

const useSetState = () => {
    const store = useContext(StoreContext)
    return store.setState
}

const selectCount = (state: State) => state.count

const Component = () => {
    const count = useSelector(selectCount)
    const setState = useSetState()
    const inc = () => {
        setState(prev => ({
            ...prev,
            count: prev.count + 1
        }))
    }
    return (
        <View>
            <Text>count: {count} </Text>
            <TouchableOpacity onPress={inc}>
                <Text>+1</Text>
            </TouchableOpacity>
        </View>
    )
}

export const PushScreen = () => {
    return (
        <>
            <Text>Using default store</Text>
            <Component />
            <Component />
            <StoreProvider initialState={{ count: 10 }}>
                <Text>Using store provider</Text>
                <Component />
                <Component />
                <StoreProvider initialState={{ count: 20 }}>
                    <Text>Using inner store provider</Text>
                    <Component />
                    <View>
                        <Component />
                        <Text>isRender +</Text>
                    </View>
                </StoreProvider>
            </StoreProvider>
        </>
    )
}
