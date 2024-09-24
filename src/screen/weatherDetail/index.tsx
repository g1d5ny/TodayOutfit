import { useRef, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { isTablet } from "../../store"
import PagerView from "react-native-pager-view"
import { Header, WeatherDetailFooter } from "../../component/CommonComponent"
import { CommonColor, CommonStyle, MobileFont, TabletFont, screenHeight, screenWidth } from "../../style/CommonStyle"
import { UVScreen } from "./UVScreen"
import { FeelsLikeScreen } from "./FeelsLikeScreen"
import { WindSpeedScreen } from "./WindSpeedScreen"
import { WindDirectionScreen } from "./WindDirectionScreen"
import { RainPercentageScreen } from "./RainPercentageScreen"
import { HumidityScreen } from "./HumidityScreen"
import { SnowFallScreen } from "./SnowFallScreen"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const categoryList = [
    {
        title: "UV 지수",
        footer: "자외선 지수는 WHO, WMO등 국제기구에서 제안하는 “Global Solar UV Index”의 가이드 라인과 질병관리청의 건강 위해 정보, 기상청 날씨누리 생활기상정보를 활용 했음을 안내해 드립니다.",
        Component: UVScreen
    },
    { title: "체감온도", footer: "체감온도는 기상청의 기상자료개방포털의 정보를 활용했음을 안내해 드립니다.", Component: FeelsLikeScreen },
    {
        title: "풍속",
        footer: "풍속 계급표는 보퍼트 풍력 계급(Beaufort wind force scale)의 육상 상태 계급표와, 기상청의 기상자료개방포털을 참고했음을 안내해드립니다.",
        Component: WindSpeedScreen
    },
    { title: "풍향", footer: "풍향 정보는 기상청 날씨누리 생활 기상정보와 ‘Visual Crossing Weather’의 날씨 데이터를 활용 했음을 안내해 드립니다.", Component: WindDirectionScreen },
    { title: "강수확률", footer: "강수 확률은 기상청 날씨누리 생활 기상정보와 ‘Visual Crossing Weather’의 날씨 정보를 활용 했음을 안내해 드립니다.", Component: RainPercentageScreen },
    { title: "습도", footer: "적정 상대 습도의 경우 한국표준과학연구원의 자료와 기상청의 날씨배움터 정보를 활용했음을 안내 해드립니다.", Component: HumidityScreen },
    { title: "적설량", footer: "적설량의 단계 기준의 경우 기상청 날씨누리의 대설 특보, ‘대설 판단 가이던스'를 활용했음을 알려드립니다.", Component: SnowFallScreen }
]
const HEADERS = 105
const FOOTER = 84
export const WeatherDetailScreen = ({ route }: { route: any }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(route.params.index)
    const ref = useRef<any>(null) // PagerView로 타입해야함
    const { top, bottom } = useSafeAreaInsets()

    const WeatherHeader = () => {
        const setCategory = (index: number) => {
            setSelectedIndex(index)
            ref.current?.setPage(index)
        }

        return (
            <View style={[styles.view, CommonStyle.padding]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categoryList.map(({ title }, index) => {
                        const isSelectedIndex = selectedIndex === index
                        return (
                            <TouchableOpacity key={index} style={[styles.category, isSelectedIndex && styles.selectedCategory]} onPress={() => setCategory(index)}>
                                <Text
                                    style={[
                                        isTablet ? TabletFont.title2_semi_bold2 : MobileFont.body2_bold,
                                        { color: isSelectedIndex ? CommonColor.main_black : CommonColor.basic_gray_medium }
                                    ]}
                                >
                                    {title}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }

    return (
        <View style={CommonStyle.flex}>
            <Header text='기상정보에 관하여' hasBack />
            <WeatherHeader />
            <PagerView ref={ref} initialPage={route.params.index} useNext={false} style={CommonStyle.flex} onPageSelected={({ nativeEvent: { position } }) => setSelectedIndex(position)}>
                {categoryList.map(({ Component, footer }, index) => {
                    return (
                        <ScrollView key={index}>
                            <View style={[CommonStyle.padding, { minHeight: screenHeight - top - bottom - HEADERS - FOOTER }]}>
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
    selectedCategory: {
        borderBottomWidth: 3,
        borderColor: CommonColor.main_blue
    },
    category: {
        paddingHorizontal: 8,
        paddingVertical: 14
    },
    view: {
        width: screenWidth,
        borderBottomWidth: 1,
        borderColor: CommonColor.basic_gray_light
    }
})
