import { Dispatch, SetStateAction, memo, useState } from "react"
import { CommonColor, FontStyle } from "../style/CommonStyle"
import { ScrollView, StyleSheet, Text, TextInputProps, TouchableOpacity, View } from "react-native"
import { inputAddressState, isTablet, myAddressListState, resultAdressListState } from "../store"
import { LocationPermissionModal } from "./LocationPermissionModal"
import { useRecoilState, useRecoilValue } from "recoil"
import { isEmpty } from "lodash"
import { MY_ADDRSS } from "../type"
import BlueCheck from "../asset/icon/icon_blue_check.svg"
import GrayCheck from "../asset/icon/icon_gray_check.svg"
import { NowDate } from "utils"
import { useUserLocationHook } from "hook/useUserLocationHook"
import { navigationRef } from "navigation/RootNavigation"

interface InputProps extends TextInputProps {
    selectedAddress: MY_ADDRSS | null
}

interface Result {
    id: number
    isSelected: boolean
    coordinate: {
        longitude: number
        latitude: number
    }
    address_name: string
}

const resultHeight = isTablet ? 62 : 60
const verticalMargin = 4
const maxCount = isTablet ? 10 : 7
export const SearchResult = memo(({ selectedAddress }: InputProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const inputAddress = useRecoilValue(inputAddressState)
    const resultAddress = useRecoilValue(resultAdressListState)
    const isNotFoundAddress = resultAddress[0] === "NOT_FOUND"
    const { addUserAddress } = useUserLocationHook()

    const navigateNext = () => {
        navigationRef?.current?.navigate("SelectGenderScreen")
    }

    const ResultView = ({ isSelected, id, coordinate, address_name }: Result) => {
        const saveAddress = async () => {
            addUserAddress({ id, location: address_name.trim(), coordinate, date: NowDate() })
        }
        return (
            <TouchableOpacity
                style={[styles.resultView, { borderColor: isSelected ? CommonColor.main_blue : CommonColor.basic_gray_medium }]}
                onPress={async () => {
                    await saveAddress()
                    navigateNext()
                }}
            >
                {isSelected ? (
                    <Text style={[isTablet ? FontStyle.body1.bold : FontStyle.body2.bold, { color: CommonColor.main_blue }]}>{address_name}</Text>
                ) : (
                    <Text style={isTablet ? FontStyle.body1.regular : FontStyle.body2.regular}>{address_name}</Text>
                )}
                {isSelected ? <BlueCheck /> : <GrayCheck />}
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {!isEmpty(resultAddress) ? (
                isNotFoundAddress ? (
                    <Text style={[FontStyle.label1.regular, { color: CommonColor.etc_red, marginTop: 6 }]}>올바르지 않은 주소입니다.</Text>
                ) : (
                    <View style={{ marginTop: 4 }}>
                        <Text style={[FontStyle.label1.regular, { color: CommonColor.main_blue }]}>'{inputAddress}' 검색 결과</Text>
                        <View style={{ maxHeight: resultHeight * maxCount + verticalMargin * (maxCount - 2), marginTop: isTablet ? 26 : 16 }}>
                            <ScrollView>
                                {resultAddress.map(({ road_address, address }, index) => {
                                    const coordinate = { longitude: Number(address?.x ?? road_address?.x), latitude: Number(address?.y ?? road_address?.y) }
                                    const resultId = Number(road_address?.x ?? address?.x) + Number(road_address?.y ?? address?.y)
                                    const isSelected = resultId === selectedAddress?.id
                                    let address_name = ""
                                    if (address) {
                                        address_name =
                                            address?.region_1depth_name +
                                            " " +
                                            address?.region_2depth_name +
                                            " " +
                                            (address?.region_3depth_h_name === "" ? address?.region_3depth_name : address?.region_3depth_h_name)
                                    } else {
                                        address_name = road_address?.region_1depth_name + " " + road_address?.region_2depth_name + " " + road_address?.region_3depth_name
                                    }
                                    return <ResultView key={index} isSelected={isSelected} id={resultId} coordinate={coordinate} address_name={address_name} />
                                })}
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

const styles = StyleSheet.create({
    resultView: {
        width: "100%",
        borderLeftWidth: 2,
        backgroundColor: CommonColor.basic_gray_light,
        paddingVertical: 20,
        paddingLeft: isTablet ? 15 : 18,
        paddingRight: isTablet ? 24 : 18,
        marginBottom: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})
