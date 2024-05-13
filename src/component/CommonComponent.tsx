import { FC, ReactElement } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SvgProps } from "react-native-svg"
import Back from "asset/icon/icon_arrow_back.svg"
import ArrowRight from "asset/icon/icon_arrow_right.svg"
import { navigationRef } from "navigation/RootNavigation"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "style/CommonStyle"
import { isTablet } from "store"
import Push from "asset/icon/icon_menu_push.svg"

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
        <View style={[styles.bottomLine, CommonStyle.center, { paddingHorizontal: isTablet ? 100 : 0 }]}>
            <Text style={[isTablet ? TabletFont.detail_3 : MobileFont.detail_3, { color: CommonColor.basic_gray_medium }]}>{text}</Text>
        </View>
    )
}

interface Menu {
    icon: ReactElement
    text: string
    onPress: () => void
}
export const MoreMenu = ({ icon, text, onPress }: Menu) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.menuContainer, CommonStyle.row]}>
            <View style={[styles.menuView, CommonStyle.row]}>
                {icon}
                <Text style={[styles.menuText, isTablet ? TabletFont.button_2 : MobileFont.body_2]}>{text}</Text>
            </View>
            <ArrowRight />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    menuText: {
        marginLeft: 8
    },
    menuView: {
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
        borderTopWidth: 8,
        borderTopColor: CommonColor.basic_gray_light,
        paddingVertical: 24
    },
    header: {
        width: "100%",
        paddingHorizontal: isTablet ? 32 : 16,
        paddingVertical: isTablet ? 14 : 15,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: CommonColor.basic_gray_light
    }
})
