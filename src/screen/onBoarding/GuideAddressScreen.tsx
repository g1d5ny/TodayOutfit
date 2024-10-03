import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CommonColor, CommonStyle } from "../../style/CommonStyle"
import { useState } from "react"
import { isTablet } from "../../store"
import { LocationPermissionModal } from "../../component/LocationPermissionModal"
import { Guide } from "component/Guide"
import { OnBoardingText } from "text/OnBoardingText"
import { SearchInput } from "component/SearchInput"
import { navigate } from "navigation/RootNavigation"
import { isIos } from "utils"
import { AddressGuide } from "component/AddressGuide"

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
                            <AddressGuide style={styles.addressGuide} />
                        </>
                    }
                />
                <View style={[CommonStyle.center, CommonStyle.row, { marginBottom: isIos ? (isTablet ? 60 : 0) : 28 }]}>
                    <View style={styles.selectedPhase} />
                    <View style={styles.unSelectedPhase} />
                </View>
            </View>
            <LocationPermissionModal isVisible={isVisible} setIsVisible={setIsVisible} />
        </View>
    )
}

const styles = StyleSheet.create({
    addressGuide: {
        marginVertical: 30,
        gap: isTablet ? 24 : 20
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
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff"
    }
})
