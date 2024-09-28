import React, { Dispatch, SetStateAction } from "react"
import { StyleSheet, Text, View } from "react-native"
import LottieView from "lottie-react-native"
import { CommonColor } from "style/CommonStyle"

interface SplashProps {
    onAnimationFinish: () => void
}
export const Splash = ({ onAnimationFinish }: SplashProps) => {
    return (
        <View style={styles.view}>
            <Text style={[{ color: CommonColor.sub_yellow }]}>날씨에 맞춘 코디 추천</Text>
            <LottieView style={styles.lottie} source={require("../../asset/lottie/splash.json")} onAnimationFinish={onAnimationFinish} autoPlay loop={false} />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: CommonColor.main_blue
    },
    lottie: {
        width: "30%",
        height: "10%",
        marginTop: 22
    }
})
