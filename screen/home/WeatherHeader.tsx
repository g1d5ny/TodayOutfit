import { StyleSheet, Text, View } from "react-native"
import { currentWeatherInfoState, isTablet, myAddressListState } from "../../store"
import { useRecoilValue } from "recoil"
import { CommonColor, MobileFont, TabletFont, TextShadowStyle } from "../../style/CommonStyle"
import Location from "../../asset/icon/icon_line_location.svg"
import MinTemp from "../../asset/icon/icon_min_temp.svg"
import MaxTemp from "../../asset/icon/icon_max_temp.svg"

export default () => {
    const myAddressList = useRecoilValue(myAddressListState)
    const currentWeather = useRecoilValue(currentWeatherInfoState)

    return (
        <View>
            <View style={styles.weatherDesc}>
                <View style={{ maxWidth: "65%" }}>
                    <Text style={[isTablet ? TabletFont.detail_1 : MobileFont.detail_1, TextShadowStyle, { color: CommonColor.main_white }]}>오늘은</Text>
                    <Text style={[isTablet ? TabletFont.temperature : MobileFont.bold_on_boarding, TextShadowStyle, { color: CommonColor.main_white }]}>{currentWeather.description}</Text>
                </View>
                <Text style={[isTablet ? TabletFont.temperature_2 : MobileFont.temperature_2, TextShadowStyle, { color: CommonColor.main_white }]}>{currentWeather.currentTemp}˚</Text>
            </View>
            <View style={[styles.weatherDesc, { marginTop: 0 }]}>
                <View style={styles.addrView}>
                    <Location width={isTablet ? 18 : 12} height={isTablet ? 18 : 12} />
                    <Text style={[isTablet ? TabletFont.body_2 : MobileFont.detail_2, { marginLeft: isTablet ? 4 : 6, color: CommonColor.main_white }]}>{myAddressList && myAddressList[0].location}</Text>
                </View>
                <View style={styles.tempView}>
                    <MinTemp width={isTablet ? 14 : 12} height={isTablet ? 14 : 12} />
                    <Text style={[isTablet ? TabletFont.body_2 : MobileFont.detail_2, { color: CommonColor.main_white, marginLeft: 8 }]}>{currentWeather.min}˚</Text>
                    <Text style={[isTablet ? TabletFont.body_2 : MobileFont.detail_2, { color: CommonColor.main_white, marginHorizontal: 8 }]}>|</Text>
                    <MaxTemp width={isTablet ? 14 : 12} height={isTablet ? 14 : 12} />
                    <Text style={[isTablet ? TabletFont.body_2 : MobileFont.detail_2, { color: CommonColor.main_white, marginLeft: 8 }]}>{currentWeather.max}˚</Text>
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
