import { SearchInput } from "component/SearchInput"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useRecoilValue } from "recoil"
import { isTablet, myAddressListState } from "store"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "style/CommonStyle"
import LocationOn from "asset/icon/icon_location_on.svg"
import LocationOff from "asset/icon/icon_location_off.svg"
import Check from "asset/icon/icon_check_circle.svg"
import UnCheck from "asset/icon/icon_uncheck_circle.svg"
import Remove from "asset/icon/icon_remove_circle.svg"
import { useEffect, useState } from "react"
import { useUserLocationHook } from "hook/useUserLocationHook"
import { MY_ADDRSS } from "type"
import { NowDate } from "utils"
import { SearchHistory } from "component/SearchHistory"

const selectedAddressInitialValue = {
    id: "",
    location: "",
    coordinate: {
        longitude: 0,
        latitude: 0
    },
    date: NowDate()
}
export const LocationScreen = () => {
    const myAddressList = useRecoilValue(myAddressListState)
    const [showRemoveView, setShowRemoveView] = useState<boolean>(false)
    const [selectedAddress, setSelectedAddress] = useState<MY_ADDRSS>(selectedAddressInitialValue)
    const { addUserAddress, removeUserAddress, getUserLocation } = useUserLocationHook()

    const SelectedView = ({ location }: { location: string }) => {
        return (
            <View style={[CommonStyle.row, styles.locationContainer, styles.selectedContainer]}>
                <View style={CommonStyle.row}>
                    <LocationOn width={22} />
                    <View style={styles.locationView}>
                        <Text style={[isTablet ? TabletFont.body_2 : MobileFont.detail_2, styles.nowLocation]}>현재 위치</Text>
                        <Text style={isTablet ? TabletFont.button_1 : MobileFont.heading_2}>{location}</Text>
                    </View>
                </View>
                <Check />
            </View>
        )
    }

    const PrevView = ({ item }: { item: MY_ADDRSS }) => {
        const { id, location, date, coordinate } = item
        const add = addUserAddress({ id, location, coordinate, date: NowDate() })
        const remove = removeUserAddress({ id, location, coordinate })

        return (
            <TouchableOpacity
                style={[CommonStyle.row, styles.locationContainer, styles.prevContainer, showRemoveView && styles.removeContainer]}
                onPress={() => {
                    showRemoveView ? remove : add
                }}
            >
                <View style={CommonStyle.row}>
                    <LocationOff width={22} />
                    <View style={styles.locationView}>
                        <Text style={[isTablet ? TabletFont.body_2 : MobileFont.detail_2, styles.prevLocation]}>이전 위치 | {date}</Text>
                        <Text style={isTablet ? TabletFont.button_1 : MobileFont.heading_2}>{location}</Text>
                    </View>
                </View>
                {showRemoveView ? <Remove /> : <UnCheck />}
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        if (selectedAddress.id) {
            addUserAddress(selectedAddress)
        }
    }, [selectedAddress])

    return (
        <View style={CommonStyle.flex}>
            <View style={styles.header}>
                <Text style={[isTablet ? TabletFont.button_1 : MobileFont.heading_1]}>위치 설정</Text>
                <TouchableOpacity onPress={() => setShowRemoveView(!showRemoveView)}>
                    <Text style={[isTablet ? TabletFont.body_2 : MobileFont.body_2, { color: CommonColor.main_blue }]}>{showRemoveView ? "취소" : "편집"}</Text>
                </TouchableOpacity>
            </View>
            <View style={CommonStyle.padding}>
                <SearchInput isInput getLocation={getUserLocation} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
                <SearchHistory />
                {myAddressList?.map((item, index) => {
                    const { id, location } = item
                    const isSelected = id === myAddressList[0].id
                    return isSelected ? <SelectedView key={index} location={location} /> : <PrevView key={index} item={item} />
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    removeContainer: {
        borderWidth: 2,
        borderColor: CommonColor.etc_red
    },
    prevLocation: {
        color: CommonColor.basic_gray_medium,
        marginBottom: 4
    },
    nowLocation: {
        color: CommonColor.main_blue,
        marginBottom: 4
    },
    locationView: {
        marginLeft: 18
    },
    prevContainer: {
        backgroundColor: CommonColor.basic_gray_light,
        borderRadius: 6
    },
    selectedContainer: {
        borderWidth: 2,
        borderColor: CommonColor.main_blue,
        borderRadius: 8
    },
    locationContainer: {
        marginTop: 32,
        width: "100%",
        paddingHorizontal: isTablet ? 24 : 18,
        paddingVertical: isTablet ? 16 : 13,
        justifyContent: "space-between"
    },
    header: {
        width: "100%",
        paddingHorizontal: isTablet ? 32 : 16,
        paddingVertical: isTablet ? 14 : 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: CommonColor.basic_gray_light
    }
})
