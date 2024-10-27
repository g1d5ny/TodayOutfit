import { Dispatch, SetStateAction, memo, useState } from "react"
import { CommonColor, FontStyle } from "../style/CommonStyle"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { inputAddressState, isTablet } from "../store"
import { LocationPermissionModal } from "./LocationPermissionModal"
import { useRecoilValue } from "recoil"
import { MY_ADDRSS, RESULT_ADDRESS } from "../type"
import BlueCheck from "../asset/icon/icon_blue_check.svg"
import GrayCheck from "../asset/icon/icon_gray_check.svg"
import Loader from "./lottie/Loader"

interface Result {
    id: number
    coordinate: {
        longitude: number
        latitude: number
    }
    address_name: string
}

interface IProps {
    isLoading: boolean
    data: RESULT_ADDRESS[]
    selectedAddress: MY_ADDRSS | null
    setSelectedAddress: Dispatch<SetStateAction<MY_ADDRSS | null>>
}

export const SearchResult = memo(({ isLoading, data, selectedAddress, setSelectedAddress }: IProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const { value } = useRecoilValue(inputAddressState)

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

    if (isLoading) {
        return (
            <View style={styles.flex}>
                <Loader />
            </View>
        )
    }

    return (
        <View style={styles.flex}>
            {data && <Text style={[FontStyle.label1.regular, { color: CommonColor.main_blue }]}>'{value}' 검색 결과</Text>}
            <ScrollView contentContainerStyle={styles.resultGap} style={styles.scrollViewContainer}>
                {data?.map(({ road_address, address }, index) => {
                    const coordinate = { longitude: Number(address?.x ?? road_address?.x), latitude: Number(address?.y ?? road_address?.y) }
                    const resultId = Number(road_address?.x ?? address?.x) + Number(road_address?.y ?? address?.y)
                    let address_name = ""
                    if (address) {
                        address_name = address?.address_name
                    } else {
                        address_name = road_address?.region_1depth_name + " " + road_address?.region_2depth_name + " " + road_address?.region_3depth_name
                    }
                    return <ResultView key={index} id={resultId} coordinate={coordinate} address_name={address_name} />
                })}
            </ScrollView>
            <LocationPermissionModal isVisible={isVisible} setIsVisible={setIsVisible} />
        </View>
    )
})

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        marginTop: isTablet ? 26 : 16
    },
    resultGap: {
        gap: 4
    },
    resultView: {
        width: "100%",
        borderLeftWidth: 2,
        backgroundColor: CommonColor.basic_gray_light,
        paddingVertical: 20,
        paddingLeft: isTablet ? 15 : 18,
        paddingRight: isTablet ? 24 : 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    flex: {
        flex: 1
    }
})
