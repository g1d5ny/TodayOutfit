import { StyleSheet, Text, View } from "react-native"
import { currentWeatherInfoState, isTablet, myAddressListState, weeklyWeatherInfoState } from "../../store"
import { useRecoilValue } from "recoil"
import { CommonColor, MobileFont, TabletFont, TextShadowStyle } from "../../style/CommonStyle"
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
            <View style={[styles.weatherDesc]}>
                <View style={{ maxWidth: "65%" }}>
                    <Text style={[isTablet ? TabletFont.body_1 : MobileFont.label1_bold, { color: currentWeather.is_day ? CommonColor.basic_gray_dark : CommonColor.main_white }]}>
                        오늘은
                    </Text>
                    <Text
                        style={[
                            isTablet ? TabletFont.display_forecast : MobileFont.title1_bold,
                            TextShadowStyle,
                            { color: currentWeather.is_day ? CommonColor.main_black : CommonColor.main_white, marginBottom: 4 }
                        ]}
                    >
                        {currentWeather.desc}
                    </Text>
                </View>
                <Text
                    style={[
                        isTablet ? TabletFont.display_temperature : MobileFont.display_temperature,
                        TextShadowStyle,
                        { color: currentWeather.is_day ? CommonColor.basic_gray_dark : CommonColor.main_white }
                    ]}
                >
                    {currentWeather.temp}˚
                </Text>
            </View>
            <View style={[styles.weatherDesc, { marginTop: 0 }]}>
                <View style={styles.addrView}>
                    <Location width={isTablet ? 18 : 12} height={isTablet ? 18 : 12} />
                    <Text
                        style={[
                            isTablet ? TabletFont.body_2 : MobileFont.label1_regular,
                            { marginLeft: isTablet ? 4 : 6, color: currentWeather.is_day ? CommonColor.basic_gray_dark : CommonColor.main_white }
                        ]}
                    >
                        {myAddressList && myAddressList[0].location}
                    </Text>
                </View>
                <View style={styles.tempView}>
                    <MinTemp width={isTablet ? 14 : 12} height={isTablet ? 14 : 12} />
                    <Text style={[isTablet ? TabletFont.body_2 : MobileFont.label1_regular, { color: CommonColor.label_text_blue, marginLeft: 8 }]}>{todayWeather.minTemp}˚</Text>
                    <Text style={[isTablet ? TabletFont.body_2 : MobileFont.label1_regular, { color: CommonColor.main_white, marginHorizontal: 8 }]}>|</Text>
                    <MaxTemp width={isTablet ? 14 : 12} height={isTablet ? 14 : 12} />
                    <Text style={[isTablet ? TabletFont.body_2 : MobileFont.label1_regular, { color: CommonColor.label_text_red, marginLeft: 8 }]}>{todayWeather.maxTemp}˚</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tempView: {
        flexDirection: "row",
        alignItems: "center"
    },
    addrView: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center"
    },
    weatherDesc: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    }
})
