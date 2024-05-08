import { StyleSheet, Text, View } from "react-native"
import { isTablet } from "store"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "style/CommonStyle"
import FeelsLike10 from "asset/icon/feels_like/icon_feels_like_10.svg"
import FeelsLike8 from "asset/icon/feels_like/icon_feels_like_8.svg"
import FeelsLike6 from "asset/icon/feels_like/icon_feels_like_6.svg"
import FeelsLike4 from "asset/icon/feels_like/icon_feels_like_4.svg"
import FeelsLike2 from "asset/icon/feels_like/icon_feels_like_2.svg"

const FeelsLike = [
    {
        text: "위험",
        desc: ["폭염경보 수준의 체감 온도로 가능한 실내에 머물러야 합니다.", "직사광선을 오래 받으면 열사병, 일사병과 같은 온열질환이 발생할 가능성이 높습니다."],
        icon: <FeelsLike10 />,
        range: "~100"
    },
    {
        text: "높음",
        desc: ["최대 폭염 주의보 수준의 체감온도로 외출을 피하는 것을 권장합니다.", "장기 외부활동시 일사병이나 탈수가 일어날 수 있으니 주의해야 합니다."],
        icon: <FeelsLike8 />,
        range: "~80"
    },
    {
        text: "보통",
        desc: ["평균 기온에 해당하는 적정한 체감온도 입니다.", "사람의 체질에 따라 다르게 느낄 수 있습니다."],
        icon: <FeelsLike6 />,
        range: "~60"
    },
    {
        text: "낮음",
        desc: ["추위가 느껴지는 정도로 옷을 따뜻하게 입는 것을 권장합니다."],
        icon: <FeelsLike4 />,
        range: "~40"
    },
    {
        text: "매우 낮음",
        desc: ["노출된 피부에 매우 찬 기운이 느껴지는 정도로 장기 야외 활동시 저체온증 위험이 있습니다."],
        icon: <FeelsLike2 />,
        range: "~20"
    }
]
export const FeelsLikeScreen = () => {
    return (
        <View>
            <Text style={[styles.title, isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>체감온도란?</Text>
            <Text style={[styles.content, isTablet ? TabletFont.weather_info_main_text : MobileFont.weather_info_main_text]}>
                체감 온도는 인체가 느끼는 더위나 추위를 수량적으로 나타낸 것으로 온도, 습도, 풍속, 일사량, 복사등을 바탕으로 계산됩니다. 오늘모입지에서는 여름철에는 일 최고 기온을 바탕으로 불쾌 지수를, 겨울철에는 일 최저 기온을 바탕으로
                체감온도 지수를 활용하고 있습니다.
            </Text>
            <View style={[styles.title, CommonStyle.row]}>
                <Text style={[isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>체감온도 단계</Text>
                <Text style={[isTablet ? TabletFont.detail_3 : MobileFont.detail_3, { color: CommonColor.main_blue }]}>단위: %</Text>
            </View>
            <View style={[CommonStyle.row, isTablet ? styles.tabletInterval : styles.mobileInterval]}>
                {FeelsLike.map(({ icon, text }, index) => {
                    const isLast = index === FeelsLike.length - 1
                    return (
                        <View key={index} style={[CommonStyle.center, !isLast && isTablet && styles.iconInterval]}>
                            {icon}
                            <Text style={[styles.iconText, isTablet ? TabletFont.detail_1 : MobileFont.detail_1]}>{text}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={[styles.border, CommonStyle.bottomLine]} />
            {FeelsLike.map(({ text, range, desc }, index) => {
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
                                    <Text style={[isTablet ? TabletFont.weather_info_main_text : MobileFont.weather_info_main_text]}>{item}</Text>
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
        marginTop: 32,
        justifyContent: "space-between"
    }
})
