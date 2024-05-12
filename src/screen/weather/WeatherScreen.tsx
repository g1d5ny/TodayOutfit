import { LocationView, WeatherDetail } from "component/MiniCard"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useRecoilValue } from "recoil"
import { isTablet, weather, weeklyWeatherInfoState } from "store"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "style/CommonStyle"
import { RainPercentageFormat, SnowFallFormat, UVFormat, WindSpeedFormat, getDay } from "utils"
import MinTemp from "asset/icon/icon_min_temp.svg"
import MaxTemp from "asset/icon/icon_max_temp.svg"
import { PropsWithChildren, ReactNode, useState } from "react"
import { WeatherCard } from "component/WeatherCard"
import { navigationRef } from "navigation/RootNavigation"
import UV from "asset/icon/icon_uv_index.svg"
import WindSpeed from "asset/icon/icon_wind_speed.svg"
import RainPercentage from "asset/icon/icon_rain_percentage.svg"

export const WeatherScreen = () => {
    const weeklyWeatherInfo = useRecoilValue(weeklyWeatherInfoState)
    const [openIndex, setOpenIndex] = useState<number>(-1)

    const MobileView = ({ children }: { children: JSX.Element }) => {
        return <View style={styles.mobileView}>{children}</View>
    }

    const TabletView = ({ children }: { children: JSX.Element }) => {
        return <View style={[styles.cardContainer, styles.weatherContainer]}>{children}</View>
    }

    const Component = ({ children }: { children: JSX.Element }) => {
        return isTablet ? <TabletView>{children}</TabletView> : <MobileView>{children}</MobileView>
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
                    <View style={styles.cardContainer}>
                        {weeklyWeatherInfo.map(({ code, date, day, minIcon, maxIcon, text, uv, rainPercentage, snowPercentage, willItRain, willItSnow, maxWindSpeed, minTemp, maxTemp, sunrise, sunset, backgroundColor }, index) => {
                            const isFirst = index === 0
                            const isLast = index === weeklyWeatherInfo.length - 1
                            const color = day === 6 ? CommonColor.main_blue : day === 0 ? CommonColor.etc_red : CommonColor.main_black
                            const isOpen = openIndex === index

                            return isOpen ? (
                                <View key={index}>
                                    <View style={[isTablet && styles.weatherContainer]}>
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
                                            onPress={() => setOpenIndex(-1)}
                                        />
                                    </View>
                                    {
                                        <Component>
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
                                                        onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 2 } })}
                                                    />
                                                ) : (
                                                    <WeatherDetail
                                                        titleIcon={<RainPercentage />}
                                                        title={"강수 확률"}
                                                        content={RainPercentageFormat(rainPercentage)?.content as string}
                                                        desc={RainPercentageFormat(rainPercentage)?.text as string}
                                                        contentIcon={RainPercentageFormat(rainPercentage)?.icon}
                                                        onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 2 } })}
                                                    />
                                                )}
                                            </>
                                        </Component>
                                    }
                                </View>
                            ) : (
                                <TouchableOpacity key={index} style={[CommonStyle.row, styles.weeklyContainer, isFirst && styles.firstWeeklyContainer, isLast && styles.lastWeeklyContainer]} onPress={() => setOpenIndex(index)}>
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
                                        <Text style={[isTablet ? TabletFont.detail_3 : MobileFont.detail_3, styles.interval, { color: CommonColor.basic_gray_dark }]}>{minTemp}˚</Text>
                                        <View style={[styles.line, styles.interval]} />
                                        <MaxTemp />
                                        <Text style={[isTablet ? TabletFont.detail_3 : MobileFont.detail_3, styles.interval, { color: CommonColor.basic_gray_dark }]}>{maxTemp}˚</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherContainer: {
        width: "50%"
    },
    mobileView: {
        marginVertical: 16,
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
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
        justifyContent: "space-between"
    }
})
