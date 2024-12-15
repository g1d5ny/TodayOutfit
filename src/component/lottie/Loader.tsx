import LottieView from "lottie-react-native"
import React, { useState } from "react"
import { StyleSheet } from "react-native"

const Loader = () => {
    const [completed, setCompleted] = useState(false)

    if (completed) {
        return <></>
    }

    return <LottieView style={styles.lottie} source={require("../../asset/lottie/progress.json")} onAnimationFinish={() => setCompleted(true)} autoPlay loop={true} />
}

const styles = StyleSheet.create({
    lottie: {
        width: "100%",
        height: "100%",
        backgroundColor: "transparent"
    }
})

export default Loader
