import { Dispatch, SetStateAction, memo, useState } from "react"
import { CommonColor, FontStyle } from "../style/CommonStyle"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { inputAddressState, isTablet, resultAddressListState } from "../store"
import { LocationPermissionModal } from "./LocationPermissionModal"
import { useRecoilState, useRecoilValue } from "recoil"
import { isEmpty } from "lodash"
import { MY_ADDRSS } from "../type"
import BlueCheck from "../asset/icon/icon_blue_check.svg"
import GrayCheck from "../asset/icon/icon_gray_check.svg"

interface Result {
    id: number
    coordinate: {
        longitude: number
        latitude: number
    }
    address_name: string
}

interface IProps {
    selectedAddress: MY_ADDRSS | null
    setSelectedAddress: Dispatch<SetStateAction<MY_ADDRSS | null>>
}

export const SearchResult = memo(({ selectedAddress, setSelectedAddress }: IProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const { value, isEditing } = useRecoilValue(inputAddressState)
    const resultAddress = useRecoilValue(resultAddressListState)
    const isNotFoundAddress = resultAddress[0] === "NOT_FOUND"

    const ResultView = ({ id, coordinate, address_name }: Result) => {
        const isSelected = address_name === selectedAddress?.location

        return (
            <TouchableOpacity
                style={[styles.resultView, { borderColor: isSelected ? CommonColor.main_blue : CommonColor.basic_gray_medium }]}
                onPress={() => setSelectedAddress({ id, location: address_name, coordinate })}
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
                    <Text style={[isTablet ? FontStyle.body2.regular : FontStyle.label1.regular, { color: CommonColor.etc_red, marginTop: 6 }]}>올바르지 않은 주소입니다.</Text>
                ) : (
                    <View style={{ flex: 1, marginTop: 4 }}>
                        {!isEditing && <Text style={[FontStyle.label1.regular, { color: CommonColor.main_blue }]}>'{value}' 검색 결과</Text>}
                        <View style={styles.scrollViewContainer}>
                            <ScrollView>
                                {resultAddress.map(({ road_address, address }, index) => {
                                    const coordinate = { longitude: Number(address?.x ?? road_address?.x), latitude: Number(address?.y ?? road_address?.y) }
                                    const resultId = Number(road_address?.x ?? address?.x) + Number(road_address?.y ?? address?.y)
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
                                    return <ResultView key={index} id={resultId} coordinate={coordinate} address_name={address_name} />
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
    scrollViewContainer: {
        flex: 1,
        marginTop: isTablet ? 26 : 16
    },
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
