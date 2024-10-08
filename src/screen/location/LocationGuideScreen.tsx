import { AddressGuide } from "component/AddressGuide"
import { AppBar } from "component/CommonComponent"
import { SearchHistory } from "component/SearchHistory"
import { SearchInput } from "component/SearchInput"
import { SearchResult } from "component/SearchResult"
import { useAddressHook } from "hook/useAddressHook"
import useKeyboardHeight from "hook/useKeyboardHeight"
import { useUserLocationHook } from "hook/useUserLocationHook"
import { isEmpty } from "lodash"
import { navigationRef } from "navigation/RootNavigation"
import { useEffect, useState } from "react"
import { Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useRecoilState } from "recoil"
import { inputAddressState, isTablet, resultAddressListState } from "store"
import { CommonColor, CommonStyle, FontStyle, screenWidth } from "style/CommonStyle"
import { OnBoardingText } from "text/OnBoardingText"
import { MY_ADDRSS } from "type"
import { isIos, NowDate } from "utils"

const selectedAddressInitialValue = {
    id: 0,
    location: "",
    coordinate: {
        longitude: 0,
        latitude: 0
    },
    date: NowDate()
}

const BUTTON_HEIGHT = 58
export const LocationGuideScreen = () => {
    const [resultAddress, setResultAddress] = useRecoilState(resultAddressListState)
    const [inputAddress, setInputAddress] = useRecoilState(inputAddressState)
    const [selectedAddress, setSelectedAddress] = useState<MY_ADDRSS | null>(selectedAddressInitialValue)
    const isNotFoundAddress = resultAddress && resultAddress[0] === "NOT_FOUND"
    const { addUserAddress } = useUserLocationHook()
    const { searchAddress } = useAddressHook()
    const { keyboardHeight } = useKeyboardHeight()

    const reset = () => {
        setSelectedAddress(null)
        setResultAddress([])
        setInputAddress({ value: "", isEditing: false })
        navigationRef.current?.navigate("LocationNavigator", { screen: "LocationScreen" })
    }

    useEffect(() => {
        return () => {
            reset()
        }
    }, [])

    return (
        <View style={CommonStyle.flex}>
            <AppBar text='위치 설정' hasBack={false} custom={{ text: "취소", onPress: reset }} />
            <View style={[CommonStyle.flex, styles.scrollView]}>
                <View style={CommonStyle.padding}>
                    <SearchInput
                        hasInput
                        autoFocus
                        onSubmitEditing={() => {
                            if (!isEmpty(inputAddress.value)) {
                                searchAddress()
                            }
                            Keyboard.dismiss()
                        }}
                    />
                </View>
                {isEmpty(resultAddress) && (
                    <>
                        <SearchHistory />
                        <View style={[CommonStyle.center, styles.addressGuide]}>
                            <Text style={[isTablet ? FontStyle.body2.regular : FontStyle.label1.regular, { color: CommonColor.basic_gray_dark }]}>{OnBoardingText.addressTitle}</Text>
                            <AddressGuide style={styles.guide} />
                        </View>
                    </>
                )}
                <ScrollView style={{ flex: 1 }} contentContainerStyle={[CommonStyle.padding, { paddingBottom: BUTTON_HEIGHT }]}>
                    <SearchResult selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
                </ScrollView>
            </View>
            {(keyboardHeight > 0 || selectedAddress?.location) && (
                <TouchableOpacity
                    disabled={isNotFoundAddress || inputAddress.value.length === 0}
                    style={[
                        styles.confirmButton,
                        {
                            backgroundColor: isNotFoundAddress || inputAddress.value.length === 0 ? CommonColor.basic_gray_medium : CommonColor.main_blue,
                            bottom: isIos ? (keyboardHeight > 0 ? keyboardHeight : 0) : 0
                        }
                    ]}
                    onPress={async () => {
                        if (selectedAddress?.location) {
                            await addUserAddress({ id: selectedAddress.id, location: selectedAddress.location, coordinate: selectedAddress.coordinate, date: NowDate() })
                            reset()
                            return
                        }
                        searchAddress()
                        Keyboard.dismiss()
                    }}
                >
                    <Text style={[isTablet ? FontStyle.title2.semibold2 : FontStyle.title2.semibold2, { color: "#fff" }]}>확인</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    guide: {
        width: "100%",
        marginTop: 16
    },
    scrollView: {
        marginVertical: isTablet ? 24 : 18
    },
    confirmButton: {
        width: screenWidth,
        position: "absolute",
        paddingVertical: isTablet ? 20 : 17,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    addressGuide: {
        alignSelf: "center",
        marginTop: isTablet ? 56 : 50
    }
})
