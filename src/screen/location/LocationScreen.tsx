import React, { useState } from "react"
import { SearchInput } from "component/SearchInput"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useRecoilValue } from "recoil"
import { isTablet, myAddressListState } from "store"
import { CommonColor, CommonStyle, FontStyle } from "style/CommonStyle"
import LocationOn from "asset/icon/icon_location_on.svg"
import LocationOff from "asset/icon/icon_location_off.svg"
import Check from "asset/icon/icon_check_circle.svg"
import UnCheck from "asset/icon/icon_uncheck_circle.svg"
import Remove from "asset/icon/icon_remove_circle.svg"
import { useUserLocationHook } from "hook/useUserLocationHook"
import { MY_ADDRSS } from "type"
import { NowDate } from "utils"
import useKeyboardHeight from "hook/useKeyboardHeight"
import { navigationRef } from "navigation/RootNavigation"

const SelectedView = ({ location }: { location: string }) => {
    return (
        <View style={[CommonStyle.row, styles.locationContainer, styles.selectedContainer]}>
            <View style={[CommonStyle.row, { gap: isTablet ? 16 : 18 }]}>
                <LocationOn width={22} />
                <View>
                    <Text style={[isTablet ? FontStyle.body2.regular : FontStyle.label1.regular, styles.nowLocation]}>현재 위치</Text>
                    <Text style={isTablet ? FontStyle.title2.semibold2 : FontStyle.body1.bold}>{location}</Text>
                </View>
            </View>
            <Check />
        </View>
    )
}
export const LocationScreen = () => {
    const myAddressList = useRecoilValue(myAddressListState)
    const [showRemoveView, setShowRemoveView] = useState<boolean>(false)
    const { addUserAddress, removeUserAddress } = useUserLocationHook()

    const PrevView = ({ item }: { item: MY_ADDRSS }) => {
        const { id, location, date, coordinate } = item

        return (
            <TouchableOpacity
                style={[CommonStyle.row, styles.locationContainer, styles.prevContainer, showRemoveView && styles.removeContainer]}
                onPress={() => {
                    showRemoveView ? (removeUserAddress({ id, location, coordinate }), setShowRemoveView(false)) : addUserAddress({ id, location, coordinate, date: NowDate() })
                }}
            >
                <View style={[CommonStyle.row, { gap: isTablet ? 16 : 18 }]}>
                    <LocationOff width={22} />
                    <View>
                        <Text style={[isTablet ? FontStyle.body2.regular : FontStyle.label1.regular, styles.prevLocation]}>이전 위치 | {date}</Text>
                        <Text style={[isTablet ? FontStyle.title2.semibold2 : FontStyle.body1.bold, { color: CommonColor.basic_gray_dark }]}>{location}</Text>
                    </View>
                </View>
                {showRemoveView ? <Remove /> : <UnCheck />}
            </TouchableOpacity>
        )
    }

    return (
        <View style={CommonStyle.flex}>
            <View style={[CommonStyle.padding, styles.header]}>
                <Text style={isTablet ? FontStyle.title1.bold : FontStyle.title2.semibold2}>위치 설정</Text>
                <TouchableOpacity onPress={() => setShowRemoveView(!showRemoveView)}>
                    <Text style={[isTablet ? FontStyle.body1.regular : FontStyle.body2.regular, { color: CommonColor.main_blue }]}>{showRemoveView ? "취소" : "편집"}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={[CommonStyle.flex]}>
                    {!showRemoveView && (
                        <TouchableOpacity style={CommonStyle.padding} onPress={() => navigationRef.current?.navigate("LocationGuideNavigator", { screen: "LocationGuideScreen" })}>
                            <SearchInput hasInput={false} autoFocus={false} />
                        </TouchableOpacity>
                    )}
                    <View style={[CommonStyle.padding, styles.addressContainer, !showRemoveView && { marginTop: isTablet ? 30 : 32 }]}>
                        {myAddressList?.map((item, index) => {
                            const { id, location } = item
                            const isSelected = id === myAddressList[0].id
                            return <View key={index}>{isSelected ? <SelectedView location={location} /> : <PrevView item={item} />}</View>
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        paddingVertical: isTablet ? 24 : 18
    },
    addressContainer: {
        gap: 16
    },
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
    prevContainer: {
        backgroundColor: CommonColor.basic_gray_light
    },
    selectedContainer: {
        borderWidth: 2,
        borderColor: CommonColor.main_blue
    },
    locationContainer: {
        width: "100%",
        borderRadius: 6,
        paddingHorizontal: isTablet ? 24 : 18,
        paddingVertical: isTablet ? 16 : 13,
        justifyContent: "space-between"
    },
    header: {
        width: "100%",
        paddingVertical: isTablet ? 14 : 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: CommonColor.basic_gray_light
    }
})
