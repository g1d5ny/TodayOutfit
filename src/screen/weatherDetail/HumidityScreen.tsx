import { StyleSheet, Text, View } from "react-native"
import Humidity0 from "asset/icon/humidity/icon_humidity_0.svg"
import Humidity1 from "asset/icon/humidity/icon_humidity_1.svg"
import Humidity3 from "asset/icon/humidity/icon_humidity_3.svg"
import Humidity5 from "asset/icon/humidity/icon_humidity_5.svg"
import Humidity6 from "asset/icon/humidity/icon_humidity_6.svg"
import { isTablet } from "store"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "style/CommonStyle"

const Humidity = [
    {
        text: "매우 높음",
        desc: ["세균과 곰팡이 증식을 촉진해 특정 병원균에 관한 질병 확산률이 높아집니다", "호흡기 환자에게 치명적일 수 있습니다."],
        icon: <Humidity6 width={48} height={48} />,
        range: "~100"
    },
    {
        text: "높음",
        desc: ["약간 습함을 느끼는 정도로 실내에서 습도 조절기를 통한 조정이 필요한 상황입니다."],
        icon: <Humidity5 width={48} height={48} />,
        range: "~80"
    },
    {
        text: "쾌적",
        desc: ["쾌적한 상태인 최적의 습도 단계입니다.", "그러나 사람에 따라 다른 기상 상태의 영향으로 쾌적함을 느끼지 않을 수 있습니다."],
        icon: <Humidity3 width={48} height={48} />,
        range: "~60"
    },
    {
        text: "건조",
        desc: ["다소 건조함을 느낄 수 있습니다.", "유아에게 코 막힘 현상이 발생할 수 있습니다.", "정전기가 발생하기 쉽습니다."],
        icon: <Humidity1 width={48} height={48} />,
        range: "~30"
    },
    {
        text: "매우 건조",
        desc: ["알레르기 반응을 악화시킬 수 있습니다.", "호흡기 문제를 유발시킬 수 있습니다.", "목재를 수축시키고 정전기가 자주 발생합니다."],
        icon: <Humidity0 width={48} height={48} />,
        range: "~20"
    }
]
export const HumidityScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={[CommonStyle.title, isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>습도란?</Text>
            <Text style={[styles.content, isTablet ? TabletFont.weather_info_main_text : MobileFont.weather_info_main_text]}>
                습도란 공기 중에 포함되어 있는 수증기의 비율을 의미하며 오늘모입지에서 제공되는 습도 정보는 노점 온도를 활용한 상대습도를 의미합니다. 기온의 영향으로 계절에 따라 쾌적함을
                느끼는 상대습도가 달라지며 여름철엔 50~60%, 겨울철엔 40~50%, 봄과 가을에는 50% 정도가 이상적인 상대습도입니다.
            </Text>
            <View style={[CommonStyle.infoTitle, CommonStyle.row]}>
                <Text style={[isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>습도 단계</Text>
                <Text style={[isTablet ? TabletFont.detail_3 : MobileFont.detail_3, { color: CommonColor.main_blue }]}>단위: %, C</Text>
            </View>
            <View style={[CommonStyle.row, isTablet ? styles.tabletInterval : styles.mobileInterval]}>
                {Humidity.map(({ icon, text }, index) => {
                    const isLast = index === Humidity.length - 1
                    return (
                        <View key={index} style={[CommonStyle.center, !isLast && isTablet && styles.iconInterval]}>
                            {icon}
                            <Text style={[styles.iconText, isTablet ? TabletFont.detail_1 : MobileFont.detail_1]}>{text}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={[styles.border, CommonStyle.bottomLine]} />
            {Humidity.map(({ text, range, desc }, index) => {
                return (
                    <View key={index} style={styles.row}>
                        <View style={styles.left}>
                            <Text style={isTablet ? TabletFont.detail_1 : MobileFont.detail_1}>{text}</Text>
                            <Text style={[isTablet ? TabletFont.detail_3 : MobileFont.detail_3, styles.range]}>{range}</Text>
                        </View>
                        <View style={CommonStyle.flex}>
                            {desc.map((item, index) => (
                                <View key={index} style={styles.wrap}>
                                    <Text style={[isTablet ? TabletFont.weather_info_main_text : MobileFont.weather_info_main_text]}>· </Text>
                                    <Text style={[isTablet ? TabletFont.weather_info_main_text : MobileFont.weather_info_main_text, styles.flex]}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    range: {
        marginTop: 8,
        color: CommonColor.main_blue
    },
    wrap: {
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap"
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
    container: {
        paddingHorizontal: isTablet ? 60 : 0
    },
    flex: {
        flex: 1
    }
})
