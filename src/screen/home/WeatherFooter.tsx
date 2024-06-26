import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { currentDate, currentMonth, currentWeatherInfoState, hourWeatherInfoState, isTablet } from "../../store"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "../../style/CommonStyle"
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
        <View ref={viewRef} style={[CommonStyle.padding, styles.wrapper]}>
            <View style={styles.title}>
                <Text style={[isTablet ? TabletFont.heading_1 : MobileFont.heading_1]}>날씨 정보</Text>
                <View style={CommonStyle.row}>
                    <LocationView />
                    <View style={styles.date}>
                        <DateView date={currentDate} month={currentMonth} />
                    </View>
                </View>
            </View>
            {hourWeather && selectedHour && (
                <>
                    <View style={{ marginTop: isTablet ? 40 : 32 }}>
                        <Text style={[isTablet ? TabletFont.button_1 : MobileFont.body_1]}>시간별 일기 예보</Text>
                        <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
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
                    {isTablet ? (
                        <>
                            <View style={[styles.foreDetailRow]}>
                                <View style={styles.foreDetailTablet}>
                                    <WeatherDetail
                                        titleIcon={<UV />}
                                        title={"UV 지수"}
                                        content={UVFormat(selectedHour.uv)?.content as string}
                                        desc={UVFormat(selectedHour.uv)?.text as string}
                                        contentIcon={UVFormat(selectedHour.uv)?.icon}
                                        onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 0 } })}
                                    />
                                    <WeatherDetail
                                        titleIcon={<WindDirection />}
                                        title={"풍향"}
                                        content={WindDirectionFormat(selectedHour.windDir)?.content as string}
                                        desc={WindDirectionFormat(selectedHour.windDir)?.text as string}
                                        contentIcon={WindDirectionFormat(selectedHour.windDir)?.icon}
                                        onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 3 } })}
                                    />
                                </View>
                                <View style={styles.foreDetailTablet}>
                                    <WeatherDetail
                                        titleIcon={<FeelsLike />}
                                        title={"체감 온도"}
                                        content={FeelsLikeFormat(selectedHour.feelslike)?.content as string}
                                        desc={FeelsLikeFormat(selectedHour.feelslike)?.text as string}
                                        contentIcon={FeelsLikeFormat(selectedHour.feelslike)?.icon}
                                        onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 1 } })}
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
                                </View>
                                <View style={styles.foreDetailTablet}>
                                    <WeatherDetail
                                        titleIcon={<WindSpeed />}
                                        title={"풍속"}
                                        content={WindSpeedFormat(selectedHour.windSpeed)?.content as string}
                                        desc={WindSpeedFormat(selectedHour.windSpeed)?.text as string}
                                        contentIcon={WindSpeedFormat(selectedHour.windSpeed)?.icon}
                                        onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 2 } })}
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
                                        onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 5 } })}
                                    />
                                    <WeatherDetail isVisible={false} />
                                </View>
                            </View>
                        </>
                    ) : (
                        <View style={styles.foreDetailRow}>
                            <View style={[styles.foreDetail]}>
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
                            </View>
                            <View style={[styles.foreDetail]}>
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
    date: {
        marginLeft: 10
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    wrapper: {
        marginTop: 50,
        paddingVertical: 15
    }
})
