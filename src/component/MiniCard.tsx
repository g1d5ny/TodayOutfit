import { StyleSheet, Text, TextStyle, TouchableOpacity, View } from "react-native"
import { CommonColor, FontStyle } from "../style/CommonStyle"
import LocationMobile from "../asset/icon/icon_location_mobile.svg"
import LocationTablet from "../asset/icon/icon_location_tablet.svg"
import CalendarMobile from "../asset/icon/icon_calendar_mobile.svg"
import CalendarTablet from "../asset/icon/icon_calendar_tablet.svg"
import { isTablet, myAddressListState } from "../store"
import { useRecoilValue } from "recoil"
import { WEATHER_ICON } from "type"

export const LocationView = () => {
    const myAddressList = useRecoilValue(myAddressListState)

    return (
        <View style={styles.container}>
            {isTablet ? <LocationTablet /> : <LocationMobile />}
            {myAddressList && (
                <Text style={[isTablet ? FontStyle.label1.regular : FontStyle.label2.regular, { color: CommonColor.basic_gray_dark, marginLeft: 2 }]}>
                    {myAddressList[0].location.split(" ")[0] + " " + myAddressList[0].location.split(" ")[1]}
                </Text>
            )}
        </View>
    )
}

export const DateView = ({ month, date, fontStyle }: { month?: number; date?: number; fontStyle: TextStyle[] }) => {
    return (
        <View style={styles.container}>
            {isTablet ? <CalendarTablet /> : <CalendarMobile />}
            <Text style={fontStyle}>{month && date ? `${month}월 ${date}일` : ""}</Text>
        </View>
    )
}

export const WeatherDetail = ({ titleIcon, title, content, desc, contentIcon, windSpeed, onPress, style }: WEATHER_ICON): React.ReactElement => {
    return (
        <TouchableOpacity style={[styles.weatherDetail, style]} onPress={onPress}>
            <View style={styles.gap}>
                <View style={styles.row}>
                    {titleIcon}
                    <Text style={FontStyle.label1.bold}>{title}</Text>
                </View>
                <Text style={FontStyle.label1.regular}>{content}</Text>
                <Text style={FontStyle.title1.regular}>{desc}</Text>
                {windSpeed && <Text style={[FontStyle.label2.regular, { color: CommonColor.basic_gray_dark, marginTop: 2 }]}>{windSpeed} m/s</Text>}
            </View>
            <View style={styles.contentIcon}>
                <View style={styles.detailIcon}>{contentIcon}</View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    contentIcon: {
        marginTop: -8
    },
    gap: {
        gap: 8
    },
    detailIcon: {
        width: 63,
        height: 63,
        alignSelf: "flex-end"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    weatherDetail: {
        borderRadius: 10,
        backgroundColor: CommonColor.basic_gray_light,
        paddingHorizontal: 12,
        paddingVertical: 14
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
