import { Keyboard, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { CommonColor, CommonStyle, MobileFont, screenWidth, TabletFont } from "../../style/CommonStyle"
import { inputAddressState, isTablet, resultAdressListState } from "../../store"
import { useRecoilValue } from "recoil"
import { SearchInput } from "../../component/SearchInput"
import { isEmpty } from "lodash"
import { useState } from "react"
import { useUserLocationHook } from "../../hook/useUserLocationHook"
import { useAddressHook } from "../../hook/useAddressHook"
import { MY_ADDRSS } from "../../type"
import { NowDate } from "utils"
import { navigationRef } from "navigation/RootNavigation"
import { SearchResult } from "component/SearchResult"
import { OnBoardingText } from "text/OnBoardingText"
import { Guide } from "component/Guide"
import useKeyboardHeight from "hook/useKeyboardHeight"

const selectedAddressInitialValue = {
    id: "",
    location: "",
    coordinate: {
        longitude: 0,
        latitude: 0
    },
    date: NowDate()
}

export const SearchAddressScreen = () => {
    const resultAddress = useRecoilValue(resultAdressListState)
    const inputAddress = useRecoilValue(inputAddressState)
    const [selectedAddress, setSelectedAddress] = useState<MY_ADDRSS | null>(selectedAddressInitialValue)
    const disabled = resultAddress && resultAddress[0] === "NOT_FOUND"
    const { addUserAddress } = useUserLocationHook()
    const { searchAddress } = useAddressHook()
    const { keyboardHeight } = useKeyboardHeight()

    const onPress = () => {
        Keyboard.dismiss()
        if (selectedAddress?.id) {
            const { id, location, coordinate } = selectedAddress
            addUserAddress({ id, location: location.trim(), coordinate, date: NowDate() }).then(() => {
                navigationRef?.current?.navigate("SelectGenderScreen")
            })
            return
        }
        searchAddress()
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Guide
                    guideText={OnBoardingText.addressGuideText}
                    title={OnBoardingText.searchTitle}
                    subTitle={OnBoardingText.addressTitle}
                    children={
                        <>
                            <SearchInput hasInput />
                            <View style={{ flex: 1 }}>
                                <SearchResult selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
                                {!isEmpty(resultAddress) && (
                                    <View style={[CommonStyle.row, styles.phase]}>
                                        <View style={styles.selectedPhase} />
                                        <View style={styles.unSelectedPhase} />
                                    </View>
                                )}
                                {inputAddress && (
                                    <TouchableOpacity
                                        disabled={disabled}
                                        style={[styles.confirmButton, { backgroundColor: disabled ? CommonColor.basic_gray_medium : CommonColor.main_blue, bottom: keyboardHeight }]}
                                        onPress={onPress}
                                    >
                                        <Text style={[isTablet ? TabletFont.button_1 : MobileFont.button_1, { color: CommonColor.main_white }]}>
                                            {selectedAddress?.id ? "앱 구경하러 가기" : "확인"}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </>
                    }
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    phase: {
        alignSelf: "center",
        marginBottom: 80
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
    confirmButton: {
        width: screenWidth,
        position: "absolute",
        paddingVertical: isTablet ? 20 : 17,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
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
        marginTop: isTablet ? 24 : 32
    },
    text: isTablet ? TabletFont.body_2 : MobileFont.body_2,
    addressContainer: {
        width: "100%",
        marginTop: isTablet ? 47 : 40,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: isTablet ? 132 : 16
    },
    content: {
        flex: 1
    },
    title: isTablet ? TabletFont.title_on_boarding : MobileFont.title_on_boarding,
    subtitle: isTablet ? TabletFont.body_2 : MobileFont.body_2,
    textContainer: {
        alignItems: "center",
        marginTop: isTablet ? 140 : 110
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff"
    }
})
