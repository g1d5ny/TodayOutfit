import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { currentWeatherInfoState, hourWeatherInfoState, isTablet, todayWeatherInfoState, weeklyWeatherInfoState } from "../../store"
import { CommonColor, MobileFont, TabletFont } from "../../style/CommonStyle"
import { DateView, LocationView, WeatherDetail } from "../../component/MiniCard"
import { useRecoilValue } from "recoil"
import UV from "../../asset/icon/icon_uv_index.svg"
import FeelsLike from "../../asset/icon/icon_feels_like.svg"
import WindSpeed from "../../asset/icon/icon_wind_speed.svg"
import WindDirection from "../../asset/icon/icon_wind_dir.svg"
import RainPercentage from "../../asset/icon/icon_rain_percentage.svg"
import Humidity from "../../asset/icon/icon_humidity.svg"
import SnowFall from "../../asset/icon/icon_snow_fall.svg"
import Sunrise from "../../asset/icon/icon_sunrise.svg"
import Sunset from "../../asset/icon/icon_sunset.svg"
import { useCallback, useEffect, useState } from "react"
import { FeelsLikeFormat, HumidityFormat, RainPercentageFormat, SnowFallFormat, UVFormat, WindDirectionFormat, WindSpeedFormat } from "../../function"

interface ClickedWeather {
    hour: number | string
    uv: number
    feelslike: number
    windSpeed: number
    chance_of_rain: number
    chance_of_snow: number
    will_it_rain: boolean
    will_it_snow: boolean
    windDir: string
    humidity: number
}

