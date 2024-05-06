import { StyleSheet, Text, View } from "react-native"
import { CommonColor, CommonStyle, MobileFont, TabletFont, screenHeight, screenWidth } from "../../style/CommonStyle"
import { UV, isTablet } from "../../store"
import { WeatherDetailFooter } from "../../component/CommonComponent"

export const UVScreen = ({ footerText }: { footerText: string }) => {
    return (
        <View style={CommonStyle.flex}>
            <View>
                <Text style={[styles.title, isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>UV 지수란?</Text>
                <Text style={[styles.content, isTablet ? TabletFont.weather_info_main_text : MobileFont.weather_info_main_text]}>
                    UV 지수(Ultraviolet Index)는 피부 손상 가능성을 나타내는 지표로 일광화상을 유발하는 자외선 복사 강도의 국제 표준 측정 값입니다. 태양고도가 최대인 남중시각(南中時刻)때 지표에 도달하는 자외선 B 영역의 복사량을 지수식으로
                    환산한 것이며 10등급으로 구분됩니다.
                </Text>
                <Text style={[styles.title, isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>UV 지수 단계</Text>
                <View style={[CommonStyle.row, isTablet ? styles.tabletInterval : styles.mobileInterval]}>
                    {UV.map(({ icon, text }, index) => {
                        const isLast = index === UV.length - 1
                        return (
                            <View key={index} style={[CommonStyle.center, !isLast && isTablet && styles.iconInterval]}>
                                {icon}
                                <Text style={[styles.iconText, isTablet ? TabletFont.detail_1 : MobileFont.detail_1]}>{text}</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={[styles.border, CommonStyle.bottomLine]} />
                {UV.map(({ text, range, desc }, index) => {
                    return (
                        <View key={index} style={styles.row}>
                            <View style={styles.left}>
                                <Text style={isTablet ? TabletFont.detail_1 : MobileFont.detail_1}>{text}</Text>
                                <Text style={[isTablet ? TabletFont.detail_3 : MobileFont.detail_3, { color: CommonColor.main_blue }]}>{range}</Text>
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
