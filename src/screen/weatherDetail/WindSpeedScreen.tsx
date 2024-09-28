import { StyleSheet, Text, View } from "react-native"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "../../style/CommonStyle"
import { isTablet } from "../../store"
import { WindSpeed, WindSpeedInfo } from "text/DetailInfoText"

export const WindSpeedScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={[CommonStyle.title, isTablet ? TabletFont.body1_bold : MobileFont.body1_bold]}>{WindSpeedInfo.title}이란?</Text>
            <Text style={[styles.content, isTablet ? TabletFont.label1_reading_regular : MobileFont.label1_reading_regular]}>{WindSpeedInfo.content}</Text>
            <View style={CommonStyle.weatherInfoSplit} />
            <View style={[CommonStyle.row, CommonStyle.spread]}>
                <Text style={[CommonStyle.infoTitle, isTablet ? TabletFont.body1_bold : MobileFont.body1_bold]}>{WindSpeedInfo.title} 계급</Text>
                <Text style={[isTablet ? TabletFont.label2_regular : MobileFont.label2_regular, { color: CommonColor.main_blue }]}>단위: {WindSpeedInfo.unit}</Text>
            </View>
            <View style={[isTablet ? styles.tabletContainer : styles.mobileContainer]}>
                {WindSpeed(48).map(({ text, icon, range, desc }, index) => {
                    return (
                        <View key={index} style={[styles.windView, isTablet && styles.windTabletView]}>
                            <View style={styles.icon}>{icon}</View>
                            <View style={styles.view}>
                                <View style={styles.textContainer}>
                                    <Text style={isTablet ? TabletFont.label1_bold : MobileFont.label1_bold}>{text}</Text>
                                    <Text style={[isTablet ? TabletFont.label2_regular : MobileFont.label2_regular, { color: CommonColor.main_blue }]}>{range}</Text>
                                </View>
                                <Text style={[isTablet ? TabletFont.label1_reading_regular : MobileFont.label1_reading_regular, isTablet ? styles.tabletDesc : styles.mobileDesc]}>
                                    {desc}
                                </Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    windTabletView: {
        width: "47%"
    },
    tabletDesc: {
        flex: 1,
        flexWrap: "wrap"
    },
    view: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 6
    },
    mobileDesc: {
        flex: 1,
        flexWrap: "wrap"
    },
    icon: {
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center"
    },
    textContainer: {
        width: 56,
        gap: 5
    },
    windView: {
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 14
    },
    tabletContainer: {
        flex: 1,
        rowGap: 24,
        gap: 24,
        marginTop: 24,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    mobileContainer: {
        width: "100%",
        gap: 36,
        justifyContent: "space-between",
        marginTop: 24
    },
    content: {
        marginTop: 8
    },
    container: {
        paddingBottom: 32
    }
})
