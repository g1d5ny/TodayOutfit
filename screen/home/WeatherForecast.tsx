import { StyleSheet, Text, View } from "react-native"
import { currentWeatherInfoState } from "../../store"
import { CommonColor, TabletFont } from "../../style/CommonStyle"
import { useRecoilValue } from "recoil"
import { getDay } from "../../function"
import LinearGradient from "react-native-linear-gradient"
import MinTemp from "../../asset/icon/icon_min_temp.svg"
import MaxTemp from "../../asset/icon/icon_max_temp.svg"
import Sunrise from "../../asset/icon/icon_sunrise.svg"
import Sunset from "../../asset/icon/icon_sunset.svg"

export default () => {
    const currentWeather = useRecoilValue(currentWeatherInfoState)

    return (
        <View style={styles.weatherContainer}>
            <Text style={[TabletFont.header, { color: CommonColor.main_white }]}>오늘 날씨 예보</Text>
            <View style={styles.weatherCard}>
                <View style={styles.cardHeader}>
                    <View style={styles.row}>
                        <Text style={TabletFont.body_1}>{getDay()}</Text>
                        <Text style={[TabletFont.body_2, { marginLeft: 6 }]}>{new Date().getDate()}</Text>
                    </View>
                    <View style={[styles.row, { marginLeft: 20 }]}>
                        {currentWeather.minIcon}
                        <Text style={{ marginLeft: 4 }}>{currentWeather.summary}</Text>
                    </View>
                </View>
                <LinearGradient colors={[currentWeather.backgroundColor, "#fff"]} style={styles.gradient}>
                    <View style={styles.cardDesc}>{currentWeather.maxIcon}</View>
                    <View style={[styles.cardDesc, { marginLeft: 30 }]}>
                        <View style={styles.cardDesc}>
                            <View style={[styles.row, { justifyContent: "space-between" }]}>
                                <View style={styles.temp}>
                                    <View style={[styles.row, { marginBottom: 8 }]}>
                                        <MaxTemp width={10} height={10} />
                                        <Text style={[TabletFont.detail_3, { marginLeft: 4 }]}>최고온도</Text>
                                    </View>
                                    <Text style={[TabletFont.temperature, { color: CommonColor.etc_red }]}>{currentWeather.max}˚</Text>
                                </View>
                                <View style={[styles.temp, { marginLeft: 8 }]}>
                                    <View style={[styles.row, { marginBottom: 8 }]}>
                                        <MinTemp width={10} height={10} />
                                        <Text style={[TabletFont.detail_3, { marginLeft: 4 }]}>최저온도</Text>
                                    </View>
                                    <Text style={[TabletFont.temperature, { color: CommonColor.main_blue }]}>{currentWeather.min}˚</Text>
                                </View>
                            </View>
                            <View style={[styles.row, styles.temp, { marginTop: 23, justifyContent: "space-between" }]}>
                                <View style={styles.row}>
                                    <Sunrise />
                                    <Text style={[TabletFont.detail_2, { color: CommonColor.basic_gray_dark, marginLeft: 8 }]}>일출</Text>
                                </View>
                                <Text style={[TabletFont.detail_2, { color: CommonColor.main_black }]}>{currentWeather.sunrise}</Text>
                            </View>
                            <View style={[styles.row, styles.temp, { justifyContent: "space-between", marginTop: 15 }]}>
                                <View style={styles.row}>
                                    <Sunset />
                                    <Text style={[TabletFont.detail_2, { color: CommonColor.basic_gray_dark, marginLeft: 8 }]}>일몰</Text>
                                </View>
                                <Text style={[TabletFont.detail_2, { color: CommonColor.main_black }]}>{currentWeather.sunset}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    temp: {
        paddingHorizontal: 8,
        alignItems: "center"
    },
    cardDesc: {
        flex: 1
    },
    gradient: {
        flex: 1,
        padding: 14,
        justifyContent: "space-between",
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row"
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    cardHeader: {
        height: 56,
        paddingHorizontal: 20,
        paddingVertical: 11,
        flexDirection: "row",
        alignItmes: "center"
    },
    weatherCard: {
        width: "100%",
        height: 250,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginTop: 8
    },
    weatherContainer: {
        marginTop: 26
    }
})
