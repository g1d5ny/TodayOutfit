import { fetchCurrentWeatherQuery } from "hook/useCurrentWeatherHook"
import { useDailyWeatherHook } from "hook/useDailyWeatherHook"
import { StyleSheet, Text, View } from "react-native"
import { useRecoilValue } from "recoil"
import Location from "../../asset/icon/icon_location_on.svg"
import MaxTemp from "../../asset/icon/icon_max_temp.svg"
import MinTemp from "../../asset/icon/icon_min_temp.svg"
import { isTablet, myAddressListState } from "../../store"
import { CommonColor, CommonStyle, FontStyle } from "../../style/CommonStyle"

export default () => {
    const myAddressList = useRecoilValue(myAddressListState)

    const { data: current } = fetchCurrentWeatherQuery()
    const { data: weekly } = useDailyWeatherHook()
    const todayWeather = weekly?.weeklyWeather[0]

    return (
        <View style={styles.container}>
            <View style={styles.weatherDesc}>
                <View style={{ maxWidth: "70%" }}>
                    <Text style={[isTablet ? FontStyle.body1.bold : FontStyle.label1.bold, { color: current?.is_day ? CommonColor.basic_gray_dark : CommonColor.main_white }]}>오늘은</Text>
                    <Text style={[styles.desc, isTablet ? FontStyle.display.forecast_tablet : FontStyle.title1.bold, { color: current?.is_day ? CommonColor.main_black : CommonColor.main_white }]}>{current?.desc}</Text>
                </View>
                <Text style={[isTablet ? FontStyle.display.temperature_tablet : FontStyle.display.temperature_mobile, { color: current?.is_day ? CommonColor.main_black : CommonColor.main_white }]}>{current?.temp}˚</Text>
            </View>
            <View style={styles.weatherDesc}>
                <View style={styles.addrView}>
                    <Location width={isTablet ? 18 : 12} height={isTablet ? 18 : 12} />
                    <Text style={[isTablet ? FontStyle.body1.regular : FontStyle.label1.regular, { marginLeft: 4, color: current?.is_day ? CommonColor.basic_gray_dark : CommonColor.main_white }]}>{myAddressList && myAddressList[0].location}</Text>
                </View>
                <View style={styles.tempView}>
                    <View style={[CommonStyle.row, styles.tempGap]}>
                        <MinTemp width={isTablet ? 14 : 12} height={isTablet ? 14 : 12} />
                        <Text style={[isTablet ? FontStyle.body2.regular : FontStyle.label1.regular, { color: CommonColor.label_text_blue }]}>{todayWeather?.minTemp}˚</Text>
                    </View>
                    <Text style={[isTablet ? FontStyle.body2.regular : FontStyle.label1.regular, { color: CommonColor.main_white }]}>|</Text>
                    <View style={[CommonStyle.row, styles.tempGap]}>
                        <MaxTemp width={isTablet ? 14 : 12} height={isTablet ? 14 : 12} />
                        <Text style={[isTablet ? FontStyle.body2.regular : FontStyle.label1.regular, { color: CommonColor.label_text_red }]}>{todayWeather?.maxTemp}˚</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tempGap: {
        gap: 8
    },
    tempView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    addrView: {
        flexDirection: "row",
        alignItems: "center"
    },
    weatherDesc: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    desc: {
        marginTop: isTablet ? 4 : 0
    },
    container: {
        gap: isTablet ? 16 : 8
    }
})
