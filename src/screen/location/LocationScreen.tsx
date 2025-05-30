import Check from "asset/icon/icon_check_circle.svg"
import LocationOff from "asset/icon/icon_location_off.svg"
import LocationOn from "asset/icon/icon_location_on.svg"
import Remove from "asset/icon/icon_remove_circle.svg"
import UnCheck from "asset/icon/icon_uncheck_circle.svg"
import { AppBar } from "component/CommonComponent"
import { SearchInput } from "component/SearchInput"
import { useUserLocationHook } from "hook/useUserLocationHook"
import { navigationRef } from "navigation/RootNavigation"
import React, { useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useRecoilValue } from "recoil"
import { isTablet, myAddressListState } from "store"
import { CommonColor, CommonStyle, FontStyle } from "style/CommonStyle"
import { MY_ADDRSS } from "type"
import { NowDate } from "utils"

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
            <AppBar text='위치 설정' hasBack={false} custom={{ text: showRemoveView ? "취소" : "편집", onPress: () => setShowRemoveView(!showRemoveView) }} />
            <ScrollView contentContainerStyle={styles.scrollView}>
                {!showRemoveView && (
                    <TouchableOpacity style={CommonStyle.padding} onPress={() => navigationRef.current?.navigate("LocationGuideNavigator", { screen: "LocationGuideScreen" })}>
                        <SearchInput hasInput={false} autoFocus={false} error={null} />
                    </TouchableOpacity>
                )}
                <View style={[CommonStyle.padding, styles.addressContainer, !showRemoveView && { marginTop: isTablet ? 30 : 32 }]}>
                    {myAddressList?.map((item, index) => {
                        const { id, location } = item
                        const isSelected = id === myAddressList[0].id
                        return <View key={index}>{isSelected ? <SelectedView location={location} /> : <PrevView item={item} />}</View>
                    })}
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
    }
})
