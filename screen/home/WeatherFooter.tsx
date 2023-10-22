import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { currentWeatherInfoState, hourWeatherInfoState, isTablet } from "../../store"
import { CommonColor, MobileFont, TabletFont } from "../../style/CommonStyle"
import { DateView, LocationView, WeatherDetail } from "../../component/MiniCard"
import { useRecoilValue } from "recoil"
import UV from "../../asset/icon/icon_uv_index.svg"
import FeelsLike from "../../asset/icon/icon_feels_like.svg"
import WindSpeed from "../../asset/icon/icon_wind_speed.svg"
import RainPercentage from "../../asset/icon/icon_rain_percentage.svg"
import { useState } from "react"

export default () => {
    const hourWeather = useRecoilValue(hourWeatherInfoState)
    const currentWeather = useRecoilValue(currentWeatherInfoState)
    // TODO 시간 선택해서 상세정보 뜰 수 있도록 해야함 - 1023
    const [selectedHour, setSelectedHour] = useState<number>(-1)

    return (
        <View style={[styles.wrapper]}>
            <View style={styles.title}>
                <Text style={[isTablet ? TabletFont.heading : MobileFont.heading]}>일기 예보 상세</Text>
                <View style={styles.row}>
                    <LocationView />
                    <DateView />
                </View>
            </View>
            <View style={{ marginTop: isTablet ? 40 : 32 }}>
                <Text style={[isTablet ? TabletFont.button_1 : MobileFont.body_1]}>시간별 일기 예보</Text>
                <ScrollView style={styles.scrollView} horizontal={true}>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.hourView, { backgroundColor: CommonColor.basic_gray_light }]}>
                            <Text style={[isTablet ? TabletFont.detail_1 : MobileFont.detail_1, styles.currentText]}>지금</Text>
                            <View style={{ marginVertical: 9 }}>{currentWeather.minIcon}</View>
                            <Text style={[isTablet ? TabletFont.detail_1 : MobileFont.detail_1, styles.currentText]}>{currentWeather.temp}˚</Text>
                        </TouchableOpacity>
                        {hourWeather.map(({ hour, temp, minIcon, uv, feelslike, windSpeed, precip_mm, windDir, humidity }, index: number) => {
                            return (
                                <TouchableOpacity key={index} style={[styles.hourView, { marginLeft: 12 }]} onPress={() => {}}>
                                    <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_2, styles.hourText]}>{hour}시</Text>
                                    <View style={{ marginVertical: 9 }}>{minIcon}</View>
                                    <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_2, styles.hourText]}>{temp}˚</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            <View style={{ marginTop: 40 }}>
                <Text style={[isTablet ? TabletFont.button_1 : MobileFont.body_1]}>상세 기상 정보</Text>
                <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_3, { color: CommonColor.basic_gray_dark, marginTop: 9 }]}>선택된 시간에 따른 상세 기상 정보입니다.</Text>
                {/* <WeatherDetail titleIcon={UV} title={"UV 지수"} content={"자외선 차단제를 정기적으로 발라야합니다."} desc={"매우 높음"} contentIcon={} /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    hourText: {
        color: CommonColor.basic_gray_dark
    },
    currentText: {
        color: CommonColor.main_blue
    },
    hourView: {
        width: 46,
        height: 114,
        borderRadius: 8,
        paddingVertical: 9,
        paddingHorizontal: 3,
        alignItems: "center"
    },
    scrollView: {
        width: "100%",
        marginTop: 26
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    wrapper: {
        width: "100%",
        backgroundColor: "#fff",
        paddingHorizontal: isTablet ? 32 : 16,
        marginTop: 50,
        paddingVertical: 15
    }
})
