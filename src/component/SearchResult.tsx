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
import { useUserLocationHook } from "hook/useUserLocationHook"
import { navigationRef } from "navigation/RootNavigation"

interface InputProps extends TextInputProps {
    selectedAddress: MY_ADDRSS | null
    setSelectedAddress: Dispatch<SetStateAction<MY_ADDRSS | null>>
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
export const SearchResult = memo(({ selectedAddress, setSelectedAddress }: InputProps) => {
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
                    <Text style={[isTablet ? TabletFont.body_1 : MobileFont.body_1, { color: CommonColor.main_blue }]}>{address_name}</Text>
                ) : (
                    <Text style={isTablet ? TabletFont.body_2 : MobileFont.body_2}>{address_name}</Text>
                )}
                {isSelected ? <BlueCheck /> : <GrayCheck />}
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {!isEmpty(resultAddress) ? (
                isNotFoundAddress ? (
                    <Text style={[isTablet ? TabletFont.label1_regular : MobileFont.label1_regular, { color: CommonColor.etc_red, marginTop: 6 }]}>올바르지 않은 주소입니다.</Text>
                ) : (
                    <View style={{ marginTop: 4 }}>
                        <Text style={[isTablet ? TabletFont.label1_regular : MobileFont.label1_regular, { color: CommonColor.main_blue }]}>'{inputAddress}' 검색 결과</Text>
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
        paddingLeft: isTablet ? 15 : 18,
        paddingRight: isTablet ? 24 : 18,
        marginBottom: 4,
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
