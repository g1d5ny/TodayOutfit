import { useRef, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { isTablet } from "../../store"
import PagerView from "react-native-pager-view"
import { AppBar, WeatherDetailFooter } from "../../component/CommonComponent"
import { CommonColor, CommonStyle, FontStyle, screenHeight, screenWidth } from "../../style/CommonStyle"
import { UVScreen } from "./UVScreen"
import { FeelsLikeScreen } from "./FeelsLikeScreen"
import { WindSpeedScreen } from "./WindSpeedScreen"
import { WindDirectionScreen } from "./WindDirectionScreen"
import { RainPercentageScreen } from "./RainPercentageScreen"
import { HumidityScreen } from "./HumidityScreen"
import { SnowFallScreen } from "./SnowFallScreen"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { FeelsLikeInfo, HumidityInfo, RainPercentageInfo, SnowFallInfo, UVInfo, WindDirectionInfo, WindSpeedInfo } from "text/DetailInfoText"

const categoryList = [
    {
        title: UVInfo.title,
        footer: UVInfo.footer,
        Component: UVScreen
    },
    {
        title: FeelsLikeInfo.title,
        footer: FeelsLikeInfo.footer,
        Component: FeelsLikeScreen
    },
    {
        title: WindSpeedInfo.title,
        footer: WindSpeedInfo.footer,
        Component: WindSpeedScreen
    },
    { title: WindDirectionInfo.title, footer: WindDirectionInfo.footer, Component: WindDirectionScreen },
    { title: RainPercentageInfo.title, footer: RainPercentageInfo.footer, Component: RainPercentageScreen },
    {
        title: HumidityInfo.title,
        footer: HumidityInfo.footer,
        Component: HumidityScreen
    },
    {
        title: SnowFallInfo.title,
        footer: SnowFallInfo.footer,
        Component: SnowFallScreen
    }
]
const HEADERS = isTablet ? 116 : 104
const FOOTER = isTablet ? 108 : 104
export const WeatherDetailScreen = ({ route }: { route: any }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(route.params.index ?? 0)
    const ref = useRef<any>(null) // PagerView로 타입해야함
    const { top, bottom } = useSafeAreaInsets()

    const WeatherHeader = () => {
        const setCategory = (index: number) => {
            setSelectedIndex(index)
            ref.current?.setPage(index)
        }

        return (
            <View style={styles.view}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={CommonStyle.padding}>
                    {categoryList.map(({ title }, index) => {
                        const isSelectedIndex = selectedIndex === index
                        return (
                            <TouchableOpacity key={index} style={styles.category} onPress={() => setCategory(index)}>
                                <Text
                                    style={[
                                        isTablet ? FontStyle.title2.semibold2 : FontStyle.body2.bold,
                                        { color: isSelectedIndex ? CommonColor.main_black : CommonColor.basic_gray_medium }
                                    ]}
                                >
                                    {title}
                                </Text>
                                {isSelectedIndex && <View style={styles.selectedCategory} />}
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }

    return (
        <View style={CommonStyle.flex}>
            <AppBar text='기상정보에 관하여' hasBack />
            <WeatherHeader />
            <PagerView ref={ref} initialPage={route.params.index} useNext={false} style={CommonStyle.flex}>
                {categoryList.map(({ Component, footer }, index) => {
                    return (
                        <ScrollView key={index}>
                            <View style={[styles.container, { minHeight: screenHeight - top - bottom - HEADERS - FOOTER }]}>
                                <Component key={index} />
                            </View>
                            <WeatherDetailFooter text={footer} />
                        </ScrollView>
                    )
                })}
            </PagerView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: isTablet ? 131 : 16
    },
    selectedCategory: {
        borderBottomWidth: 3,
        borderColor: CommonColor.main_blue,
        marginTop: 11
    },
    category: {
        paddingHorizontal: 8,
        paddingTop: 18
    },
    view: {
        width: screenWidth,
        borderBottomWidth: 1,
        borderColor: CommonColor.basic_gray_light
    }
})
