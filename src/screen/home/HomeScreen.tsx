import { fetchCurrentWeatherQuery } from "hook/useCurrentWeatherHook"
import { useDailyWeatherHook } from "hook/useDailyWeatherHook"
import { useCallback, useRef, useState } from "react"
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import ArrowDown from "../../asset/icon/icon_arrow_down.svg"
import ArrowUp from "../../asset/icon/icon_arrow_up.svg"
import Loader from "../../component/lottie/Loader"
import { isTablet } from "../../store"
import { CommonColor, CommonStyle, FontStyle, screenHeight, ShadowStyle, TAB_HEIGHT } from "../../style/CommonStyle"
import WeatherBody from "./WeatherBody"
import { WeatherFooter } from "./WeatherFooter"
import WeatherHeader from "./WeatherHeader"

type ArrowType = "up" | "down"
export const HomeScreen = () => {
    const scrollRef = useRef<ScrollView>(null)
    const viewRef = useRef<View>(null)
    const [arrow, setArrow] = useState<ArrowType>("down")
    const { top, bottom } = useSafeAreaInsets()

    const { data: current } = fetchCurrentWeatherQuery()
    const { data: daily } = useDailyWeatherHook()

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

    const backgroundSource = useCallback(() => {
        if (current?.is_day) {
            return require("asset/image/background/image_day_background.png")
        } else {
            return require("asset/image/background/image_night_background.png")
        }
    }, [current?.is_day])

    return (
        <View style={CommonStyle.flex}>
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
                <ImageBackground source={backgroundSource()} resizeMode='cover' style={[CommonStyle.padding, styles.vertical, { height: screenHeight - bottom - TAB_HEIGHT, paddingTop: top + styles.vertical.paddingVertical }]}>
                    {current ? (
                        <>
                            <WeatherHeader />
                            <WeatherBody />
                        </>
                    ) : (
                        <Loader />
                    )}
                </ImageBackground>
                {daily?.hourlyWeather ? <WeatherFooter viewRef={viewRef} /> : <Loader />}
            </ScrollView>
            <TouchableOpacity onPress={handleScroll} style={[styles.scroller, CommonStyle.row, isTablet && styles.tabletScroller, ShadowStyle]}>
                {arrow === "down" && (
                    <>
                        <Text style={[isTablet ? FontStyle.body1.bold : FontStyle.label2.bold, { color: CommonColor.main_blue }]}>자세한 날씨 보기</Text>
                        <ArrowDown />
                    </>
                )}
                {arrow === "up" && (
                    <>
                        <Text style={[isTablet ? FontStyle.body1.bold : FontStyle.label2.bold, { color: CommonColor.main_blue }]}>요약된 날씨 보기</Text>
                        <ArrowUp />
                    </>
                )}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    vertical: {
        paddingVertical: isTablet ? 54 : 26
    },
    tabletScroller: {
        paddingHorizontal: 18
    },
    scroller: {
        borderRadius: 30,
        gap: 5,
        bottom: 20,
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
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
