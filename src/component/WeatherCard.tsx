import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaxTemp from "../asset/icon/icon_max_temp.svg"
import MinTemp from "../asset/icon/icon_min_temp.svg"
import Sunrise from "../asset/icon/icon_sunrise.svg"
import Sunset from "../asset/icon/icon_sunset.svg"
import { isTablet } from "../store"
import { CommonColor, CommonStyle, FontStyle } from "../style/CommonStyle"

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
    onPress?: () => void
}

export const WeatherCard = ({ day, date, minIcon, text, maxIcon, maxTemp, minTemp, sunrise, sunset, backgroundColor, onPress }: WeatherProps) => {
    const color = day === "토" ? CommonColor.main_blue : day === "일" ? CommonColor.etc_red : CommonColor.main_black

    return (
        <View style={styles.weatherCard}>
            <TouchableOpacity disabled={!onPress} style={styles.cardHeader} onPress={onPress}>
                <View style={CommonStyle.row}>
                    <Text style={[FontStyle.body2.bold, { color }]}>{day}</Text>
                    <Text style={[FontStyle.body2.regular, { marginLeft: 6 }]}>{date}</Text>
                </View>
                <View style={[CommonStyle.row, { marginLeft: 20 }]}>
                    {minIcon}
                    <Text style={[FontStyle.body2.regular, { marginLeft: 8 }]}>{text}</Text>
                </View>
            </TouchableOpacity>
            <LinearGradient colors={[backgroundColor, "#fff"]} style={styles.gradient}>
                <View style={styles.maxIcon}>{maxIcon}</View>
                <View style={[styles.cardDesc, CommonStyle.row, isTablet && { gap: 34 }]}>
                    <View style={[styles.flex, styles.gap, { marginLeft: 34 }]}>
                        <View style={[CommonStyle.row, CommonStyle.spread]}>
                            <View style={[CommonStyle.center, styles.flex]}>
                                <View style={[CommonStyle.row, { marginBottom: 8 }]}>
                                    <MaxTemp width={10} height={10} />
                                    <Text style={[FontStyle.label2.regular, { marginLeft: 4 }]}>최고온도</Text>
                                </View>
                                <Text style={[FontStyle.display.forecast_tablet, { color: CommonColor.etc_red }]}>{maxTemp}˚</Text>
                            </View>
                            <View style={[CommonStyle.center, styles.flex]}>
                                <View style={[CommonStyle.row, { marginBottom: 8 }]}>
                                    <MinTemp width={10} height={10} />
                                    <Text style={[FontStyle.label2.regular, { marginLeft: 4 }]}>최저온도</Text>
                                </View>
                                <Text style={[FontStyle.display.forecast_tablet, { color: CommonColor.main_blue }]}>{minTemp}˚</Text>
                            </View>
                        </View>
                        <View style={[CommonStyle.row, CommonStyle.spread]}>
                            <View style={CommonStyle.row}>
                                <Sunrise />
                                <Text style={[FontStyle.label1.regular, { color: CommonColor.basic_gray_dark, marginLeft: 8 }]}>일출</Text>
                            </View>
                            <Text style={[FontStyle.label1.regular, { color: CommonColor.main_black }]}>{sunrise}</Text>
                        </View>
                        <View style={[CommonStyle.row, CommonStyle.spread]}>
                            <View style={CommonStyle.row}>
                                <Sunset />
                                <Text style={[FontStyle.label1.regular, { color: CommonColor.basic_gray_dark, marginLeft: 8 }]}>일몰</Text>
                            </View>
                            <Text style={[FontStyle.label1.regular, { color: CommonColor.main_black }]}>{sunset}</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    gap: {
        gap: 17
    },
    flex: {
        flex: 1
    },
    maxIcon: {
        width: isTablet ? 160 : 138,
        height: 160
    },
    cardDesc: {
        flex: 1,
        justifyContent: "space-between"
    },
    gradient: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 22,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        alignItems: "center",
        flexDirection: "row"
    },
    cardHeader: {
        paddingHorizontal: 20,
        paddingVertical: 11,
        flexDirection: "row",
        alignItmes: "center"
    },
    weatherCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: CommonColor.basic_gray_light
    }
})
