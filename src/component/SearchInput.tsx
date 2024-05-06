import { Dispatch, SetStateAction, memo, useEffect, useState } from "react"
import { CommonColor, MobileFont, TabletFont } from "../style/CommonStyle"
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { inputAddressState, isTablet, resultAdressListState } from "../store"
import { LocationPermissionModal } from "./LocationPermissionModal"
import Search from "../asset/icon/icon_search.svg"
import FocusLocation from "../asset/icon/icon_focus_location.svg"
import FocusOffLocation from "../asset/icon/icon_focus_off_location.svg"
import { useRecoilState } from "recoil"
import { useAddressHook } from "../hook/useAddressHook"
import { isEmpty } from "lodash"
import { MY_ADDRSS } from "../type"
import BlueCheck from "../asset/icon/icon_blue_check.svg"
import GrayCheck from "../asset/icon/icon_gray_check.svg"

interface InputProps {
    isInput: boolean
    onPress?: () => void
    onFocus?: boolean
    setOnFocus?: Dispatch<SetStateAction<boolean>>
    selectedAddress?: MY_ADDRSS | undefined
    setSelectedAddress?: Dispatch<SetStateAction<MY_ADDRSS>>
}

const mobileResultViewHeight = 59
const tabletResultViewHeight = 62
const selectedAddressInitialValue = {
    location: "",
    coordinate: {
        longitude: 0,
        latitude: 0
    }
}
export default memo(({ isInput, onPress, onFocus, setOnFocus, selectedAddress, setSelectedAddress }: InputProps) => {
    // const [loading, setLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(false)
    const [inputAddress, setInputAddress] = useRecoilState(inputAddressState)
    const [resultAddress, setResultAddress] = useRecoilState(resultAdressListState)
    const isNotFoundAddress = resultAddress && resultAddress[0] === "NOT_FOUND"
    const { searchAddress } = useAddressHook()

    const border = () => {
        if (onFocus) {
            return { borderWidth: 2, borderColor: CommonColor.main_blue }
        }
        if (isNotFoundAddress) {
            return { borderWidth: 2, borderColor: CommonColor.etc_red }
        }
        return { borderWidth: 0 }
    }

    useEffect(() => {
        if (isNotFoundAddress && setSelectedAddress) {
            setSelectedAddress(selectedAddressInitialValue)
        }
    }, [resultAddress])

    useEffect(() => {
        return () => {
            if (setSelectedAddress) {
                setSelectedAddress(selectedAddressInitialValue)
            }
            setInputAddress("")
            setResultAddress([])
        }
    }, [])

    return (
        <View style={{ width: "100%", justifyContent: "space-between" }}>
            <View style={[styles.input, border()]}>
                <Search width={isTablet ? 24 : 20} height={isTablet ? 24 : 20} />
                {isInput ? (
                    <TextInput
                        value={inputAddress}
                        onChangeText={value => setInputAddress(value)}
                        placeholder='예시: 서울특별시 중구'
                        placeholderTextColor={CommonColor.basic_gray_medium}
                        autoFocus
                        onFocus={() => setOnFocus && setOnFocus(true)}
                        onBlur={() => setOnFocus && setOnFocus(false)}
                        autoCorrect={false}
                        onSubmitEditing={searchAddress}
                        style={[isTablet ? TabletFont.body_2 : MobileFont.body_2, styles.textView]}
                    />
                ) : (
                    <TouchableOpacity style={styles.textView} onPress={onPress}>
                        <Text style={[styles.text, { color: CommonColor.basic_gray_medium }]}>예시: 서울특별시 중구</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={onPress}>{onFocus ? <FocusOffLocation width={isTablet ? 26 : 22} height={isTablet ? 26 : 22} /> : <FocusLocation width={isTablet ? 26 : 22} height={isTablet ? 26 : 22} />}</TouchableOpacity>
                {/* {loading ? <Loader style={{ marginTop: 100 }} /> : <></>} */}
            </View>
            {!isEmpty(resultAddress) ? (
                isNotFoundAddress ? (
                    <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_2, { color: CommonColor.etc_red, marginTop: 6 }]}>올바르지 않은 주소입니다.</Text>
                ) : (
                    <View style={{ marginTop: 6 }}>
                        <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_2, { color: CommonColor.main_blue }]}>'{inputAddress}' 검색 결과</Text>
                        <ScrollView style={{ maxHeight: isTablet ? tabletResultViewHeight * 7 : mobileResultViewHeight * 6, marginTop: isTablet ? 24 : 9 }}>
                            {resultAddress.map(({ address_name, address: { region_1depth_name, region_2depth_name, region_3depth_h_name, region_3depth_name, x, y } }, index) => {
                                const isSelected = selectedAddress && selectedAddress.coordinate.longitude === Number(x) && selectedAddress && selectedAddress.coordinate.latitude === Number(y)
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.resultView, { borderColor: isSelected ? CommonColor.main_blue : CommonColor.basic_gray_medium }]}
                                        onPress={() =>
                                            setSelectedAddress &&
                                            setSelectedAddress({
                                                location: region_1depth_name + " " + region_2depth_name + " " + region_3depth_h_name + " " + region_3depth_name,
                                                coordinate: { longitude: Number(x), latitude: Number(y) }
                                            })
                                        }
                                    >
                                        {isSelected ? (
                                            <Text style={[isTablet ? TabletFont.body_1 : MobileFont.body_1, { color: CommonColor.main_blue }]}>{address_name}</Text>
                                        ) : (
                                            <Text style={isTablet ? TabletFont.body_2 : MobileFont.body_2}>{address_name}</Text>
                                        )}
                                        {isSelected ? <BlueCheck /> : <GrayCheck />}
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                )
            ) : (
                <></>
            )}
            <LocationPermissionModal isVisible={isVisible} setIsVisible={setIsVisible} />
        </View>
    )
})

export const styles = StyleSheet.create({
    confirmButton: {
        width: "100%",
        height: isTablet ? 64 : 56,
        alignItems: "center",
        justifyContent: "center"
    },
    resultView: {
        width: "100%",
        borderLeftWidth: 2,
        backgroundColor: CommonColor.basic_gray_light,
        paddingVertical: 20,
        paddingHorizontal: 18,
        marginBottom: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: isTablet ? TabletFont.body_2 : MobileFont.body_2,
    textView: {
        flex: 1,
        marginLeft: 15,
        marginRight: 20
    },
    input: {
        width: "100%",
        borderRadius: 6,
        paddingLeft: isTablet ? 24 : 18,
        paddingRight: isTablet ? 24 : 15,
        paddingVertical: isTablet ? 20 : 17,
        backgroundColor: CommonColor.basic_gray_light,
        flexDirection: "row",
        alignItems: "center"
    }
})
