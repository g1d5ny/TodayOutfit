import { StyleSheet, Text, View } from "react-native"
import { isTablet } from "store"
import { CommonStyle, MobileFont, TabletFont } from "style/CommonStyle"
import Rain1 from "asset/icon/rain_percentage/icon_rain_percentage_1.svg"
import Rain2 from "asset/icon/rain_percentage/icon_rain_percentage_2.svg"
import Rain3 from "asset/icon/rain_percentage/icon_rain_percentage_3.svg"
import Rain4 from "asset/icon/rain_percentage/icon_rain_percentage_4.svg"
import Rain5 from "asset/icon/rain_percentage/icon_rain_percentage_5.svg"
import Rain6 from "asset/icon/rain_percentage/icon_rain_percentage_6.svg"
import Rain7 from "asset/icon/rain_percentage/icon_rain_percentage_7.svg"
import Rain8 from "asset/icon/rain_percentage/icon_rain_percentage_8.svg"
import Rain9 from "asset/icon/rain_percentage/icon_rain_percentage_9.svg"
import Rain10 from "asset/icon/rain_percentage/icon_rain_percentage_10.svg"

const step = [
    { percentage: 100, icon: <Rain10 /> },
    { percentage: 90, icon: <Rain9 /> },
    { percentage: 80, icon: <Rain8 /> },
    { percentage: 70, icon: <Rain7 /> },
    { percentage: 60, icon: <Rain6 /> },
    { percentage: 50, icon: <Rain5 /> },
    { percentage: 40, icon: <Rain4 /> },
    { percentage: 30, icon: <Rain3 /> },
    { percentage: 20, icon: <Rain2 /> },
    { percentage: 10, icon: <Rain1 /> }
]
export const RainPercentageScreen = () => {
    return (
        <View>
            <Text style={[styles.title, isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>풍향이란?</Text>
            <Text style={[styles.content, isTablet ? TabletFont.weather_info_main_text : MobileFont.weather_info_main_text]}>
                강수란 수증기가 응축하여 땅에 내리는 모든 것을 뜻하는 기상학 용어로 비와 눈 뿐만 아니라 우박도 강수에 포함됩니다. 강수확률은 ‘조건과 비슷한 상태의 대기를 가졌을 때, 100번 중 비가 몇 번 왔는지’를 의미하며 다시 말해 특정시간
                내에 강수예보 지역의 임의지점에서 측정강수가 있음을 확률적으로 정의하여 나타낸 값을 의미합니다.
            </Text>
            <View style={styles.title}>
                <Text style={[isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>강수확률 단계</Text>
                <View style={[CommonStyle.row, isTablet ? styles.tabletInterval : styles.mobileInterval]}>
                    {step.map(({ percentage, icon }, index) => {
                        return (
                            <View key={index} style={[CommonStyle.center, styles.icon]}>
                                {icon}
                                <Text style={[isTablet ? TabletFont.detail_1 : MobileFont.detail_1, styles.percentage]}>{percentage}%</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    percentage: {
        marginTop: 8
    },
    icon: {
        marginHorizontal: 10,
        marginBottom: 18
    },
    tabletInterval: {
        width: "60%",
        marginTop: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        alignSelf: "center"
    },
    mobileInterval: {
        width: "100%",
        flexWrap: "wrap",
        marginTop: 18,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        marginTop: 8
    },
    title: {
        marginTop: 32,
        justifyContent: "space-between"
    }
})
