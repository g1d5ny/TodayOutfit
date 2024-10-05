import { StyleSheet, Text, View } from "react-native"
import { isTablet } from "store"
import { CommonColor, CommonStyle, FontStyle } from "style/CommonStyle"

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
                <Text style={[isTablet ? FontStyle.title2.regular : FontStyle.body2.regular, { color: CommonColor.main_blue }]}>{guideText}</Text>
                <Text style={[styles.titleContainer, isTablet ? FontStyle.display.bold : FontStyle.title1.bold, styles.title]}>{title}</Text>
                <Text style={[isTablet ? FontStyle.body1.regular : FontStyle.label1.regular, { color: CommonColor.basic_gray_dark }]}>{subTitle}</Text>
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
        width: "100%",
        paddingTop: 40,
        paddingBottom: isTablet ? 40 : 22
    },
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        paddingHorizontal: isTablet ? 131 : 16
    }
})
