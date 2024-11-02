import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { CommonColor, FontStyle, screenWidth } from "../../style/CommonStyle"
import { inputAddressState, isTablet } from "../../store"
import { useRecoilState } from "recoil"
import { SearchInput } from "../../component/SearchInput"
import { useEffect, useMemo, useState } from "react"
import { isIos, NowDate } from "utils"
import { SearchResult } from "component/SearchResult"
import { OnBoardingText } from "text/OnBoardingText"
import { Guide } from "component/Guide"
import useKeyboardHeight from "hook/useKeyboardHeight"
import { navigate } from "navigation/RootNavigation"
import { useUserLocationHook } from "hook/useUserLocationHook"
import { MY_ADDRSS } from "type"
import { searchAddressQuery } from "hook/useAddressHook"

export const SearchAddressScreen = () => {
    const [{ value }, setInputAddress] = useRecoilState(inputAddressState)
    const [selectedAddress, setSelectedAddress] = useState<MY_ADDRSS | null>(null)
    const inputDisabled = useMemo(() => value.length === 0, [value])
    const { keyboardHeight } = useKeyboardHeight()
    const { addUserAddress } = useUserLocationHook()
    const { isLoading, error, data } = searchAddressQuery()

    const reset = () => {
        setSelectedAddress(null)
        setInputAddress({ value: "", isEditing: false })
    }

    useEffect(() => {
        return () => {
            reset()
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
                            <SearchInput hasInput autoFocus isOnboarding error={error} />
                            {data ? (
                                <SearchResult isLoading={isLoading} data={data} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
                            ) : (
                                error && (
                                    <Text style={[isTablet ? FontStyle.body2.regular : FontStyle.label1.regular, styles.errorText, { color: CommonColor.etc_red }]}>
                                        올바르지 않은 주소입니다.
                                    </Text>
                                )
                            )}
                            {keyboardHeight > 0 ? (
                                <TouchableOpacity
                                    disabled={inputDisabled}
                                    style={[
                                        styles.confirmButton,
                                        { backgroundColor: inputDisabled ? CommonColor.basic_gray_medium : CommonColor.main_blue, bottom: isIos ? keyboardHeight : 0 }
                                    ]}
                                    onPress={Keyboard.dismiss}
                                >
                                    <Text style={[isTablet ? FontStyle.title2.semibold2 : FontStyle.body1.bold, { color: CommonColor.main_white }]}>확인</Text>
                                </TouchableOpacity>
                            ) : (
                                selectedAddress?.location && (
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
                                )
                            )}
                        </>
                    }
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    errorText: {
        marginTop: 6,
        alignSelf: "flex-start"
    },
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
