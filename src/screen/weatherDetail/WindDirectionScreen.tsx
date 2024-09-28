import { StyleSheet, Text, View } from "react-native"
import { isTablet } from "store"
import { CommonStyle, FontStyle } from "style/CommonStyle"
import MobileCompass from "asset/image/image_mobile_compass.svg"
import TabletCompass from "asset/image/image_tablet_compass.svg"
import { WindDirectionInfo } from "text/DetailInfoText"

export const WindDirectionScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={[CommonStyle.title, FontStyle.body1.bold]}>{WindDirectionInfo.title}이란?</Text>
            <Text style={[styles.content, FontStyle.label1.reading_regular]}>{WindDirectionInfo.content}</Text>
            <View style={CommonStyle.weatherInfoSplit} />
            <Text style={[CommonStyle.infoTitle, FontStyle.body1.bold]}>{WindDirectionInfo.title} 구분</Text>
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
