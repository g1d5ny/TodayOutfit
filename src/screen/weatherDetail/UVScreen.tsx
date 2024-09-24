import { StyleSheet, Text, View } from "react-native"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "../../style/CommonStyle"
import { UV, isTablet } from "../../store"

export const UVScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={[CommonStyle.title, isTablet ? TabletFont.body1_bold : MobileFont.body1_bold]}>UV 지수란?</Text>
            <Text style={[styles.content, isTablet ? TabletFont.label1_reading_regular : MobileFont.label1_reading_regular]}>
                UV 지수(Ultraviolet Index)는 피부 손상 가능성을 나타내는 지표로 일광화상을 유발하는 자외선 복사 강도의 국제 표준 측정 값입니다. 태양고도가 최대인 남중시각(南中時刻)때 지표에
                도달하는 자외선 B 영역의 복사량을 지수식으로 환산한 것이며 10등급으로 구분됩니다.
            </Text>
            <View style={CommonStyle.weatherInfoSplit} />
            <Text style={[CommonStyle.infoTitle, isTablet ? TabletFont.body1_bold : MobileFont.body1_bold]}>UV 지수 단계</Text>
            <View style={[CommonStyle.row, styles.interval]}>
                {UV.map(({ icon, text }, index) => {
                    return (
                        <View key={index} style={CommonStyle.center}>
                            {icon}
                            <Text style={[styles.iconText, isTablet ? TabletFont.label1_bold : MobileFont.label1_bold]}>{text}</Text>
                        </View>
                    )
                })}
            </View>
            {UV.map(({ text, range, desc }, index) => {
                return (
                    <View key={index} style={styles.row}>
                        <View style={styles.left}>
                            <Text style={isTablet ? TabletFont.label1_bold : MobileFont.label1_bold}>{text}</Text>
                            <Text style={[isTablet ? TabletFont.label2_regular : MobileFont.label2_regular, styles.range]}>{range}</Text>
                        </View>
                        <View style={[CommonStyle.flex]}>
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
    vertical: {
        marginTop: 24
    },
    range: {
        marginTop: 6,
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
        marginBottom: 26
    },
    left: {
        width: 52,
        marginRight: 14
    },
    iconText: {
        marginTop: 8
    },
    interval: {
        alignSelf: "center",
        justifyContent: "space-between",
        marginVertical: 24,
        gap: isTablet ? 22 : 10
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