interface WeatherHourlyCard {
    hour?: string | number
    minIcon: JSX.Element
    temp?: string | number
    onPress: any
    isClicked: boolean
    index?: number
}
export default () => {
    const hourWeather = useRecoilValue(hourWeatherInfoState)
    const currentWeather = useRecoilValue(currentWeatherInfoState)
    const weeklyWeather = useRecoilValue(weeklyWeatherInfoState)
    const todayWeather = useRecoilValue(todayWeatherInfoState)
    const [selectedHour, setSelectedHour] = useState<ClickedWeather>()

    useEffect(() => {
        if (hourWeather) {
            setSelectedHour({
                hour: -1,
                uv: hourWeather[0]?.uv,
                feelslike: hourWeather[0]?.feelslike,
                windSpeed: hourWeather[0]?.windSpeed,
                will_it_rain: Boolean(hourWeather[0]?.will_it_rain),
                will_it_snow: Boolean(hourWeather[0]?.will_it_snow),
                chance_of_rain: hourWeather[0]?.chance_of_rain,
                chance_of_snow: hourWeather[0]?.chance_of_snow,
                windDir: hourWeather[0]?.windDir,
                humidity: hourWeather[0]?.humidity
            })
        }
    }, [hourWeather])

    const WeatherHourlyCard = useCallback(({ hour, minIcon, temp, onPress, isClicked, index }: WeatherHourlyCard) => {
        if (isClicked) {
            return (
                <TouchableOpacity key={index} style={[styles.hourView, { backgroundColor: CommonColor.basic_gray_light }]} onPress={onPress}>
                    <Text style={[isTablet ? TabletFont.detail_1 : MobileFont.detail_1, styles.currentText]}>{hour === -1 ? "지금" : hour + "시"}</Text>
                    <View style={{ marginVertical: 9 }}>{minIcon}</View>
                    <Text style={[isTablet ? TabletFont.detail_1 : MobileFont.detail_1, styles.currentText]}>{temp}˚</Text>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity key={index} style={[styles.hourView]} onPress={onPress}>
                <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_2, styles.hourText]}>{hour === -1 ? "지금" : hour + "시"}</Text>
                <View style={{ marginVertical: 9 }}>{minIcon}</View>
                <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_2, styles.hourText]}>{temp}˚</Text>
            </TouchableOpacity>
        )
    }, [])

    return (
        <View style={[styles.wrapper]}>
            <View style={styles.title}>
                <Text style={[isTablet ? TabletFont.heading : MobileFont.heading]}>일기 예보 상세</Text>
                <View style={styles.row}>
                    <LocationView />
                    <DateView />
                </View>
            </View>
            {hourWeather && selectedHour && (
                <>
                    <View style={{ marginTop: isTablet ? 40 : 32 }}>
                        <Text style={[isTablet ? TabletFont.button_1 : MobileFont.body_1]}>시간별 일기 예보</Text>
                        <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.row}>
                                {WeatherHourlyCard({
                                    hour: -1,
                                    minIcon: currentWeather.minIcon,
                                    temp: currentWeather.temp,
                                    onPress: () =>
                                        setSelectedHour({
                                            hour: -1,
                                            uv: hourWeather[0]?.uv,
                                            feelslike: hourWeather[0]?.feelslike,
                                            windSpeed: hourWeather[0]?.windSpeed,
                                            will_it_rain: Boolean(hourWeather[0]?.will_it_rain),
                                            will_it_snow: Boolean(hourWeather[0]?.will_it_snow),
                                            chance_of_rain: hourWeather[0]?.chance_of_rain,
                                            chance_of_snow: hourWeather[0]?.chance_of_snow,
                                            windDir: hourWeather[0]?.windDir,
                                            humidity: hourWeather[0]?.humidity
                                        }),
                                    isClicked: selectedHour.hour === -1,
                                    index: -1
                                })}
                                {hourWeather.map(({ hour, temp, minIcon, uv, feelslike, windSpeed, chance_of_rain, chance_of_snow, will_it_snow, will_it_rain, windDir, humidity }, index: number) => {
                                    const onPress = () => {
                                        setSelectedHour({ hour: Number(hour), uv, feelslike, windSpeed, chance_of_snow, chance_of_rain, will_it_rain, will_it_snow, windDir, humidity })
                                    }
                                    return WeatherHourlyCard({
                                        hour: Number(hour),
                                        minIcon,
                                        temp,
                                        onPress,
                                        isClicked: selectedHour.hour === Number(hour),
                                        index
                                    })
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    {isTablet ? (
                        <>
                            <View style={[styles.foreDetailRow]}>
                                <View style={styles.foreDetailTablet}>
                                    <WeatherDetail titleIcon={<UV />} title={"UV 지수"} content={UVFormat(selectedHour.uv)?.content as string} desc={UVFormat(selectedHour.uv)?.text as string} contentIcon={UVFormat(selectedHour.uv)?.icon} />
                                    <WeatherDetail
                                        titleIcon={<WindDirection />}
                                        title={"풍향"}
                                        content={WindDirectionFormat(selectedHour.windDir)?.content as string}
                                        desc={WindDirectionFormat(selectedHour.windDir)?.text as string}
                                        contentIcon={WindDirectionFormat(selectedHour.windDir)?.icon}
                                    />
                                </View>
                                <View style={styles.foreDetailTablet}>
                                    <WeatherDetail
                                        titleIcon={<FeelsLike />}
                                        title={"체감 온도"}
                                        content={FeelsLikeFormat(selectedHour.feelslike)?.content as string}
                                        desc={FeelsLikeFormat(selectedHour.feelslike)?.text as string}
                                        contentIcon={FeelsLikeFormat(selectedHour.feelslike)?.icon}
                                    />
                                    {selectedHour.will_it_snow ? (
                                        <WeatherDetail
                                            titleIcon={<SnowFall />}
                                            title={"적설량"}
                                            content={SnowFallFormat(selectedHour.chance_of_snow as number)?.content as string}
                                            desc={SnowFallFormat(selectedHour.chance_of_snow as number)?.text as string}
                                            contentIcon={SnowFallFormat(selectedHour.chance_of_snow as number)?.icon}
                                        />
                                    ) : (
                                        <WeatherDetail
                                            titleIcon={<RainPercentage />}
                                            title={"강수 확률"}
                                            content={RainPercentageFormat(selectedHour.chance_of_rain as number)?.content as string}
                                            desc={RainPercentageFormat(selectedHour.chance_of_rain as number)?.text as string}
                                            contentIcon={RainPercentageFormat(selectedHour.chance_of_rain as number)?.icon}
                                        />
                                    )}
                                </View>
                                <View style={styles.foreDetailTablet}>
                                    <WeatherDetail
                                        titleIcon={<WindSpeed />}
                                        title={"풍속"}
                                        content={WindSpeedFormat(selectedHour.windSpeed)?.content as string}
                                        desc={WindSpeedFormat(selectedHour.windSpeed)?.text as string}
                                        contentIcon={WindSpeedFormat(selectedHour.windSpeed)?.icon}
                                    />
                                    <WeatherDetail isVisible={false} />
                                </View>
                                <View style={styles.foreDetailTablet}>
                                    <WeatherDetail
                                        titleIcon={<Humidity />}
                                        title={"습도"}
                                        content={HumidityFormat(selectedHour.humidity)?.content as string}
                                        desc={HumidityFormat(selectedHour.humidity)?.text as string}
                                        contentIcon={HumidityFormat(selectedHour.humidity)?.icon}
                                    />

                                    <WeatherDetail isVisible={false} />
                                </View>
                            </View>
                        </>
                    ) : (
                        <View style={styles.foreDetailRow}>
                            <View style={[styles.foreDetail]}>
                                <WeatherDetail titleIcon={<UV />} title={"UV 지수"} content={UVFormat(selectedHour.uv)?.content as string} desc={UVFormat(selectedHour.uv)?.text as string} contentIcon={UVFormat(selectedHour.uv)?.icon} />
                                <WeatherDetail
                                    titleIcon={<WindSpeed />}
                                    title={"풍속"}
                                    content={WindSpeedFormat(selectedHour.windSpeed)?.content as string}
                                    desc={WindSpeedFormat(selectedHour.windSpeed)?.text as string}
                                    contentIcon={WindSpeedFormat(selectedHour.windSpeed)?.icon}
                                />
                                {selectedHour.will_it_snow ? (
                                    <WeatherDetail
                                        titleIcon={<SnowFall />}
                                        title={"적설량"}
                                        content={SnowFallFormat(selectedHour.chance_of_snow as number)?.content as string}
                                        desc={SnowFallFormat(selectedHour.chance_of_snow as number)?.text as string}
                                        contentIcon={SnowFallFormat(selectedHour.chance_of_snow as number)?.icon}
                                    />
                                ) : (
                                    <WeatherDetail
                                        titleIcon={<RainPercentage />}
                                        title={"강수 확률"}
                                        content={RainPercentageFormat(selectedHour.chance_of_rain as number)?.content as string}
                                        desc={RainPercentageFormat(selectedHour.chance_of_rain as number)?.text as string}
                                        contentIcon={RainPercentageFormat(selectedHour.chance_of_rain as number)?.icon}
                                    />
                                )}
                            </View>
                            <View style={[styles.foreDetail]}>
                                <WeatherDetail
                                    titleIcon={<FeelsLike />}
                                    title={"체감 온도"}
                                    content={FeelsLikeFormat(selectedHour.feelslike)?.content as string}
                                    desc={FeelsLikeFormat(selectedHour.feelslike)?.text as string}
                                    contentIcon={FeelsLikeFormat(selectedHour.feelslike)?.icon}
                                />
                                <WeatherDetail
                                    titleIcon={<WindDirection />}
                                    title={"풍향"}
                                    content={WindDirectionFormat(selectedHour.windDir)?.content as string}
                                    desc={WindDirectionFormat(selectedHour.windDir)?.text as string}
                                    contentIcon={WindDirectionFormat(selectedHour.windDir)?.icon}
                                />
                                <WeatherDetail
                                    titleIcon={<Humidity />}
                                    title={"습도"}
                                    content={HumidityFormat(selectedHour.humidity)?.content as string}
                                    desc={HumidityFormat(selectedHour.humidity)?.text as string}
                                    contentIcon={HumidityFormat(selectedHour.humidity)?.icon}
                                />
                            </View>
                        </View>
                    )}
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    foreDetailRow: {
        marginTop: 24,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    foreDetailTablet: {
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    foreDetail: {
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "flex-start"
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
