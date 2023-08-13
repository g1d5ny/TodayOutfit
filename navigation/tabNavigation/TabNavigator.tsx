import React from "react"
import { View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CommonColor } from "../../style/CommonStyle"
import HomeOn from "../../asset/icon/icon_home_on.svg"
import HomeOff from "../../asset/icon/icon_home_off.svg"
import LocationOn from "../../asset/icon/icon_location_on.svg"
import LocationOff from "../../asset/icon/icon_location_off.svg"
import WeatherOn from "../../asset/icon/icon_weather_on.svg"
import WeatherOff from "../../asset/icon/icon_weather_off.svg"
import SettingOn from "../../asset/icon/icon_setting_on.svg"
import SettingOff from "../../asset/icon/icon_setting_off.svg"
import { HomeNavigator } from "./tab/home/HomeNavigator"
import { LocationNavigator } from "./tab/location/LocationNavigator"
import { WeatherNavigator } from "./tab/weather/WeatherNavigator"
import { SettingNavigator } from "./tab/setting/SettingNavigator"

const { Navigator, Screen } = createBottomTabNavigator()

export const TabNavigator = () => {
    return (
        <Navigator
            initialRouteName={"HomeNavigator"}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: CommonColor.basic_gray_dark,
                tabBarInactiveTintColor: CommonColor.basic_gray_medium,
                tabBarStyle: { paddingTop: 13 },
                tabBarLabelStyle: { fontFamily: "Pretendard-Regular", fontSize: 12, marginTop: 5 }
            }}
        >
            <Screen
                name={"HomeNavigator"}
                component={HomeNavigator}
                options={{
                    tabBarLabel: "홈",
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return focused ? (
                            <View style={{ marginBottom: 5 }}>
                                <HomeOn width={24} height={24} />
                            </View>
                        ) : (
                            <View style={{ marginBottom: 5 }}>
                                <HomeOff width={24} height={24} />
                            </View>
                        )
                    }
                }}
            />
            <Screen
                name={"LocationNavigator"}
                component={LocationNavigator}
                options={{
                    tabBarLabel: "위치",
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return focused ? (
                            <View style={{ marginBottom: 5 }}>
                                <LocationOn width={24} height={24} />
                            </View>
                        ) : (
                            <View style={{ marginBottom: 5 }}>
                                <LocationOff width={24} height={24} />
                            </View>
                        )
                    }
                }}
            />
            <Screen
                name={"WeatherNavigator"}
                component={WeatherNavigator}
                options={{
                    tabBarLabel: "날씨",
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return focused ? (
                            <View style={{ marginBottom: 5 }}>
                                <WeatherOn width={24} height={24} />
                            </View>
                        ) : (
                            <View style={{ marginBottom: 5 }}>
                                <WeatherOff width={24} height={24} />
                            </View>
                        )
                    }
                }}
            />
            <Screen
                name={"SettingNavigator"}
                component={SettingNavigator}
                options={{
                    tabBarLabel: "설정",
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return focused ? (
                            <View style={{ marginBottom: 5 }}>
                                <SettingOn width={24} height={24} />
                            </View>
                        ) : (
                            <View style={{ marginBottom: 5 }}>
                                <SettingOff width={24} height={24} />
                            </View>
                        )
                    }
                }}
            />
        </Navigator>
    )
}
