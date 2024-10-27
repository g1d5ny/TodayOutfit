import { useQuery } from "@tanstack/react-query"
import { searchAddressApi } from "api/address"
import { AddressGuide } from "component/AddressGuide"
import { AppBar } from "component/CommonComponent"
import { SearchHistory } from "component/SearchHistory"
import { SearchInput } from "component/SearchInput"
import { SearchResult } from "component/SearchResult"
import useKeyboardHeight from "hook/useKeyboardHeight"
import { useUserLocationHook } from "hook/useUserLocationHook"
import { navigationRef } from "navigation/RootNavigation"
import { useEffect, useMemo, useState } from "react"
import { Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useRecoilState } from "recoil"
import { inputAddressState, isTablet, queryClient } from "store"
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
    const [{ value, isEditing }, setInputAddress] = useRecoilState(inputAddressState)
    const [selectedAddress, setSelectedAddress] = useState<MY_ADDRSS | null>(selectedAddressInitialValue)
    const onSubmitEditing = useMemo(() => !!value && !isEditing, [value, isEditing])
    const { addUserAddress } = useUserLocationHook()
    const { keyboardHeight } = useKeyboardHeight()

    const { isLoading, error, data } = useQuery({
        queryKey: [value],
        queryFn: async () => {
            const data = await searchAddressApi(encodeURIComponent(value))
            const {
                errorType,
                meta: { total_count },
                documents
            } = data

            if (!!errorType || total_count === 0 || documents.length === 0) {
                throw new Error("No results found.") // 에러 발생
            }
            return documents
        },
        enabled: onSubmitEditing && !queryClient.getQueryData([value])
    })

    const reset = () => {
        setSelectedAddress(null)
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
            <View style={[CommonStyle.flex, CommonStyle.padding, styles.scrollView]}>
                <SearchInput hasInput autoFocus error={error} />
                {data ? (
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={[CommonStyle.flex, { paddingBottom: BUTTON_HEIGHT }]}>
                        <SearchResult isLoading={isLoading} data={data} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
                    </ScrollView>
                ) : error ? (
                    <Text style={[isTablet ? FontStyle.body2.regular : FontStyle.label1.regular, styles.errorText, { color: CommonColor.etc_red }]}>올바르지 않은 주소입니다.</Text>
                ) : (
                    <>
                        <SearchHistory />
                        <View style={[CommonStyle.center, styles.addressGuide]}>
                            <Text style={[isTablet ? FontStyle.body2.regular : FontStyle.label1.regular, { color: CommonColor.basic_gray_dark }]}>{OnBoardingText.addressTitle}</Text>
                            <AddressGuide style={styles.guide} />
                        </View>
                    </>
                )}
            </View>
            {(keyboardHeight > 0 || selectedAddress?.location) && (
                <TouchableOpacity
                    disabled={!!error || value.length === 0}
                    style={[
                        styles.confirmButton,
                        {
                            backgroundColor: !!error || value.length === 0 ? CommonColor.basic_gray_medium : CommonColor.main_blue,
                            bottom: isIos ? (keyboardHeight > 0 ? keyboardHeight : 0) : 0
                        }
                    ]}
                    onPress={async () => {
                        if (selectedAddress?.location) {
                            await addUserAddress({ id: selectedAddress.id, location: selectedAddress.location, coordinate: selectedAddress.coordinate, date: NowDate() })
                            reset()
                            return
                        }

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
    errorText: {
        marginTop: 6
    },
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
