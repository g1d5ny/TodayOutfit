import React, { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavController } from "./src/navigation/NavController"
import { RecoilEnv, RecoilRoot } from "recoil"
import RecoilNexus from "recoil-nexus"
import { Splash } from "component/lottie/Splash"
import SplashScreen from "react-native-splash-screen"
import Storage from "@react-native-async-storage/async-storage"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "store"

if (__DEV__) {
    RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false
}

function App(): JSX.Element {
    const [appLoading, setAppLoading] = useState(true)

    useEffect(() => {
        // Storage.removeItem("loggedInState")
        // Storage.removeItem("myAddressList")
        SplashScreen.hide()
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            {appLoading && <Splash onAnimationFinish={() => setAppLoading(false)} />}
            <RecoilRoot>
                <RecoilNexus />
                <SafeAreaProvider>
                    <NavController />
                </SafeAreaProvider>
            </RecoilRoot>
        </QueryClientProvider>
    )
}

export default App
