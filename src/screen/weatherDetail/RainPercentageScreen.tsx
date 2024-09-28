import { StyleSheet, Text, View } from "react-native"
import { isTablet } from "store"
import { CommonStyle, FontStyle } from "style/CommonStyle"
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
import { RainPercentageInfo } from "text/DetailInfoText"

const step = [
    { percentage: 100, icon: <Rain10 width={43} /> },
    { percentage: 90, icon: <Rain9 width={43} /> },
    { percentage: 80, icon: <Rain8 width={43} /> },
    { percentage: 70, icon: <Rain7 width={43} /> },
    { percentage: 60, icon: <Rain6 width={43} /> },
    { percentage: 50, icon: <Rain5 width={43} /> },
    { percentage: 40, icon: <Rain4 width={43} /> },
    { percentage: 30, icon: <Rain3 width={43} /> },
    { percentage: 20, icon: <Rain2 width={43} /> },
    { percentage: 10, icon: <Rain1 width={43} /> }
]
export const RainPercentageScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={[CommonStyle.title, FontStyle.body1.bold]}>{RainPercentageInfo.title}이란?</Text>
            <Text style={[styles.content, FontStyle.label1.reading_regular]}>{RainPercentageInfo.content}</Text>
            <View style={CommonStyle.weatherInfoSplit} />
            <Text style={[CommonStyle.infoTitle, FontStyle.body1.bold]}>{RainPercentageInfo.title} 단계</Text>
            <View style={[CommonStyle.row, styles.interval, isTablet ? styles.tabletInterval : styles.mobileInterval]}>
                {step.map(({ percentage, icon }, index) => {
                    return (
                        <View key={index} style={CommonStyle.center}>
                            {icon}
                            <Text style={[FontStyle.label1.bold, styles.percentage]}>{percentage}%</Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    percentage: {
        marginTop: 7
    },
    tabletInterval: {
        width: "50%",
        rowGap: 20,
        columnGap: 26,
        alignSelf: "center"
    },
    mobileInterval: {
        width: "100%",
        rowGap: 20,
        columnGap: 24,
        justifyContent: "space-between"
    },
    interval: {
        marginTop: 24,
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center"
    },
    content: {
        marginTop: 8
    },
    container: {
        paddingBottom: 32
    }
})
