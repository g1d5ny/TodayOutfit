import { ReactElement } from "react"
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Back from "asset/icon/icon_arrow_back.svg"
import ArrowRight from "asset/icon/icon_arrow_right.svg"
import { navigationRef } from "navigation/RootNavigation"
import { CommonColor, CommonStyle, MobileFont, TabletFont, screenWidth } from "style/CommonStyle"
import { isTablet } from "store"
import Hyperlink from "react-native-hyperlink"

interface Header {
    text: string
    hasBack: boolean
}
export const Header = ({ text, hasBack }: Header) => {
    return (
        <View style={styles.header}>
            {hasBack && (
                <TouchableOpacity style={styles.back} onPress={() => navigationRef?.current?.goBack()}>
                    <Back />
                </TouchableOpacity>
            )}
            <Text style={[isTablet ? TabletFont.button_1 : MobileFont.heading_1]}>{text}</Text>
        </View>
    )
}

export const WeatherDetailFooter = ({ text }: { text: string }) => {
    return (
        <View style={[styles.bottomLine, CommonStyle.center, CommonStyle.padding]}>
            <Text style={[isTablet ? TabletFont.detail_3 : MobileFont.detail_3, { color: CommonColor.basic_gray_medium }]}>{text}</Text>
        </View>
    )
}

interface Menu {
    icon?: ReactElement
    text: string
    onPress: () => void
}
export const MoreMenu = ({ icon, text, onPress }: Menu) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.menuContainer, CommonStyle.row]}>
            <View style={CommonStyle.row}>
                <View style={styles.iconView}>{icon}</View>
                <Text style={[styles.menuText, isTablet ? TabletFont.button_2 : MobileFont.body_2]}>{text}</Text>
            </View>
            <ArrowRight />
        </TouchableOpacity>
    )
}

export const AppInfoMenu = ({ text, onPress }: Menu) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.infoContainer, CommonStyle.row]}>
            <Text style={isTablet ? TabletFont.heading_1 : MobileFont.body_1}>{text}</Text>
            <ArrowRight />
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
            <Text style={isTablet ? TabletFont.body_1 : MobileFont.body_1}>{name}</Text>
            <View style={styles.openSourceContent}>
                <Hyperlink onPress={(url, text) => Linking.openURL(url)} linkText={url => (url === link ? link : url)} linkStyle={{ color: CommonColor.main_blue }}>
                    <Text style={isTablet ? TabletFont.weather_info_main_text : MobileFont.detail_3}>{link}</Text>
                </Hyperlink>
                <Text style={isTablet ? TabletFont.weather_info_main_text : MobileFont.detail_3}>{copyright}</Text>
                <Text style={isTablet ? TabletFont.weather_info_main_text : MobileFont.detail_3}>MIT License</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    openSourceContent: {
        paddingLeft: 16,
        marginTop: 8
    },
    openSourceContainer: {
        width: isTablet ? "48%" : "100%",
        marginBottom: 32
    },
    infoContainer: {
        marginVertical: isTablet ? 20 : 16,
        justifyContent: "space-between"
    },
    menuText: {
        marginLeft: 8
    },
    iconView: {
        paddingLeft: 14
    },
    menuContainer: {
        paddingVertical: isTablet ? 24 : 20,
        justifyContent: "space-between"
    },
    back: {
        marginRight: 20
    },
    bottomLine: {
        width: screenWidth,
        borderTopWidth: 8,
        borderTopColor: CommonColor.basic_gray_light,
        paddingVertical: 24,
        alignSelf: "center"
    },
    header: {
        width: "100%",
        paddingHorizontal: isTablet ? 32 : 16,
        paddingVertical: isTablet ? 14 : 13,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: CommonColor.basic_gray_light
    }
})
