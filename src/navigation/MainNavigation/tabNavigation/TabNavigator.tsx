import React, { useEffect } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeOn from "../../../asset/icon/icon_home_on.svg"
import HomeOff from "../../../asset/icon/icon_home_off.svg"
import LocationOn from "../../../asset/icon/icon_location_on.svg"
import LocationOff from "../../../asset/icon/icon_location_off.svg"
import WeatherOn from "../../../asset/icon/icon_weather_on.svg"
import WeatherOff from "../../../asset/icon/icon_weather_off.svg"
import SettingOn from "../../../asset/icon/icon_setting_on.svg"
import SettingOff from "../../../asset/icon/icon_setting_off.svg"
import { HomeNavigator } from "./tab/home/HomeNavigator"
import { LocationNavigator } from "./tab/location/LocationNavigator"
import { WeatherNavigator } from "./tab/weather/WeatherNavigator"
import { MoreNavigator } from "./tab/more/MoreNavigator"
import { CommonColor, TAB_HEIGHT } from "../../../style/CommonStyle"
import { currentWeatherInfoState, hourWeatherInfoState, weeklyWeatherInfoState } from "store"
import { useSetRecoilState } from "recoil"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { fetchCurrentWeatherQuery } from "hook/useCurrentWeatherHook"
import { fetchDailyWeatherQuery } from "hook/useWeeklyWeatherHook"

const { Navigator, Screen } = createBottomTabNavigator()

export const TabNavigator = () => {
    const setCurrentWeather = useSetRecoilState(currentWeatherInfoState)
    const setWeeklyWeather = useSetRecoilState(weeklyWeatherInfoState)
    const setHourlyWeather = useSetRecoilState(hourWeatherInfoState)
    const { bottom } = useSafeAreaInsets()

    const { data: current } = fetchCurrentWeatherQuery()
    const { data: weekly } = fetchDailyWeatherQuery()

    useEffect(() => {
        if (weekly) {
            setWeeklyWeather(weekly.weeklyWeather)
            setHourlyWeather(weekly.hourlyWeather)
        }
    }, [weekly])

    useEffect(() => {
        if (current) {
            setCurrentWeather(current)
        }
    }, [current])

    return (
        <Navigator
            initialRouteName={"HomeNavigator"}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: CommonColor.basic_gray_dark,
                tabBarInactiveTintColor: CommonColor.basic_gray_medium,
                tabBarStyle: { height: TAB_HEIGHT + bottom },
                tabBarItemStyle: { height: TAB_HEIGHT },
                tabBarLabelStyle: { fontFamily: "Pretendard-Regular", fontSize: 12 }
            }}
        >
            <Screen
                name={"HomeNavigator"}
                component={HomeNavigator}
                options={{
                    tabBarLabel: "홈",
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return focused ? <HomeOn width={24} height={24} /> : <HomeOff width={24} height={24} />
                    }
                }}
            />
            <Screen
                name={"LocationNavigator"}
                component={LocationNavigator}
                options={{
                    tabBarLabel: "위치",
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return focused ? <LocationOn width={24} height={24} /> : <LocationOff width={24} height={24} />
                    }
                }}
            />
            <Screen
                name={"WeatherNavigator"}
                component={WeatherNavigator}
                options={{
                    tabBarLabel: "날씨",
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return focused ? <WeatherOn width={24} height={24} /> : <WeatherOff width={24} height={24} />
                    }
                }}
            />
            <Screen
                name={"MoreNavigator"}
                component={MoreNavigator}
                options={{
                    tabBarLabel: "더보기",
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return focused ? <SettingOn width={24} height={24} /> : <SettingOff width={24} height={24} />
                    }
                }}
            />
        </Navigator>
    )
}
