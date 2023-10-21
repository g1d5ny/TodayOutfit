import { StyleSheet, Text, View } from "react-native"
import { CommonColor, TabletFont } from "../style/CommonStyle"
import LinearGradient from "react-native-linear-gradient"
import MinTemp from "../asset/icon/icon_min_temp.svg"
import MaxTemp from "../asset/icon/icon_max_temp.svg"
import Sunrise from "../asset/icon/icon_sunrise.svg"
import Sunset from "../asset/icon/icon_sunset.svg"

interface WeatherProps {
    day: string
    date: number
    minIcon: JSX.Element
    text: string
    maxIcon: JSX.Element
    maxTemp: number
    minTemp: number
    sunrise: string
    sunset: string
    backgroundColor: string
}

export default ({ day, date, minIcon, text, maxIcon, maxTemp, minTemp, sunrise, sunset, backgroundColor }: WeatherProps) => {
    return (
        <View style={styles.weatherContainer}>
            <Text style={[TabletFont.header, { color: CommonColor.main_white }]}>오늘의 날씨</Text>
            <View style={styles.weatherCard}>
                <View style={styles.cardHeader}>
                    <View style={styles.row}>
                        <Text style={TabletFont.body_1}>{day}</Text>
                        <Text style={[TabletFont.body_2, { marginLeft: 6 }]}>{date}</Text>
                    </View>
                    <View style={[styles.row, { marginLeft: 20 }]}>
                        {minIcon}
                        <Text style={{ marginLeft: 4 }}>{text}</Text>
                    </View>
                </View>
                <LinearGradient colors={[backgroundColor, "#fff"]} style={styles.gradient}>
                    <View style={styles.maxIcon}>{maxIcon}</View>
                    <View style={styles.cardDesc}>
                        <View style={[styles.row, { justifyContent: "space-between" }]}>
                            <View style={styles.temp}>
                                <View style={[styles.row, { marginBottom: 8 }]}>
                                    <MaxTemp width={10} height={10} />
                                    <Text style={[TabletFont.detail_3, { marginLeft: 4 }]}>최고온도</Text>
                                </View>
                                <Text style={[TabletFont.temperature, { color: CommonColor.etc_red }]}>{maxTemp}˚</Text>
                            </View>
                            <View style={[styles.temp, { marginLeft: 8 }]}>
                                <View style={[styles.row, { marginBottom: 8 }]}>
                                    <MinTemp width={10} height={10} />
                                    <Text style={[TabletFont.detail_3, { marginLeft: 4 }]}>최저온도</Text>
                                </View>
                                <Text style={[TabletFont.temperature, { color: CommonColor.main_blue }]}>{minTemp}˚</Text>
                            </View>
                        </View>
                        <View style={[styles.row, styles.temp, { marginTop: 23, justifyContent: "space-between" }]}>
                            <View style={styles.row}>
                                <Sunrise />
                                <Text style={[TabletFont.detail_2, { color: CommonColor.basic_gray_dark, marginLeft: 8 }]}>일출</Text>
                            </View>
                            <Text style={[TabletFont.detail_2, { color: CommonColor.main_black }]}>{sunrise}</Text>
                        </View>
                        <View style={[styles.row, styles.temp, { justifyContent: "space-between", marginTop: 15 }]}>
                            <View style={styles.row}>
                                <Sunset />
                                <Text style={[TabletFont.detail_2, { color: CommonColor.basic_gray_dark, marginLeft: 8 }]}>일몰</Text>
                            </View>
                            <Text style={[TabletFont.detail_2, { color: CommonColor.main_black }]}>{sunset}</Text>
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
    maxIcon: {
        width: 150,
        height: "100%"
    },
    cardDesc: {
        flex: 1,
        marginLeft: 14
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
