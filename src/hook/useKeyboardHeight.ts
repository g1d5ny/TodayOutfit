import { useEffect, useState } from "react"
import { Keyboard, KeyboardEvent } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

function useKeyboardHeight() {
    const [keyboardHeight, setKeyboardHeight] = useState(0)
    const { bottom } = useSafeAreaInsets()

    function onKeyboardShow({ endCoordinates: { height } }: KeyboardEvent) {
        setKeyboardHeight(height - bottom)
    }

    function onKeyboardHide() {
        setKeyboardHeight(0)
    }

    useEffect(() => {
        const onShow = Keyboard.addListener("keyboardWillShow", onKeyboardShow)
        const onHide = Keyboard.addListener("keyboardWillHide", onKeyboardHide)

        return () => {
            onShow.remove()
            onHide.remove()
        }
    }, [])

    return { keyboardHeight, setKeyboardHeight }
}

export default useKeyboardHeight
