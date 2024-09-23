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
        <View style={[CommonStyle.flex, styles.container]}>
            <View style={[styles.textContainer, CommonStyle.center]}>
                <Text style={[isTablet ? TabletFont.title2_regular : MobileFont.body2_regular, { color: CommonColor.main_blue }]}>{guideText}</Text>
                <Text style={[styles.titleContainer, isTablet ? TabletFont.display_bold : MobileFont.title1_bold, styles.title]}>{title}</Text>
                <Text style={[isTablet ? TabletFont.body1_regular : MobileFont.label1_regular, { color: CommonColor.basic_gray_dark }]}>{subTitle}</Text>
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
        paddingTop: 40,
        paddingBottom: isTablet ? 40 : 22,
        paddingHorizontal: 50
    },
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        paddingHorizontal: isTablet ? 131 : 16
    }
})
