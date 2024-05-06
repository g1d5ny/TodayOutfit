import { StyleSheet, Text, View } from "react-native"
import { CommonColor, CommonStyle, MobileFont, TabletFont, screenHeight, screenWidth } from "../../style/CommonStyle"
import { WindSpeed, isTablet } from "../../store"
import { WeatherDetailFooter } from "../../component/CommonComponent"

export const WindSpeedScreen = ({ footerText }: { footerText: string }) => {
    return (
        <View style={CommonStyle.flex}>
            <Text style={[styles.title, isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>풍속이란?</Text>
            <Text style={[styles.content, isTablet ? TabletFont.weather_info_main_text : MobileFont.weather_info_main_text]}>
                풍속은 단위 시간당 이동하는 공기의 속도를 말합니다. 오늘모입지에서는 풍속을 m/s 단위 기준으로 보버트 풍력 계급표에 기초해 구분하였으며 강풍 경보를 미만으로 일상 생활에서의 육상 상태를 안내하고 있습니다.
            </Text>
            <Text style={[styles.title, isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>풍속 계급</Text>
            <View style={[CommonStyle.row, isTablet ? styles.tabletInterval : styles.mobileInterval]}>
                {WindSpeed.map(({ icon, text }, index) => {
                    const isLast = index === WindSpeed.length - 1
                    return (
                        <View key={index} style={[CommonStyle.center, !isLast && isTablet && styles.iconInterval]}>
                            {icon}
                            <Text style={[styles.iconText, isTablet ? TabletFont.detail_1 : MobileFont.detail_1]}>{text}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={[styles.border, CommonStyle.bottomLine]} />
            {WindSpeed.map(({ text, range, desc }, index) => {
                return (
                    <View key={index} style={styles.row}>
                        <View style={styles.left}>
                            <Text style={isTablet ? TabletFont.detail_1 : MobileFont.detail_1}>{text}</Text>
                            <Text style={[isTablet ? TabletFont.detail_3 : MobileFont.detail_3, { color: CommonColor.main_blue }]}>{range}</Text>
                        </View>
                        {/* <Text style={[isTablet ? TabletFont.weather_info_main_text : MobileFont.weather_info_main_text]}>· </Text>
                        <Text style={[isTablet ? TabletFont.weather_info_main_text : MobileFont.weather_info_main_text]}>{desc}</Text> */}
                    </View>
                )
            })}
            {!isTablet && <WeatherDetailFooter text={footerText} />}
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        alignItems: "flex-start"
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 32
    },
    left: {
        width: 52,
        marginRight: 14
    },
    border: {
        marginVertical: 32
    },
    iconText: {
        marginTop: 8
    },
    iconInterval: {
        marginRight: 22
    },
    tabletInterval: {
        justifyContent: "center",
        marginTop: 18
    },
    mobileInterval: {
        width: "100%",
        justifyContent: "space-between",
        marginTop: 18
    },
    content: {
        marginTop: 8
    },
    title: {
        marginTop: 32
    }
})
