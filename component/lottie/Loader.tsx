import React, { useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import LottieView from "lottie-react-native"

const Loader = ({ style }: { style?: any }) => {
    const [completed, setCompleted] = useState(false)

    if (completed) {
        return <></>
    }

    return (
        <View style={styles.view}>
            <LottieView style={[style, styles.lottie]} source={require("../../asset/lottie/loading.json")} onAnimationFinish={() => setCompleted(true)} autoPlay loop={true} />
            {/* <Image style={styles.lottie} source={require("../../asset/icon/icon_lottie_hanger.svg")} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        width: "100%",
        height: "100%"
    },
    lottie: {
        width: "100%",
        height: 200,
        // height: 500,
        backgroundColor: "#faf"
    }
})

export default Loader
