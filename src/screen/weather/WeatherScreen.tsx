import { DateView, LocationView, WeatherDetail } from "component/MiniCard"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useRecoilValue } from "recoil"
import { isTablet, weather, weeklyWeatherInfoState } from "store"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "style/CommonStyle"
import { RainPercentageFormat, SnowFallFormat, UVFormat, WindSpeedFormat, getDay } from "utils"
import MinTemp from "asset/icon/icon_min_temp.svg"
import MaxTemp from "asset/icon/icon_max_temp.svg"
import { useState } from "react"
import { WeatherCard } from "component/WeatherCard"
import { navigationRef } from "navigation/RootNavigation"
import UV from "asset/icon/icon_uv_index.svg"
import WindSpeed from "asset/icon/icon_wind_speed.svg"
import RainPercentage from "asset/icon/icon_rain_percentage.svg"
import EmptyCalendar from "asset/icon/icon_empty_calendar.svg"
import Loader from "component/lottie/Loader"

interface WeatherDetail {
    uv: number
    maxWindSpeed: number
    willItSnow: boolean
    snowPercentage: number
    rainPercentage: number
}

interface Open extends WeatherDetail {
    index: number
    date: string
}

const WeatherDetailComponent = ({ uv, maxWindSpeed, willItSnow, snowPercentage, rainPercentage }: WeatherDetail) => {
    return (
        <>
            <WeatherDetail
                titleIcon={<UV />}
                title={"UV 지수"}
                content={UVFormat(uv)?.content as string}
                desc={UVFormat(uv)?.text as string}
                contentIcon={UVFormat(uv)?.icon}
                onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 0 } })}
            />
            <WeatherDetail
                titleIcon={<WindSpeed />}
                title={"풍속"}
                content={WindSpeedFormat(maxWindSpeed)?.content as string}
                desc={WindSpeedFormat(maxWindSpeed)?.text as string}
                contentIcon={WindSpeedFormat(maxWindSpeed)?.icon}
                onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 2 } })}
            />
            {willItSnow ? (
                <WeatherDetail
                    titleIcon={<RainPercentage />}
                    title={"적설량"}
                    content={SnowFallFormat(snowPercentage)?.content as string}
                    desc={SnowFallFormat(snowPercentage)?.text as string}
                    contentIcon={SnowFallFormat(snowPercentage)?.icon}
                    onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 6 } })}
                />
            ) : (
                <WeatherDetail
                    titleIcon={<RainPercentage />}
                    title={"강수 확률"}
                    content={RainPercentageFormat(rainPercentage)?.content as string}
                    desc={RainPercentageFormat(rainPercentage)?.text as string}
                    contentIcon={RainPercentageFormat(rainPercentage)?.icon}
                    onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 4 } })}
                />
            )}
        </>
    )
}

const EmptyView = () => {
    return (
        <View style={[CommonStyle.center, styles.emptyCalendar]}>
            <EmptyCalendar />
            <Text style={[TabletFont.heading_2, { color: CommonColor.basic_gray_medium }]}>선택된 날짜가 없습니다.</Text>
            <Text style={[TabletFont.detail_2, { color: CommonColor.basic_gray_medium, marginTop: 12 }]}>날짜를 선택해 요일별 상세{"\n"}기상 정보를 확인해보세요!</Text>
        </View>
    )
}

