import { StyleSheet, Text, View } from "react-native"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "../../style/CommonStyle"
import { isTablet } from "../../store"
import WindSpeed1 from "asset/icon/wind_speed/icon_wind_speed_1.svg"
import WindSpeed2 from "asset/icon/wind_speed/icon_wind_speed_2.svg"
import WindSpeed3 from "asset/icon/wind_speed/icon_wind_speed_3.svg"
import WindSpeed4 from "asset/icon/wind_speed/icon_wind_speed_4.svg"
import WindSpeed5 from "asset/icon/wind_speed/icon_wind_speed_5.svg"
import WindSpeed6 from "asset/icon/wind_speed/icon_wind_speed_6.svg"
import WindSpeed7 from "asset/icon/wind_speed/icon_wind_speed_7.svg"
import WindSpeed8 from "asset/icon/wind_speed/icon_wind_speed_8.svg"
import WindSpeed9 from "asset/icon/wind_speed/icon_wind_speed_9.svg"
import WindSpeed10 from "asset/icon/wind_speed/icon_wind_speed_10.svg"

const WindSpeed = [
    { text: "고요", desc: "연기가 수직으로 올라가는 정도로 바람이 없는 수준", icon: <WindSpeed1 />, range: "0~0.3" },
    { text: "실바람", desc: "풍향은 연기가 날리는 것으로 알 수 있으나, 풍향계가 움직이지 않는 정도", icon: <WindSpeed2 />, range: "0.4~2.4" },
    { text: "남실바람", desc: "가벼운 바람이 얼굴에 느껴지며 나뭇잎이 흔들리는 정도", icon: <WindSpeed3 />, range: "2.5~5.3" },
    { text: "산들바람", desc: "나뭇잎과 가는 가지가 끊임없이 흔들리고 깃발이 가볍게 날리는 정도", icon: <WindSpeed4 />, range: "5.4~8.6" },
    { text: "건들바람", desc: "먼지가 일고 종잇조각이 날리며 작은 가지가 흔들리는 정도", icon: <WindSpeed5 />, range: "8.7~12.7" },
    { text: "흔들바람", desc: "잎이 무성한 작은 나무 전체가 흔들리고 호수에 물결이 일어나는 정도", icon: <WindSpeed6 />, range: "12.8~17.2" },
    { text: "된바람", desc: "큰 나뭇가지가 흔들리고 전선이 울리며 우산을 들기가 곤란한 정도", icon: <WindSpeed7 />, range: "17.3~22.2" },
    { text: "센바람", desc: "나무 전체가 흔들려 바람을 마주하여 걷기 힘들 정도", icon: <WindSpeed8 />, range: "22.3~27.5" },
    { text: "큰바람", desc: "작은 나뭇가지가 꺾이며, 바람을 마주하여 걷기 힘들 정도", icon: <WindSpeed9 />, range: "27.6~33.3" },
    { text: "큰센바람", desc: "가옥에 다소 손해가 있을 정도로 굴뚝이 넘어지고 기와가 벗겨짐", icon: <WindSpeed10 />, range: "33.4~" }
]
export const WindSpeedScreen = () => {
    return (
        <View style={styles.flex}>
            <Text style={[CommonStyle.title, isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>풍속이란?</Text>
            <Text style={[styles.content, isTablet ? TabletFont.weather_info_main_text : MobileFont.weather_info_main_text]}>
                풍속은 단위 시간당 이동하는 공기의 속도를 말합니다. 오늘모입지에서는 풍속을 m/s 단위 기준으로 보버트 풍력 계급표에 기초해 구분하였으며 강풍 경보를 미만으로 일상 생활에서의
                육상 상태를 안내하고 있습니다.
            </Text>
            <View style={[CommonStyle.infoTitle, CommonStyle.row]}>
                <Text style={[isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>풍속 계급</Text>
                <Text style={[isTablet ? TabletFont.detail_3 : MobileFont.detail_3, { color: CommonColor.main_blue }]}>단위: k/s</Text>
            </View>
            <View style={[isTablet ? styles.tabletInterval : styles.mobileInterval]}>
                {WindSpeed.map(({ text, icon, range, desc }, index) => {
                    return (
                        <View key={index} style={[styles.row, { marginBottom: isTablet ? 50 : 32 }]}>
                            <View style={CommonStyle.center}>{icon}</View>
                            <View style={styles.interval}>
                                <Text style={isTablet ? TabletFont.detail_1 : MobileFont.detail_1}>{text}</Text>
                                <Text style={[isTablet ? TabletFont.detail_3 : MobileFont.detail_3, styles.range]}>{range}</Text>
                            </View>
                            <Text style={[isTablet ? TabletFont.weather_info_main_text : MobileFont.weather_info_main_text, CommonStyle.flex, styles.desc]}>{desc}</Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    range: {
        marginTop: 8,
        color: CommonColor.main_blue
    },
    desc: {
        marginLeft: 30
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-start"
    },
    interval: {
        marginLeft: 14
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
        width: "100%",
        justifyContent: "space-between",
        marginTop: 18,
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    mobileInterval: {
        width: "100%",
        justifyContent: "space-between",
        marginTop: 18
    },
    content: {
        marginTop: 8
    },
    flex: {
        paddingHorizontal: isTablet ? 60 : 0
    }
})
