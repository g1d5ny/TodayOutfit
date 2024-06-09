import React, { useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import LottieView from "lottie-react-native"

const Loader = () => {
    const [completed, setCompleted] = useState(false)

    if (completed) {
        return <></>
    }

    return (
        <View style={styles.view}>
            <LottieView style={styles.lottie} source={require("../../asset/lottie/progress.json")} onAnimationFinish={() => setCompleted(true)} autoPlay loop={true} />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    lottie: {
        width: "30%",
        height: "30%",
        backgroundColor: "transparent"
    }
})

export default Loader
