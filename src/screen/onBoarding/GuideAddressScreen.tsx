import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CommonColor, CommonStyle, FontStyle, ShadowStyle } from "../../style/CommonStyle"
import { useState } from "react"
import { isTablet } from "../../store"
import GreenCheck from "../../asset/icon/icon_green_check.svg"
import X from "../../asset/icon/icon_x.svg"
import { LocationPermissionModal } from "../../component/LocationPermissionModal"
import { Guide } from "component/Guide"
import { OnBoardingText } from "text/OnBoardingText"
import { SearchInput } from "component/SearchInput"
import { navigate } from "navigation/RootNavigation"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const COMMON_ICON = isTablet ? 27 : 24
export const GuideAddressScreen = () => {
    const [isVisible, setIsVisible] = useState(false)
    const { bottom } = useSafeAreaInsets()

    return (
        <View style={styles.container}>
            <View>
                <Guide
                    guideText={OnBoardingText.addressGuideText}
                    title={OnBoardingText.guideTitle}
                    subTitle={OnBoardingText.addressTitle}
                    children={
                        <>
                            <TouchableOpacity onPress={() => navigate("SearchAddressScreen")}>
                                <SearchInput hasInput={false} />
                            </TouchableOpacity>
                            <View style={styles.addressView}>
                                <View style={[styles.card, ShadowStyle]}>
                                    <Text style={[FontStyle.body2.bold, { color: CommonColor.main_blue }]}>서울특별시 중구</Text>
                                    <View style={styles.icon}>
                                        <GreenCheck width={COMMON_ICON} height={COMMON_ICON} />
                                    </View>
                                </View>
                                <View style={[styles.card, ShadowStyle]}>
                                    <Text style={[styles.location, FontStyle.body2.regular]}>서울특별시 중구{"\n"}00대로 000길</Text>
                                    <View style={styles.icon}>
                                        <X width={COMMON_ICON} height={COMMON_ICON} />
                                    </View>
                                </View>
                            </View>
                        </>
                    }
                />
                <View style={[CommonStyle.center, CommonStyle.row, { marginBottom: Platform.OS === "ios" ? (isTablet ? 60 : 0) : 28 }]}>
                    <View style={styles.selectedPhase} />
                    <View style={styles.unSelectedPhase} />
                </View>
            </View>
            <LocationPermissionModal isVisible={isVisible} setIsVisible={setIsVisible} />
        </View>
    )
}

const styles = StyleSheet.create({
    location: {
        textAlign: "center"
    },
    unSelectedPhase: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 8,
        backgroundColor: CommonColor.basic_gray_medium
    },
    selectedPhase: {
        width: 50,
        height: 8,
        backgroundColor: CommonColor.main_blue,
        borderRadius: 5
    },
    icon: {
        position: "absolute",
        bottom: isTablet ? -13 : -13
    },
    card: {
        width: isTablet ? 174 : 152,
        height: isTablet ? 112 : 98,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    addressView: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 30,
        gap: isTablet ? 24 : 20
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff"
    }
})
