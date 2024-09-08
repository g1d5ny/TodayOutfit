import { StyleSheet, Text, View } from "react-native"
import { isTablet } from "store"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "style/CommonStyle"
import { SearchInput } from "./SearchInput"

interface IProps {
    guideText: string
    title: string
    subTitle: string
    children: JSX.Element
}

export const Guide = ({ guideText, title, subTitle, children }: IProps) => {
    return (
        <View style={[CommonStyle.flex, styles.container, isTablet ? styles.tabletContainer : styles.mobileContainer]}>
            <View style={[styles.textContainer, CommonStyle.center]}>
                <Text style={[isTablet ? TabletFont.button_2 : MobileFont.body_2, { color: CommonColor.main_blue }]}>{guideText}</Text>
                <View style={[CommonStyle.center, styles.titleContainer]}>
                    <Text style={[isTablet ? TabletFont.title_on_boarding : MobileFont.title_on_boarding, styles.title]}>{title}</Text>
                </View>
                <Text style={[isTablet ? TabletFont.button_2 : MobileFont.detail_2, { color: CommonColor.basic_gray_dark }]}>{subTitle}</Text>
            </View>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center"
    },
    titleContainer: {
        marginTop: 18,
        marginBottom: 8
    },
    textContainer: {
        marginTop: "20%",
        marginBottom: 40
    },
    tabletContainer: {
        paddingHorizontal: 132
    },
    mobileContainer: {
        paddingHorizontal: 16
    },
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center"
    }
})
