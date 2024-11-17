import React from "react"
import { StyleSheet, View } from "react-native"
import LottieView from "lottie-react-native"
import { CommonColor } from "style/CommonStyle"
import { isTablet } from "store"

interface SplashProps {
    onAnimationFinish: () => void
}

const mobileSplash = require("asset/lottie/splash_mobile.json")
const tabletSplash = require("asset/lottie/splash_tablet.json")
export const Splash = ({ onAnimationFinish }: SplashProps) => {
    return (
        <View style={styles.view}>
            <LottieView style={styles.lottie} source={isTablet ? tabletSplash : mobileSplash} onAnimationFinish={onAnimationFinish} autoPlay loop={false} />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: CommonColor.main_blue
    },
    lottie: {
        width: "100%",
        height: "70%"
    }
})
