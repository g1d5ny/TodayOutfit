import { StyleSheet, Text, View } from "react-native"
import { isTablet } from "store"
import { CommonStyle, MobileFont, TabletFont } from "style/CommonStyle"
import MobileCompass from "asset/image/image_mobile_compass.svg"
import TabletCompass from "asset/image/image_tablet_compass.svg"
import { WindDirectionInfo } from "text/DetailInfoText"

export const WindDirectionScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={[CommonStyle.title, isTablet ? TabletFont.body1_bold : MobileFont.body1_bold]}>{WindDirectionInfo.title}이란?</Text>
            <Text style={[styles.content, isTablet ? TabletFont.label1_reading_regular : MobileFont.label1_reading_regular]}>{WindDirectionInfo.content}</Text>
            <View style={CommonStyle.weatherInfoSplit} />
            <Text style={[CommonStyle.infoTitle, isTablet ? TabletFont.body1_bold : MobileFont.body1_bold]}>{WindDirectionInfo.title} 구분</Text>
            <View style={[CommonStyle.center, styles.compass]}>{isTablet ? <TabletCompass /> : <MobileCompass />}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    compass: {
        marginTop: 32
    },
    content: {
        marginTop: 8
    },
    container: {
        paddingBottom: 32
    }
})
