import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CommonColor, MobileFont, TabletFont } from "../style/CommonStyle"
import LocationMobile from "../asset/icon/icon_location_mobile.svg"
import LocationTablet from "../asset/icon/icon_location_tablet.svg"
import CalendarMobile from "../asset/icon/icon_calendar_mobile.svg"
import CalendarTablet from "../asset/icon/icon_calendar_tablet.svg"
import { isTablet, myAddressListState } from "../store"
import { useRecoilValue } from "recoil"
import { SvgProps } from "react-native-svg"
import { FC, ReactNode } from "react"

export const LocationView = () => {
    const myAddressList = useRecoilValue(myAddressListState)

    return (
        <View style={styles.container}>
            {isTablet ? <LocationTablet /> : <LocationMobile />}
            {myAddressList && (
                <Text style={[isTablet ? TabletFont.label1_regular : MobileFont.label2_regular, { color: CommonColor.basic_gray_dark, marginLeft: 2 }]}>
                    {myAddressList[0].location.split(" ")[0] + " " + myAddressList[0].location.split(" ")[1]}
                </Text>
            )}
        </View>
    )
}

export const DateView = ({ month, date }: { month?: number; date?: number }) => {
    return (
        <View style={styles.container}>
            {isTablet ? <CalendarTablet /> : <CalendarMobile />}
            <Text style={[isTablet ? TabletFont.label1_bold : MobileFont.label1_bold, { color: CommonColor.main_black }]}>{month && date ? `${month}월 ${date}일` : ""}</Text>
        </View>
    )
}

interface WeatherIcon {
    titleIcon?: ReactNode
    title?: string
    content?: string
    desc?: string
    contentIcon?: ReactNode

    windSpeed?: number
    onPress?: () => void
}
export const WeatherDetail = ({ titleIcon, title, content, desc, contentIcon, windSpeed, onPress }: WeatherIcon): React.ReactElement => {
    return (
        <TouchableOpacity style={styles.weatherDetail} onPress={onPress}>
            <View style={styles.row}>
                {titleIcon}
                <Text style={[isTablet ? TabletFont.label1_bold : MobileFont.label1_bold, { marginLeft: 6 }]}>{title}</Text>
            </View>
            <Text style={[isTablet ? TabletFont.label1_regular : MobileFont.label1_regular]}>{content}</Text>
            <View>
                <Text style={MobileFont.title1_regular}>{desc}</Text>
                {windSpeed && <Text style={[isTablet ? TabletFont.label2_regular : MobileFont.label2_regular, { color: CommonColor.basic_gray_dark, marginTop: 2 }]}>{windSpeed} m/s</Text>}
                <View style={styles.detailIcon}>{contentIcon}</View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    detailIcon: {
        width: 63,
        height: 63,
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
        paddingVertical: 14,
        gap: 8
    },
    container: {
        gap: 2,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: CommonColor.basic_gray_light,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})
