import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CommonColor, MobileFont, TabletFont } from "../style/CommonStyle"
import LocationMobile from "../asset/icon/icon_location_mobile.svg"
import LocationTablet from "../asset/icon/icon_location_tablet.svg"
import CalendarMobile from "../asset/icon/icon_calendar_mobile.svg"
import CalendarTablet from "../asset/icon/icon_calendar_tablet.svg"
import { isTablet, myAddressListState } from "../store"
import { useRecoilValue } from "recoil"

export const LocationView = () => {
    const myAddressList = useRecoilValue(myAddressListState)

    return (
        <View style={styles.container}>
            {isTablet ? <LocationTablet /> : <LocationMobile />}
            {myAddressList && (
                <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_3, { color: CommonColor.basic_gray_dark, marginLeft: 2 }]}>{myAddressList[0].location.split(" ")[0] + " " + myAddressList[0].location.split(" ")[1]}</Text>
            )}
        </View>
    )
}

export const DateView = () => {
    const currentMonth = new Date().getMonth() + 1
    const currentDate = new Date().getDate()

    return (
        <View style={[styles.container, { marginLeft: 10 }]}>
            {isTablet ? <CalendarTablet /> : <CalendarMobile />}
            <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_3, { color: CommonColor.basic_gray_dark, marginLeft: 2 }]}>
                {currentMonth}월 {currentDate}일
            </Text>
        </View>
    )
}

interface WeatherIcon {
    titleIcon?: any
    title?: string
    content?: string
    desc?: string
    contentIcon?: any
    isVisible?: boolean
    onPress?: () => void
}
export const WeatherDetail = ({ titleIcon, title, content, desc, contentIcon, isVisible = true, onPress }: WeatherIcon): React.ReactElement => {
    if (!isVisible) {
        return <View style={[styles.weatherDetail, { backgroundColor: "transparent" }]} />
    }
    return (
        <TouchableOpacity style={styles.weatherDetail} onPress={onPress}>
            <View style={styles.row}>
                {titleIcon}
                <Text style={[isTablet ? TabletFont.detail_1 : MobileFont.detail_1, { marginLeft: 7 }]}>{title}</Text>
            </View>
            <Text style={[MobileFont.detail_2, { marginVertical: 14 }]}>{content}</Text>
            <Text style={{ fontSize: 20 }}>{desc}</Text>
            <View style={styles.detailIcon}>{contentIcon}</View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    detailIcon: {
        width: 64,
        height: 64,
        alignSelf: "flex-end"
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    weatherDetail: {
        width: 172,
        borderRadius: 10,
        backgroundColor: CommonColor.basic_gray_light,
        paddingHorizontal: 12,
        paddingTop: 14,
        paddingBottom: 16,
        marginBottom: isTablet ? 24 : 16
    },
    container: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: CommonColor.basic_gray_light,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})
