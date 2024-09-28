import { Keyboard, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { CommonColor, CommonStyle, FontStyle, screenWidth } from "../../style/CommonStyle"
import { inputAddressState, isTablet, resultAdressListState } from "../../store"
import { useRecoilState } from "recoil"
import { SearchInput } from "../../component/SearchInput"
import { isEmpty } from "lodash"
import { useEffect, useState } from "react"
import { useAddressHook } from "../../hook/useAddressHook"
import { MY_ADDRSS } from "../../type"
import { NowDate } from "utils"
import { navigationRef } from "navigation/RootNavigation"
import { SearchResult } from "component/SearchResult"
import { OnBoardingText } from "text/OnBoardingText"
import { Guide } from "component/Guide"
import useKeyboardHeight from "hook/useKeyboardHeight"

const selectedAddressInitialValue = {
    id: 0,
    location: "",
    coordinate: {
        longitude: 0,
        latitude: 0
    },
    date: NowDate()
}

export const SearchAddressScreen = () => {
    const [resultAddress, setResultAddress] = useRecoilState(resultAdressListState)
    const [inputAddress, setInputAddress] = useRecoilState(inputAddressState)
    const [selectedAddress, setSelectedAddress] = useState<MY_ADDRSS | null>(selectedAddressInitialValue)
    const disabled = resultAddress && resultAddress[0] === "NOT_FOUND"
    const { searchAddress } = useAddressHook()
    const { keyboardHeight } = useKeyboardHeight()

    const onPress = () => {
        Keyboard.dismiss()
        searchAddress()
    }

    useEffect(() => {
        return () => {
            setInputAddress("")
            setResultAddress([])
        }
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Guide
                    guideText={OnBoardingText.addressGuideText}
                    title={OnBoardingText.searchTitle}
                    subTitle={OnBoardingText.addressTitle}
                    children={
                        <>
                            <SearchInput hasInput autoFocus isOnboarding />
                            <View style={CommonStyle.flex}>
                                <SearchResult selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
                                {!isEmpty(resultAddress) && (
                                    <View style={[CommonStyle.row, styles.phase]}>
                                        <View style={styles.selectedPhase} />
                                        <View style={styles.unSelectedPhase} />
                                    </View>
                                )}
                                {keyboardHeight > 0 && inputAddress && (
                                    <TouchableOpacity
                                        disabled={disabled}
                                        style={[styles.confirmButton, { backgroundColor: disabled ? CommonColor.basic_gray_medium : CommonColor.main_blue, bottom: keyboardHeight }]}
                                        onPress={onPress}
                                    >
                                        <Text style={[FontStyle.title2.semibold2, { color: CommonColor.main_white }]}>확인</Text>
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
        marginTop: 26
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
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff"
    }
})
