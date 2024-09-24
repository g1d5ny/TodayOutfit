import { StyleSheet, Text, View } from "react-native"
import { currentWeatherInfoState, isTablet, myAddressListState, weeklyWeatherInfoState } from "../../store"
import { useRecoilValue } from "recoil"
import { CommonColor, CommonStyle, MobileFont, TabletFont, TextShadowStyle } from "../../style/CommonStyle"
import Location from "../../asset/icon/icon_location_on.svg"
import MinTemp from "../../asset/icon/icon_min_temp.svg"
import MaxTemp from "../../asset/icon/icon_max_temp.svg"

export default () => {
    const myAddressList = useRecoilValue(myAddressListState)
    const currentWeather = useRecoilValue(currentWeatherInfoState)
    const weeklyWeather = useRecoilValue(weeklyWeatherInfoState)
    const todayWeather = weeklyWeather[0]

    return (
        <View>
            <View style={styles.weatherDesc}>
                <View style={{ maxWidth: "65%" }}>
                    <Text style={[isTablet ? TabletFont.body1_bold : MobileFont.label1_bold, { color: currentWeather.is_day ? CommonColor.basic_gray_dark : CommonColor.main_white }]}>
                        오늘은
                    </Text>
                    <Text
                        style={[
                            isTablet ? TabletFont.display_forecast : MobileFont.title1_bold,
                            { color: currentWeather.is_day ? CommonColor.main_black : CommonColor.main_white, marginBottom: 4 }
                        ]}
                    >
                        {currentWeather.desc}
                    </Text>
                </View>
                <Text
                    style={[isTablet ? TabletFont.display_temperature : MobileFont.display_temperature, { color: currentWeather.is_day ? CommonColor.main_black : CommonColor.main_white }]}
                >
                    {currentWeather.temp}˚
                </Text>
            </View>
            <View style={styles.weatherDesc}>
                <View style={styles.addrView}>
                    <Location width={isTablet ? 18 : 12} height={isTablet ? 18 : 12} />
                    <Text
                        style={[
                            isTablet ? TabletFont.body1_regular : MobileFont.label1_regular,
                            { marginLeft: 4, color: currentWeather.is_day ? CommonColor.basic_gray_dark : CommonColor.main_white }
                        ]}
                    >
                        {myAddressList && myAddressList[0].location}
                    </Text>
                </View>
                <View style={styles.tempView}>
                    <View style={[CommonStyle.row, styles.tempGap]}>
                        <MinTemp width={isTablet ? 14 : 12} height={isTablet ? 14 : 12} />
                        <Text style={[isTablet ? TabletFont.body2_regular : MobileFont.label1_regular, { color: CommonColor.label_text_blue }]}>{todayWeather.minTemp}˚</Text>
                    </View>
                    <Text style={[isTablet ? TabletFont.body2_regular : MobileFont.label1_regular, { color: CommonColor.main_white }]}>|</Text>
                    <View style={[CommonStyle.row, styles.tempGap]}>
                        <MaxTemp width={isTablet ? 14 : 12} height={isTablet ? 14 : 12} />
                        <Text style={[isTablet ? TabletFont.body2_regular : MobileFont.label1_regular, { color: CommonColor.label_text_red }]}>{todayWeather.maxTemp}˚</Text>
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
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center"
    },
    weatherDesc: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    }
})
