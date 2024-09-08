import { Dispatch, SetStateAction, memo, useState } from "react"
import { CommonColor, MobileFont, TabletFont } from "../style/CommonStyle"
import { ScrollView, StyleSheet, Text, TextInputProps, TouchableOpacity, View } from "react-native"
import { inputAddressState, isTablet, myAddressListState, resultAdressListState } from "../store"
import { LocationPermissionModal } from "./LocationPermissionModal"
import { useRecoilState, useRecoilValue } from "recoil"
import { isEmpty } from "lodash"
import { MY_ADDRSS } from "../type"
import BlueCheck from "../asset/icon/icon_blue_check.svg"
import GrayCheck from "../asset/icon/icon_gray_check.svg"
import { NowDate } from "utils"

interface InputProps extends TextInputProps {
    selectedAddress: MY_ADDRSS | null
    setSelectedAddress: Dispatch<SetStateAction<MY_ADDRSS | null>>
}

const resultHeight = isTablet ? 62 : 60
const verticalMargin = 4
const maxCount = isTablet ? 10 : 6
export const SearchResult = memo(({ selectedAddress, setSelectedAddress }: InputProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const inputAddress = useRecoilValue(inputAddressState)
    const resultAddress = useRecoilValue(resultAdressListState)
    const isNotFoundAddress = resultAddress[0] === "NOT_FOUND"

    return (
        <View style={{ flex: 1 }}>
            {!isEmpty(resultAddress) ? (
                isNotFoundAddress ? (
                    <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_2, { color: CommonColor.etc_red, marginTop: 6 }]}>올바르지 않은 주소입니다.</Text>
                ) : (
                    <View style={{ marginTop: 6 }}>
                        <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_2, { color: CommonColor.main_blue }]}>'{inputAddress}' 검색 결과</Text>
                        <View style={{ maxHeight: resultHeight * maxCount + verticalMargin * (maxCount - 2), marginTop: isTablet ? 26 : 18 }}>
                            <ScrollView>
                                {resultAddress.map(
                                    ({ address_name, address: { b_code, h_code, region_1depth_name, region_2depth_name, region_3depth_h_name, region_3depth_name, x, y } }, index) => {
                                        const isSelected = selectedAddress?.coordinate.longitude === Number(x) && selectedAddress?.coordinate.latitude === Number(y)
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                style={[styles.resultView, { borderColor: isSelected ? CommonColor.main_blue : CommonColor.basic_gray_medium }]}
                                                onPress={() =>
                                                    setSelectedAddress({
                                                        id: isEmpty(b_code) ? h_code : b_code,
                                                        location: address_name,
                                                        coordinate: { longitude: Number(x), latitude: Number(y) },
                                                        date: NowDate()
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
                                    }
                                )}
                            </ScrollView>
                        </View>
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
        paddingHorizontal: isTablet ? 24 : 18,
        paddingVertical: isTablet ? 20 : 17,
        backgroundColor: CommonColor.basic_gray_light,
        flexDirection: "row",
        alignItems: "center"
    }
})
