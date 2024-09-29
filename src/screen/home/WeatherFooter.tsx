import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { currentDate, currentMonth, currentWeatherInfoState, hourWeatherInfoState, isTablet } from "../../store"
import { CommonColor, CommonStyle, FontStyle } from "../../style/CommonStyle"
import { DateView, LocationView, WeatherDetail } from "../../component/MiniCard"
import { useRecoilValue } from "recoil"
import UV from "../../asset/icon/icon_uv_index.svg"
import FeelsLike from "../../asset/icon/icon_feels_like.svg"
import WindSpeed from "../../asset/icon/icon_wind_speed.svg"
import WindDirection from "../../asset/icon/icon_wind_dir.svg"
import RainPercentage from "../../asset/icon/icon_rain_percentage.svg"
import Humidity from "../../asset/icon/icon_humidity.svg"
import SnowFall from "../../asset/icon/icon_snow_fall.svg"
import { LegacyRef, useCallback, useEffect, useState } from "react"
import { FeelsLikeFormat, HumidityFormat, RainPercentageFormat, SnowFallFormat, UVFormat, WindDirectionFormat, WindSpeedFormat } from "../../utils"
import { navigationRef } from "navigation/RootNavigation"
import { HOUR_WEATHER } from "type"

interface WeatherHourlyCard {
    hour?: string | number
    minIcon: JSX.Element
    temp?: string | number
    onPress: () => void
    isClicked: boolean
    index?: number
}
export const WeatherFooter = ({ viewRef }: { viewRef: LegacyRef<View> }) => {
    const hourWeather = useRecoilValue(hourWeatherInfoState)
    const currentWeather = useRecoilValue(currentWeatherInfoState)
    const [selectedHour, setSelectedHour] = useState<HOUR_WEATHER>()

    useEffect(() => {
        if (hourWeather[0]) {
            const { uv, minIcon, feelslike, windSpeed, willItRain, willItSnow, rainPercentage, snowPercentage, windDir, humidity } = hourWeather[0]
            setSelectedHour({
                hour: String(-1),
                uv,
                minIcon,
                feelslike,
                windSpeed,
                willItRain,
                willItSnow,
                rainPercentage,
                snowPercentage,
                windDir,
                humidity
            })
        }
    }, [hourWeather])

    const WeatherHourlyCard = useCallback(({ hour, minIcon, temp, onPress, isClicked, index }: WeatherHourlyCard) => {
        const getFont = () => {
            if (isClicked) {
                return [FontStyle.label1.bold, styles.currentText]
            }
            return [FontStyle.label1.regular, styles.hourText]
        }

        return (
            <TouchableOpacity key={index} style={[styles.hourView, isClicked && { backgroundColor: CommonColor.basic_gray_light }]} onPress={onPress}>
                <Text style={getFont()}>{hour === -1 ? "지금" : hour + "시"}</Text>
                <View style={{ marginVertical: 9 }}>{minIcon}</View>
                <Text style={getFont()}>{temp}˚</Text>
            </TouchableOpacity>
        )
    }, [])

    return (
        <View ref={viewRef} style={styles.wrapper}>
            <View style={[CommonStyle.padding, styles.title]}>
                <Text style={[isTablet ? FontStyle.title1.bold : FontStyle.title2.semibold2]}>날씨 정보</Text>
                <View style={CommonStyle.row}>
                    <View style={styles.date}>
                        <DateView
                            date={currentDate}
                            month={currentMonth}
                            fontStyle={[isTablet ? FontStyle.label1.regular : FontStyle.label2.regular, { color: CommonColor.basic_gray_dark }]}
                        />
                    </View>
                    <LocationView />
                </View>
            </View>
            {hourWeather && selectedHour && (
                <>
                    <View style={{ marginTop: isTablet ? 40 : 32 }}>
                        <Text style={[CommonStyle.padding, isTablet ? FontStyle.title2.semibold2 : FontStyle.body2.bold]}>시간별 일기 예보</Text>
                        <Text style={[CommonStyle.padding, isTablet ? FontStyle.label1.regular : FontStyle.label2.regular, styles.detail, { color: CommonColor.basic_gray_dark }]}>
                            시간을 선택시 상세 기상 정보를 확인할 수 있습니다.
                        </Text>
                        <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={CommonStyle.padding}>
                            <View style={CommonStyle.row}>
                                {WeatherHourlyCard({
                                    hour: -1,
                                    minIcon: currentWeather.minIcon,
                                    temp: currentWeather.temp,
                                    onPress: () => {
                                        const { uv, minIcon, feelslike, windSpeed, willItRain, willItSnow, rainPercentage, snowPercentage, windDir, humidity } = hourWeather[0]
                                        setSelectedHour({
                                            hour: String(-1),
                                            uv,
                                            minIcon,
                                            feelslike,
                                            windSpeed,
                                            willItRain,
                                            willItSnow,
                                            rainPercentage,
                                            snowPercentage,
                                            windDir,
                                            humidity
                                        })
                                    },
                                    isClicked: selectedHour.hour === String(-1),
                                    index: -1
                                })}
                                {hourWeather.map(
                                    ({ hour, temp, minIcon, uv, feelslike, windSpeed, rainPercentage, snowPercentage, willItSnow, willItRain, windDir, humidity }, index: number) => {
                                        const onPress = () => {
                                            setSelectedHour({ hour, uv, feelslike, minIcon, windSpeed, snowPercentage, rainPercentage, willItRain, willItSnow, windDir, humidity })
                                        }
                                        return WeatherHourlyCard({
                                            hour,
                                            minIcon,
                                            temp,
                                            onPress,
                                            isClicked: selectedHour.hour === hour,
                                            index
                                        })
                                    }
                                )}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={[CommonStyle.padding, styles.foreDetailRow]}>
                        <WeatherDetail
                            titleIcon={<UV />}
                            title={"UV 지수"}
                            content={UVFormat(selectedHour.uv)?.content as string}
                            desc={UVFormat(selectedHour.uv)?.text as string}
                            contentIcon={UVFormat(selectedHour.uv)?.icon}
                            onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 0 } })}
                        />
                        <WeatherDetail
                            titleIcon={<WindSpeed />}
                            title={"풍속"}
                            content={WindSpeedFormat(selectedHour.windSpeed)?.content as string}
                            desc={WindSpeedFormat(selectedHour.windSpeed)?.text as string}
                            contentIcon={WindSpeedFormat(selectedHour.windSpeed)?.icon}
                            windSpeed={selectedHour.windSpeed}
                            onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 2 } })}
                        />
                        {selectedHour.willItSnow ? (
                            <WeatherDetail
                                titleIcon={<SnowFall />}
                                title={"적설량"}
                                content={SnowFallFormat(selectedHour.snowPercentage as number)?.content as string}
                                desc={SnowFallFormat(selectedHour.snowPercentage as number)?.text as string}
                                contentIcon={SnowFallFormat(selectedHour.snowPercentage as number)?.icon}
                                onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 6 } })}
                            />
                        ) : (
                            <WeatherDetail
                                titleIcon={<RainPercentage />}
                                title={"강수 확률"}
                                content={RainPercentageFormat(selectedHour.rainPercentage as number)?.content as string}
                                desc={RainPercentageFormat(selectedHour.rainPercentage as number)?.text as string}
                                contentIcon={RainPercentageFormat(selectedHour.rainPercentage as number)?.icon}
                                onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 4 } })}
                            />
                        )}
                        <WeatherDetail
                            titleIcon={<FeelsLike />}
                            title={"체감 온도"}
                            content={FeelsLikeFormat(selectedHour.feelslike)?.content as string}
                            desc={FeelsLikeFormat(selectedHour.feelslike)?.text as string}
                            contentIcon={FeelsLikeFormat(selectedHour.feelslike)?.icon}
                            onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 1 } })}
                        />
                        <WeatherDetail
                            titleIcon={<WindDirection />}
                            title={"풍향"}
                            content={WindDirectionFormat(selectedHour.windDir)?.content as string}
                            desc={WindDirectionFormat(selectedHour.windDir)?.text as string}
                            contentIcon={WindDirectionFormat(selectedHour.windDir)?.icon}
                            onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 3 } })}
                        />
                        <WeatherDetail
                            titleIcon={<Humidity />}
                            title={"습도"}
                            content={HumidityFormat(selectedHour.humidity)?.content as string}
                            desc={HumidityFormat(selectedHour.humidity)?.text as string}
                            contentIcon={HumidityFormat(selectedHour.humidity)?.icon}
                            onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 5 } })}
                        />
                    </View>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    detail: {
        marginTop: 8
    },
    foreDetailRow: {
        marginVertical: 24,
        marginBottom: 32,
        flexDirection: "row",
        alignItems: "flex-start",
        // justifyContent: "space-between",
        flexWrap: "wrap",
        gap: isTablet ? 27 : 14,
        rowGap: isTablet ? 16 : 14,
        borderWidth: 2
    },
    hourText: {
        color: CommonColor.basic_gray_dark
    },
    currentText: {
        color: CommonColor.main_blue
    },
    hourView: {
        width: 46,
        borderRadius: 8,
        paddingVertical: 9,
        paddingHorizontal: 3,
        alignItems: "center",
        marginRight: 12
    },
    scrollView: {
        width: "100%",
        marginTop: 16
    },
    date: {
        marginRight: 10
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: isTablet ? 14 : 13,
        borderBottomWidth: 1,
        borderColor: CommonColor.basic_gray_light
    },
    wrapper: {
        paddingTop: 50
    }
})
