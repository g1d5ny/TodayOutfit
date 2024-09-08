import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CommonColor, CommonStyle, MobileFont, ShadowStyle, TabletFont } from "../../style/CommonStyle"
import { useState } from "react"
import { isTablet } from "../../store"
import GreenCheck from "../../asset/icon/icon_green_check.svg"
import X from "../../asset/icon/icon_x.svg"
import { LocationPermissionModal } from "../../component/LocationPermissionModal"
import { Guide } from "component/Guide"
import { OnBoardingText } from "text/OnBoardingText"
import { SearchInput } from "component/SearchInput"
import { navigate } from "navigation/RootNavigation"

const COMMON_ICON = isTablet ? 26 : 22
export const GuideAddressScreen = () => {
    const [isVisible, setIsVisible] = useState(false)

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
                                    <Text style={[isTablet ? TabletFont.body_1 : MobileFont.body_1, { color: CommonColor.main_blue }]}>서울특별시 중구</Text>
                                    <View style={styles.icon}>
                                        <GreenCheck width={COMMON_ICON} height={COMMON_ICON} />
                                    </View>
                                </View>
                                <View style={[styles.card, ShadowStyle, { marginLeft: isTablet ? 25 : 20 }]}>
                                    <Text style={[styles.location, isTablet ? TabletFont.body_2 : MobileFont.body_2]}>서울특별시 중구{"\n"}00대로 000길</Text>
                                    <View style={styles.icon}>
                                        <X width={COMMON_ICON} height={COMMON_ICON} />
                                    </View>
                                </View>
                            </View>
                        </>
                    }
                />
            </View>
            <View style={CommonStyle.row}>
                <View style={styles.selectedPhase} />
                <View style={styles.unSelectedPhase} />
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
        marginTop: isTablet ? 24 : 30
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff"
    }
})
