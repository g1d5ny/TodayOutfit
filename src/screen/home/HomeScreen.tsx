import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { currentWeatherInfoState, hourWeatherInfoState, isTablet } from "../../store"
import { useRecoilValue } from "recoil"
import Loader from "../../component/lottie/Loader"
import { useRef, useState } from "react"
import { CommonColor, CommonStyle, screenHeight, ShadowStyle, TAB_HEIGHT } from "../../style/CommonStyle"
import ArrowDown from "../../asset/icon/icon_arrow_down.svg"
import ArrowUp from "../../asset/icon/icon_arrow_up.svg"
import WeatherHeader from "./WeatherHeader"
import WeatherBody from "./WeatherBody"
import { WeatherFooter } from "./WeatherFooter"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type ArrowType = "up" | "down"
export const HomeScreen = () => {
    const currentWeather = useRecoilValue(currentWeatherInfoState)
    const hourWeather = useRecoilValue(hourWeatherInfoState)
    const scrollRef = useRef<ScrollView>(null)
    const viewRef = useRef<View>(null)
    const [arrow, setArrow] = useState<ArrowType>("down")
    const { top, bottom } = useSafeAreaInsets()

    const handleScroll = () => {
        if (arrow === "up") {
            scrollRef?.current?.scrollTo({ y: 0, animated: true })
            setArrow("down")
            return
        }
        viewRef?.current?.measureLayout(scrollRef?.current?.getInnerViewNode(), (x, y) => {
            scrollRef?.current?.scrollTo({ y, animated: true })
            setArrow("up")
        })
    }

    return (
        <View style={CommonStyle.flex}>
            {!currentWeather || !hourWeather ? (
                <Loader />
            ) : (
                <View>
                    <ScrollView
                        ref={scrollRef}
                        scrollEventThrottle={0}
                        onScroll={({
                            nativeEvent: {
                                contentOffset: { y },
                                layoutMeasurement: { height }
                            }
                        }) => setArrow(y >= height / 2 ? "up" : "down")}
                    >
                        <ImageBackground
                            source={currentWeather.is_day ? require("asset/image/image_day_background.png") : require("asset/image/image_night_background.png")}
                            resizeMode='cover'
                            style={[CommonStyle.padding, { height: screenHeight - bottom - TAB_HEIGHT, paddingTop: top + styles.vertical.paddingVertical }]}
                        >
                            <WeatherHeader />
                            <WeatherBody />
                        </ImageBackground>
                        <WeatherFooter viewRef={viewRef} />
                    </ScrollView>
                    <TouchableOpacity onPress={handleScroll} style={[styles.scroller, ShadowStyle, { bottom: isTablet ? 21 : 8 }]}>
                        {arrow === "down" ? <ArrowDown /> : <ArrowUp />}
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    vertical: {
        paddingVertical: isTablet ? 54 : 26
    },
    scroller: {
        width: 52,
        height: 52,
        borderRadius: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        position: "absolute",
        right: CommonStyle.padding.paddingHorizontal
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
    }
})