export const WeatherScreen = () => {
    const weeklyWeather = useRecoilValue(weeklyWeatherInfoState)
    const [open, setOpen] = useState<Open>()

    const MobileView = ({ children }: { children: JSX.Element }) => {
        if (isTablet) {
            return
        }
        return <View style={styles.detailCard}>{children}</View>
    }

    const TabletView = ({ children }: { children: JSX.Element }) => {
        if (!isTablet) {
            return
        }
        const month = open?.date ? new Date(open?.date).getMonth() + 1 : undefined
        const date = open?.date ? new Date(open?.date).getDate() : undefined

        return (
            <View style={[styles.cardContainer, styles.weatherContainer, styles.detail]}>
                <View style={CommonStyle.row}>
                    <DateView date={date} month={month} />
                    <Text style={[isTablet && TabletFont.heading_2, styles.text]}>의 상세 기상 정보</Text>
                </View>
                <View style={styles.detailCard}>{children}</View>
            </View>
        )
    }

    return (
        <View style={CommonStyle.flex}>
            <View style={styles.header}>
                <Text style={[isTablet ? TabletFont.heading_1 : MobileFont.heading_1]}>날씨 정보</Text>
                <LocationView />
            </View>
            <ScrollView>
                <View style={[CommonStyle.title, CommonStyle.padding]}>
                    <Text style={isTablet ? TabletFont.heading_1 : MobileFont.body_1}>이번주 날씨</Text>
                    <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_3, styles.content]}>요일을 선택하면 더 자세한 기상 정보를 확인할 수 있습니다.</Text>
                    {!weeklyWeather ? (
                        <View style={CommonStyle.flex}>
                            <Loader />
                        </View>
                    ) : (
                        <View style={isTablet && styles.tabletDetail}>
                            <View style={[styles.cardContainer, isTablet && styles.weatherContainer]}>
                                {weeklyWeather.map(
                                    (
                                        {
                                            code,
                                            date,
                                            day,
                                            minIcon,
                                            maxIcon,
                                            uv,
                                            rainPercentage,
                                            snowPercentage,
                                            willItSnow,
                                            maxWindSpeed,
                                            minTemp,
                                            maxTemp,
                                            sunrise,
                                            sunset,
                                            backgroundColor
                                        },
                                        index
                                    ) => {
                                        const isFirst = index === 0
                                        const isLast = index === weeklyWeather.length - 1
                                        const color = day === 6 ? CommonColor.main_blue : day === 0 ? CommonColor.etc_red : CommonColor.main_black
                                        const isOpen = open?.index === index

                                        return isOpen ? (
                                            <View key={index} style={styles.weatherCard}>
                                                <WeatherCard
                                                    day={getDay(day)}
                                                    date={new Date(date).getDate()}
                                                    minIcon={minIcon as JSX.Element}
                                                    text={weather(code, true)?.text as string}
                                                    maxIcon={maxIcon as JSX.Element}
                                                    maxTemp={maxTemp}
                                                    minTemp={minTemp}
                                                    sunrise={sunrise}
                                                    sunset={sunset}
                                                    backgroundColor={backgroundColor}
                                                    onPress={() => setOpen(undefined)}
                                                />
                                                <MobileView>
                                                    <WeatherDetailComponent
                                                        uv={uv}
                                                        maxWindSpeed={maxWindSpeed}
                                                        willItSnow={willItSnow}
                                                        snowPercentage={snowPercentage}
                                                        rainPercentage={rainPercentage}
                                                    />
                                                </MobileView>
                                            </View>
                                        ) : (
                                            <TouchableOpacity
                                                key={index}
                                                style={[CommonStyle.row, styles.weeklyContainer, isFirst && styles.firstWeeklyContainer, isLast && styles.lastWeeklyContainer]}
                                                onPress={() => setOpen({ index, uv, date, maxWindSpeed, willItSnow, snowPercentage, rainPercentage })}
                                            >
                                                <View style={CommonStyle.row}>
                                                    <View style={CommonStyle.row}>
                                                        <Text style={[isTablet ? TabletFont.body_1 : MobileFont.body_1, styles.day, { color }]}>{getDay(day)}</Text>
                                                        <Text style={isTablet ? TabletFont.body_2 : MobileFont.body_2}>{new Date(date).getDate()}</Text>
                                                    </View>
                                                    <View style={[CommonStyle.row, styles.weather]}>
                                                        <View>{weather(code, true)?.minIcon}</View>
                                                        <Text style={[isTablet ? TabletFont.body_2 : MobileFont.body_2, styles.text]}>{weather(code, true)?.text}</Text>
                                                    </View>
                                                </View>
                                                <View style={[CommonStyle.row, styles.tempContainer]}>
                                                    <MinTemp />
                                                    <Text style={[isTablet ? TabletFont.detail_3 : MobileFont.detail_3, styles.interval, { color: CommonColor.basic_gray_dark }]}>
                                                        {minTemp}˚
                                                    </Text>
                                                    <View style={[styles.line, styles.interval]} />
                                                    <MaxTemp />
                                                    <Text style={[isTablet ? TabletFont.detail_3 : MobileFont.detail_3, styles.interval, { color: CommonColor.basic_gray_dark }]}>
                                                        {maxTemp}˚
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }
                                )}
                            </View>
                            <TabletView>
                                {open ? (
                                    <WeatherDetailComponent
                                        uv={open.uv}
                                        maxWindSpeed={open.maxWindSpeed}
                                        willItSnow={open.willItSnow}
                                        snowPercentage={open.snowPercentage}
                                        rainPercentage={open.rainPercentage}
                                    />
                                ) : (
                                    <EmptyView />
                                )}
                            </TabletView>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyCalendar: {
        width: "100%",
        height: 380,
        borderRadius: 15,
        backgroundColor: CommonColor.basic_gray_light
    },
    detail: {
        marginLeft: 24
    },
    tabletDetail: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    weatherCard: {
        marginBottom: 8
    },
    weatherContainer: {
        width: "48%"
    },
    detailCard: {
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginTop: 16
    },
    tempContainer: {
        height: "50%"
    },
    line: {
        height: "100%",
        borderWidth: 1,
        borderColor: CommonColor.basic_gray_medium,
        marginRight: 10
    },
    weather: {
        marginLeft: 20
    },
    interval: {
        marginLeft: 10
    },
    text: {
        marginLeft: 8
    },
    day: {
        marginRight: 6
    },
    lastWeeklyContainer: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    firstWeeklyContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    weeklyContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: "space-between",
        backgroundColor: CommonColor.basic_gray_light,
        marginBottom: 8
    },
    cardContainer: {
        marginTop: 24
    },
    content: {
        marginTop: 8,
        color: CommonColor.basic_gray_dark
    },
    header: {
        width: "100%",
        paddingHorizontal: isTablet ? 32 : 16,
        paddingVertical: isTablet ? 14 : 13,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: CommonColor.basic_gray_light
    }
})
