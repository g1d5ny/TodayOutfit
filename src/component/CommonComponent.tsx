import { ReactElement } from "react"
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Back from "asset/icon/icon_arrow_back.svg"
import ArrowRight from "asset/icon/icon_arrow_right.svg"
import { navigationRef } from "navigation/RootNavigation"
import { CommonColor, CommonStyle, FontStyle, screenWidth } from "style/CommonStyle"
import { isTablet } from "store"
import Hyperlink from "react-native-hyperlink"

interface Header {
    text: string
    hasBack: boolean
}
export const Header = ({ text, hasBack }: Header) => {
    return (
        <View style={[CommonStyle.padding, styles.header]}>
            {hasBack && (
                <TouchableOpacity onPress={() => navigationRef?.current?.goBack()}>
                    <Back />
                </TouchableOpacity>
            )}
            <Text style={[isTablet ? FontStyle.title1.bold : FontStyle.title2.semibold2]}>{text}</Text>
        </View>
    )
}

export const WeatherDetailFooter = ({ text }: { text: string }) => {
    return (
        <View style={[styles.bottomLine, { paddingHorizontal: isTablet ? 131 : 16, paddingBottom: isTablet ? 44 : 24 }]}>
            <Text style={[FontStyle.label2.reading_regular, { color: CommonColor.basic_gray_medium }]}>{text}</Text>
        </View>
    )
}

interface Menu {
    icon?: ReactElement
    text: string
    onPress?: () => void
    customText?: string
}
export const MoreMenu = ({ icon, text, onPress }: Menu) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.menuContainer, CommonStyle.row]}>
            <View style={CommonStyle.row}>
                <View style={styles.iconView}>{icon}</View>
                <Text style={isTablet ? FontStyle.title2.regular : FontStyle.body2.regular}>{text}</Text>
            </View>
            <ArrowRight />
        </TouchableOpacity>
    )
}

export const AppInfoMenu = ({ text, onPress, customText }: Menu) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.infoContainer, CommonStyle.row]}>
            <Text style={isTablet ? FontStyle.title2.regular : FontStyle.body2.bold}>{text}</Text>
            {customText ? <Text style={[isTablet ? FontStyle.title2.regular : FontStyle.body2.regular, { color: CommonColor.basic_gray_medium }]}>{customText}</Text> : <ArrowRight />}
        </TouchableOpacity>
    )
}

interface OpenSource {
    name: string
    link?: string
    copyright: string
}
export const OpenSource = ({ name, link, copyright }: OpenSource) => {
    return (
        <View style={styles.openSourceContainer}>
            <Text style={[FontStyle.body2.bold, { color: CommonColor.basic_gray_dark }]}>{name}</Text>
            <View style={styles.openSourceContent}>
                <Hyperlink onPress={(url, text) => Linking.openURL(url)} linkText={url => (url === link ? link : url)} linkStyle={{ color: CommonColor.main_blue }}>
                    <Text style={isTablet ? FontStyle.label1.reading_regular : FontStyle.label2.regular}>{link}</Text>
                </Hyperlink>
                <Text style={isTablet ? FontStyle.label1.reading_regular : FontStyle.label2.regular}>{copyright}</Text>
                <Text style={isTablet ? FontStyle.label1.reading_regular : FontStyle.label2.regular}>MIT License</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    openSourceContent: {
        paddingLeft: 16
    },
    openSourceContainer: {
        // flex: 1
        width: isTablet ? "48%" : "100%",
        gap: 8
    },
    infoContainer: {
        justifyContent: "space-between"
    },
    iconView: {
        marginRight: isTablet ? 17 : 14
    },
    menuContainer: {
        paddingHorizontal: 8,
        justifyContent: "space-between"
    },
    bottomLine: {
        width: screenWidth,
        borderTopWidth: 8,
        borderTopColor: CommonColor.basic_gray_light,
        paddingTop: 24,
        alignSelf: "center"
    },
    header: {
        width: "100%",
        paddingVertical: isTablet ? 14 : 15,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: CommonColor.basic_gray_light,
        gap: 20
    }
})
