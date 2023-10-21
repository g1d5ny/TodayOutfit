import { StyleSheet, Text, View } from "react-native"
import { CommonColor, MobileFont, TabletFont } from "../style/CommonStyle"
import Location from "../asset/icon/icon_location_on.svg"
import Calendar from "../asset/icon/icon_calendar.svg"
import { isTablet, myAddressListState } from "../store"
import { useRecoilValue } from "recoil"

export const LocationView = () => {
    const myAddressList = useRecoilValue(myAddressListState)

    return (
        <View style={styles.container}>
            {/* <Location /> */}
            <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_3, { color: CommonColor.basic_gray_dark }]}>{myAddressList[0].location.split(" ")[0] + " " + myAddressList[0].location.split(" ")[1]}</Text>
        </View>
    )
}

export const DateView = () => {
    const currentMonth = new Date().getMonth() + 1
    const currentDate = new Date().getDate()

    return (
        <View style={[styles.container, { marginLeft: 10 }]}>
            <Calendar />
            <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_3, { color: CommonColor.basic_gray_dark }]}>
                {currentMonth}월 {currentDate}일
            </Text>
        </View>
    )
}

interface WeatherIcon {
    titleIcon: JSX.Element
    title: string
    content: string
    desc: string
    contentIcon: JSX.Element
}
export const WeatherDetail = ({ titleIcon, title, content, desc, contentIcon }: WeatherIcon) => {
    return (
        <View style={styles.weatherDetail}>
            <View style={styles.row}>
                {titleIcon}
                <Text style={[isTablet ? TabletFont.detail_1 : MobileFont.detail_1]}>{title}</Text>
                <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_2, { marginVertical: 14 }]}>{content}</Text>
                <Text style={{ fontSize: 20 }}>{desc}</Text>
                <View style={styles.detailIcon}>{contentIcon}</View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detailIcon: {
        width: 64,
        height: 64,
        alignItems: "center",
        justifyContent: "center"
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    weatherDetail: {
        width: 170,
        height: 180,
        borderRadius: 10,
        backgroundColor: CommonColor.basic_gray_light,
        paddingHorizontal: 12,
        paddingVertical: 14
    },
    container: {
        paddingHorizontal: 8,
        paddintVertical: 6,
        borderRadius: 4,
        backgroundColor: CommonColor.basic_gray_light,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})
