import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native"
import Back from "../asset/icon/icon_arrow_back.svg"
import { navigationRef } from "../navigation/RootNavigation"
import { CommonColor, CommonStyle, MobileFont, TabletFont, screenWidth } from "style/CommonStyle"
import { isTablet } from "../store"

export const Header = ({ text }: { text: string }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigationRef?.current?.goBack()}>
                <Back />
            </TouchableOpacity>
            <Text style={[isTablet ? TabletFont.button_1 : MobileFont.heading_1, { marginLeft: 20 }]}>{text}</Text>
        </View>
    )
}

export const WeatherDetailFooter = ({ text }: { text: string }) => {
    return (
        <View style={[styles.bottomLine, CommonStyle.center, { paddingHorizontal: isTablet ? 100 : 0 }]}>
            <Text style={[isTablet ? TabletFont.detail_3 : MobileFont.detail_3, { color: CommonColor.basic_gray_medium }]}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomLine: {
        width: screenWidth,
        borderTopWidth: 8,
        borderTopColor: CommonColor.basic_gray_light,
        paddingVertical: 24
    },
    header: {
        width: "100%",
        paddingHorizontal: isTablet ? 32 : 16,
        paddingVertical: isTablet ? 14 : 13,
        flexDirection: "row",
        alignItems: "center"
    }
})
