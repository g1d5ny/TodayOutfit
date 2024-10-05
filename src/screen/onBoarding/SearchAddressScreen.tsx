import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { CommonColor, CommonStyle, FontStyle, screenWidth } from "../../style/CommonStyle"
import { inputAddressState, isTablet, resultAddressListState } from "../../store"
import { useRecoilState } from "recoil"
import { SearchInput } from "../../component/SearchInput"
import { isEmpty } from "lodash"
import { useEffect, useState } from "react"
import { useAddressHook } from "../../hook/useAddressHook"
import { isIos, NowDate } from "utils"
import { SearchResult } from "component/SearchResult"
import { OnBoardingText } from "text/OnBoardingText"
import { Guide } from "component/Guide"
import useKeyboardHeight from "hook/useKeyboardHeight"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { navigate } from "navigation/RootNavigation"
import { useUserLocationHook } from "hook/useUserLocationHook"
import { MY_ADDRSS } from "type"

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
    const [resultAddress, setResultAddress] = useRecoilState(resultAddressListState)
    const [inputAddress, setInputAddress] = useRecoilState(inputAddressState)
    const [selectedAddress, setSelectedAddress] = useState<MY_ADDRSS | null>(null)
    const inputDisabled = inputAddress.value.length === 0
    const completeButtonVisible = !isEmpty(resultAddress) && resultAddress[0] !== "NOT_FOUND"
    const { searchAddress } = useAddressHook()
    const { keyboardHeight } = useKeyboardHeight()
    const { addUserAddress } = useUserLocationHook()

    const onPress = () => {
        Keyboard.dismiss()
        searchAddress()
    }

    useEffect(() => {
        return () => {
            setSelectedAddress(null)
            setInputAddress({ value: "", isEditing: false })
            setResultAddress([])
        }
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Guide
                    guideText={OnBoardingText.addressGuideText}
                    title={OnBoardingText.guideTitle}
                    subTitle={OnBoardingText.addressTitle}
                    children={
                        <>
                            <SearchInput hasInput autoFocus isOnboarding />
                            <View style={{ flex: 1, width: "100%" }}>
                                <SearchResult selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
                                {completeButtonVisible ? (
                                    <TouchableOpacity
                                        disabled={!selectedAddress?.id}
                                        style={[
                                            styles.completeButton,
                                            { backgroundColor: !selectedAddress?.id ? CommonColor.basic_gray_medium : CommonColor.main_blue, bottom: keyboardHeight }
                                        ]}
                                        onPress={async () => {
                                            if (selectedAddress) {
                                                const { id, location: location, coordinate } = selectedAddress
                                                await addUserAddress({ id, location: location.trim(), coordinate, date: NowDate() })
                                                setSelectedAddress(null)
                                                navigate("SelectGenderScreen")
                                            }
                                        }}
                                    >
                                        <Text style={[isTablet ? FontStyle.title2.semibold2 : FontStyle.body1.bold, { color: CommonColor.main_white }]}>완료</Text>
                                    </TouchableOpacity>
                                ) : (
                                    keyboardHeight > 0 && (
                                        <TouchableOpacity
                                            disabled={inputDisabled}
                                            style={[
                                                styles.confirmButton,
                                                { backgroundColor: inputDisabled ? CommonColor.basic_gray_medium : CommonColor.main_blue, bottom: isIos ? keyboardHeight : 0 }
                                            ]}
                                            onPress={onPress}
                                        >
                                            <Text style={[isTablet ? FontStyle.title2.semibold2 : FontStyle.body1.bold, { color: CommonColor.main_white }]}>확인</Text>
                                        </TouchableOpacity>
                                    )
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
        paddingTop: 26
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
    completeButton: {
        width: "100%",
        paddingVertical: isTablet ? 20 : 17,
        marginTop: isTablet ? 26 : 22,
        marginBottom: isTablet ? 100 : 28,
        borderRadius: isTablet ? 8 : 6,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center"
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
