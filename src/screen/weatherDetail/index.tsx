import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { isTablet } from "../../store"
import PagerView from "react-native-pager-view"
import { Header } from "../../component/CommonComponent"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "../../style/CommonStyle"
import { useRef, useState } from "react"
import { UVScreen } from "./UVScreen"
import { FeelsLikeScreen } from "./FeelsLikeScreen"
import { WindSpeedScreen } from "./WindSpeedScreen"
import { WindDirectionScreen } from "./WindDirectionScreen"
import { RainPercentageScreen } from "./RainPercentageScreen"
import { HumidityScreen } from "./HumidityScreen"
import { SnowFallScreen } from "./SnowFallScreen"

const categoryList = [
    { title: "UV 지수", component: <UVScreen /> },
    { title: "체감온도", component: <FeelsLikeScreen /> },
    { title: "풍속", component: <WindSpeedScreen /> },
    { title: "풍향", component: <WindDirectionScreen /> },
    { title: "강수확률", component: <RainPercentageScreen /> },
    { title: "습도", component: <HumidityScreen /> },
    { title: "적설량", component: <SnowFallScreen /> }
]
export const WeatherDetailScreen = ({ route }: { navigation: any; route: any }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const ref = useRef<any>(null) // PagerView로 타입해야함

    const WeatherHeader = () => {
        const setCategory = (index: number) => {
            setSelectedIndex(index)
            ref.current?.setPage(index)
        }

        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categoryList.map(({ title }, index) => {
                    const isSelectedIndex = selectedIndex === index
                    return (
                        <TouchableOpacity key={index} style={[styles.category, isSelectedIndex && styles.selectedCategory]} onPress={() => setCategory(index)}>
                            <Text style={[isTablet ? TabletFont.button_1 : MobileFont.body_1, { color: isSelectedIndex ? CommonColor.main_black : CommonColor.basic_gray_medium }]}>{title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        )
    }

    return (
        <SafeAreaView style={CommonStyle.flex}>
            <Header text='기상정보에 관하여' />
            <ScrollView style={styles.scrollView}>
                <WeatherHeader />
                <PagerView ref={ref} initialPage={0} useNext>
                    {categoryList.map(({ component }, index) => {
                        return <View key={index}>{component}</View>
                    })}
                </PagerView>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    selectedCategory: {
        borderBottomWidth: 3,
        borderColor: CommonColor.main_blue
    },
    category: {
        paddingHorizontal: 8,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: CommonColor.basic_gray_light
    },
    scrollView: {
        paddingHorizontal: isTablet ? 76 : 14
    }
})
