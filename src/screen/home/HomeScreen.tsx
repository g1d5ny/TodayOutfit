import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { currentWeatherInfoState, hourWeatherInfoState, isTablet, todayWeatherInfoState } from "../../store"
import { useWeatherHook } from "../../hook/useWeatherHook"
import { useRecoilValue } from "recoil"
import Loader from "../../component/lottie/Loader"
import { useEffect, useState } from "react"
import { CommonColor, CommonStyle } from "../../style/CommonStyle"
import ArrowDown from "../../asset/icon/icon_arrow_down.svg"
import ArrowUp from "../../asset/icon/icon_arrow_up.svg"
import WeatherHeader from "./WeatherHeader"
import WeatherBody from "./WeatherBody"
import WeatherFooter from "./WeatherFooter"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const HomeScreen = () => {
    const currentWeather = useRecoilValue(currentWeatherInfoState)
    const hourWeather = useRecoilValue(hourWeatherInfoState)
    const todayWeather = useRecoilValue(todayWeatherInfoState)
    const [arrow, setArrow] = useState("down")
    const { top } = useSafeAreaInsets()

    return (
        <View style={CommonStyle.flex}>
            {!currentWeather || !hourWeather || !todayWeather ? (
                <View style={CommonStyle.flex}>
                    <Loader />
                </View>
            ) : (
                <ScrollView style={CommonStyle.flex}>
                    <ImageBackground source={require("../../asset/image/image_background.png")} resizeMode='cover' style={{ flex: 1, paddingHorizontal: isTablet ? 32 : 16 }}>
                        <SafeAreaView style={{ flex: 1 }}>
                            <View style={styles.bar} />
                            <WeatherHeader />
                            <WeatherBody />
                            <TouchableOpacity style={styles.scroller}>{arrow === "down" ? <ArrowDown /> : <ArrowUp />}</TouchableOpacity>
                        </SafeAreaView>
                    </ImageBackground>
                    <WeatherFooter />
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    scroller: {
        width: 52,
        height: 52,
        borderRadius: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end"
    },
    weatherContainer: {
        marginTop: 26
    },
    clothesDesc: {
        paddingVertical: isTablet ? 10 : 9,
        paddingHorizontal: isTablet ? 10 : 9
    },
    clothes: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    recom: {
        width: isTablet ? 174 : 136,
        height: isTablet ? 239 : 186,
        borderRadius: 10,
        backgroundColor: CommonColor.main_white
    },
    recomContainer: {
        flexDirection: isTablet ? "row" : "column",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: 9
    },
    character: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: isTablet ? "flex-start" : "center",
        flexDirection: "row",
        marginTop: isTablet ? 40 : 20
    },
    tempView: {
        flexDirection: "row",
        alignItems: "center"
    },
    addrView: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center"
    },
    weatherDesc: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    bar: {
        width: "100%",
        height: 2,
        backgroundColor: "#fff",
        marginTop: isTablet ? 6 : 11
    }
})
