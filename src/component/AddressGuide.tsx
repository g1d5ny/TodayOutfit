import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import GreenCheck from "asset/icon/icon_green_check.svg"
import X from "/asset/icon/icon_x.svg"
import { CommonColor, FontStyle, ShadowStyle } from "style/CommonStyle"
import { isTablet } from "store"

const COMMON_ICON = 24

interface IProps {
    style?: StyleProp<ViewStyle>
}
export const AddressGuide = ({ style }: IProps) => {
    return (
        <View style={[styles.addressView, style]}>
            <View style={[styles.card, ShadowStyle]}>
                <Text style={[isTablet ? FontStyle.body1.regular : FontStyle.body2.bold, { color: CommonColor.main_blue }]}>서울특별시 중구</Text>
                <View style={styles.icon}>
                    <GreenCheck width={COMMON_ICON} height={COMMON_ICON} />
                </View>
            </View>
            <View style={[styles.card, ShadowStyle]}>
                <Text style={[styles.location, isTablet ? FontStyle.body1.regular : FontStyle.body2.regular, { color: CommonColor.basic_gray_dark }]}>서울특별시 중구{"\n"}00대로 000길</Text>
                <View style={styles.icon}>
                    <X width={COMMON_ICON} height={COMMON_ICON} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    location: {
        textAlign: "center"
    },
    icon: {
        position: "absolute",
        bottom: -13
    },
    card: {
        width: isTablet ? 216 : 157,
        height: 98,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    addressView: {
        maxWidth: isTablet ? 440 : 322,
        gap: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
})
