import { StyleSheet, Text, View } from "react-native"
import Snowfall1 from "asset/icon/snow_fall/icon_snow_fall_1.svg"
import Snowfall2 from "asset/icon/snow_fall/icon_snow_fall_2.svg"
import Snowfall3 from "asset/icon/snow_fall/icon_snow_fall_3.svg"
import Snowfall4 from "asset/icon/snow_fall/icon_snow_fall_4.svg"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "style/CommonStyle"
import { isTablet } from "store"

const SnowFall = [
    {
        text: "대설 경보",
        desc: [
            "눈을 밟으면 신발이 완전히 빠지는 상태로 외출을 삼가야 합니다.",
            "대설은 짧은 시간에 급격히 눈이 쌓이게 되므로 눈사태, 교통 혼잡, 쌓인 눈에 의해 시설물 붕괴 등의 피해에 주의해야 합니다.",
            "제설작업이 늦어지는 산간지역의 경우 한파와 이동에 각별히 주의해야합니다.",
            "비상 상황 가족이나 이웃과 함께 대피요령을 숙지하고 및 비상용품을 구비 해둬야 합니다."
        ],
        icon: <Snowfall4 width={50} />,
        range: "20~"
    },
    {
        text: "대설 주의보",
        desc: [
            "눈을 밟으면 신발이 묻히는 상태입니다.",
            "대설은 짧은 시간에 급격히 눈이 쌓이게 되므로 눈사태, 교통 혼잡, 쌓인 눈에 의해 시설물 붕괴 등의 피해에 주의해야 합니다.",
            "보행자의 경우 외출을 자제하며 바닥면이 넓은 운동화나 등산화 착용을 권장합니다.",
            "차량 운전자의 경우 차량 고립이 주의하며 서행운전 및 되도록 대중교통 이용을 권장합니다."
        ],
        icon: <Snowfall3 width={50} />,
        range: "5~19"
    },
    {
        text: "강설 주의보",
        desc: [
            "적은 양의 눈이나 비와 함께 내리는 진눈깨비, 우박과 같이 뭉쳐서 내리는 싸락눈 등이 해당될 수 있습니다.",
            "제설이 원활한 적은 양의 눈으로 예상되나, 교통 혼잡이 있을 수 있으니 주의해야합니다."
        ],
        icon: <Snowfall2 width={50} />,
        range: "1~4"
    },
    {
        text: "가루눈, 자국눈",
        desc: [
            "발자국이 겨우 날 정도로의 적은 양의 자국눈이나 비와 함께 내리는 진눈깨비, 우박과 같이 뭉쳐서 내리는 싸락눈 등이 해당될 수 있습니다.",
            "쌓이지 않는 정도의 적설량이지만 보행에 주의해야합니다."
        ],
        icon: <Snowfall1 width={50} />,
        range: "~1"
    }
]
export const SnowFallScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={[CommonStyle.title, isTablet ? TabletFont.body1_bold : MobileFont.body_1]}>적설량이란?</Text>
            <Text style={[styles.content, isTablet ? TabletFont.label1_reading_regular : MobileFont.label1_reading_regular]}>
                지면에 쌓인 눈의 깊이를 cm로 나타낸 값으로 오늘모입지에서 제공하는 대설 및 적설 정보는 외부활동에 지장을 줄 수 있는 기상특보를 기초해 제공됩니다. 싸락눈과 진눈깨비와 같은
                비와 눈이 섞여 내리는 기상 상태도 포함합니다.
            </Text>
            <View style={[CommonStyle.infoTitle, CommonStyle.row]}>
                <Text style={[isTablet ? TabletFont.body1_bold : MobileFont.body_1]}>적설 단계</Text>
                <Text style={[isTablet ? TabletFont.label2_regular : MobileFont.label2_regular, { color: CommonColor.main_blue }]}>단위: cm</Text>
            </View>
            <View style={[CommonStyle.row, isTablet ? styles.tabletInterval : styles.mobileInterval]}>
                {SnowFall.map(({ icon, text }, index) => {
                    return (
                        <View key={index} style={CommonStyle.center}>
                            {icon}
                            <Text style={[isTablet ? TabletFont.label1_bold : MobileFont.label1_bold]}>{text}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={[styles.border, CommonStyle.bottomLine]} />
            {SnowFall.map(({ text, range, desc }, index) => {
                return (
                    <View key={index} style={styles.row}>
                        <View style={styles.left}>
                            <Text style={isTablet ? TabletFont.label1_bold : MobileFont.label1_bold}>{text}</Text>
                            <Text style={[isTablet ? TabletFont.label2_regular : MobileFont.label2_regular, styles.range]}>{range}</Text>
                        </View>
                        <View style={CommonStyle.flex}>
                            {desc.map((item, index) => (
                                <View key={index} style={styles.wrap}>
                                    <Text style={[isTablet ? TabletFont.label1_reading_regular : MobileFont.label1_reading_regular]}>· </Text>
                                    <Text style={[isTablet ? TabletFont.label1_reading_regular : MobileFont.label1_reading_regular, styles.flex]}>{item}</Text>
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
        width: 80,
        marginRight: 14
    },
    border: {
        marginVertical: 26
    },
    tabletInterval: {
        width: "70%",
        marginTop: 18,
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "center"
    },
    mobileInterval: {
        width: "100%",
        marginTop: 18,
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "center"
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
