import { StyleSheet, Text, View } from "react-native"
import { isTablet } from "store"
import { CommonStyle, MobileFont, TabletFont } from "style/CommonStyle"
import MobileCompass from "asset/image/image_mobile_compass.svg"
import TabletCompass from "asset/image/image_tablet_compass.svg"

export const WindDirectionScreen = () => {
    return (
        <View>
            <Text style={[CommonStyle.title, isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>풍향이란?</Text>
            <Text style={[styles.content, isTablet ? TabletFont.weather_info_main_text : MobileFont.weather_info_main_text]}>
                풍향은 바람이 불어오는 방향을 의미하며 오늘모입지에서는 8방위각도를 활용해 풍향을 나타냅니다.
            </Text>
            <View style={CommonStyle.infoTitle}>
                <Text style={[isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>풍향 구분</Text>
                <View style={[CommonStyle.center, styles.compass]}>{isTablet ? <TabletCompass /> : <MobileCompass />}</View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    compass: {
        marginTop: isTablet ? 32 : 16,
        marginBottom: 52
    },
    content: {
        marginTop: 8
    }
})
