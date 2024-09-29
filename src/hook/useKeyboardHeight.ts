import { useEffect, useState } from "react"
import { Keyboard, KeyboardEvent } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { isAos, isIos } from "utils"

function useKeyboardHeight() {
    const [keyboardHeight, setKeyboardHeight] = useState(0)
    const { bottom } = useSafeAreaInsets()

    function onIosKeyboardShow({ endCoordinates: { height } }: KeyboardEvent) {
        if (isIos) {
            setKeyboardHeight(height - bottom)
        }
    }

    function onAndroidKeyboardShow({ endCoordinates: { height } }: KeyboardEvent) {
        if (isAos) {
            setKeyboardHeight(height)
        }
    }

    function onIosKeyboardHide() {
        if (isIos) {
            setKeyboardHeight(0)
        }
    }

    function onAndroidKeyboardHide() {
        if (isAos) {
            setKeyboardHeight(0)
        }
    }

    useEffect(() => {
        const onAndroidShow = Keyboard.addListener("keyboardDidShow", onAndroidKeyboardShow)
        const onIosShow = Keyboard.addListener("keyboardWillShow", onIosKeyboardShow)
        const onAndroidHide = Keyboard.addListener("keyboardDidHide", onAndroidKeyboardHide)
        const onIosHide = Keyboard.addListener("keyboardWillHide", onIosKeyboardHide)

        return () => {
            onAndroidShow.remove()
            onIosShow.remove()
            onAndroidHide.remove()
            onIosHide.remove()
        }
    }, [])

    return { keyboardHeight, setKeyboardHeight }
}

export default useKeyboardHeight
