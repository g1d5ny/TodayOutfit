import { StyleSheet, Text, View } from "react-native"
import { currentWeatherInfoState, isTablet, myAddressListState, weeklyWeatherInfoState } from "../../store"
import { useRecoilValue } from "recoil"
import { CommonColor, CommonStyle, FontStyle } from "../../style/CommonStyle"
import Location from "../../asset/icon/icon_location_on.svg"
import MinTemp from "../../asset/icon/icon_min_temp.svg"
import MaxTemp from "../../asset/icon/icon_max_temp.svg"

export default () => {
    const myAddressList = useRecoilValue(myAddressListState)
    const currentWeather = useRecoilValue(currentWeatherInfoState)
    const weeklyWeather = useRecoilValue(weeklyWeatherInfoState)
    const todayWeather = weeklyWeather[0]

    return (
        <View style={styles.container}>
            <View style={styles.weatherDesc}>
                <View style={{ maxWidth: "70%" }}>
                    <Text style={[isTablet ? FontStyle.body1.bold : FontStyle.label1.bold, { color: currentWeather.is_day ? CommonColor.basic_gray_dark : CommonColor.main_white }]}>
                        오늘은
                    </Text>
                    <Text
                        style={[
                            styles.desc,
                            isTablet ? FontStyle.display.forecast_tablet : FontStyle.title1.bold,
                            { color: currentWeather.is_day ? CommonColor.main_black : CommonColor.main_white }
                        ]}
                    >
                        {currentWeather.desc}
                    </Text>
                </View>
                <Text
                    style={[
                        isTablet ? FontStyle.display.temperature_tablet : FontStyle.display.temperature_mobile,
                        { color: currentWeather.is_day ? CommonColor.main_black : CommonColor.main_white }
                    ]}
                >
                    {currentWeather.temp}˚
                </Text>
            </View>
            <View style={styles.weatherDesc}>
                <View style={styles.addrView}>
                    <Location width={isTablet ? 18 : 12} height={isTablet ? 18 : 12} />
                    <Text
                        style={[
                            isTablet ? FontStyle.body1.regular : FontStyle.label1.regular,
                            { marginLeft: 4, color: currentWeather.is_day ? CommonColor.basic_gray_dark : CommonColor.main_white }
                        ]}
                    >
                        {myAddressList && myAddressList[0].location}
                    </Text>
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
