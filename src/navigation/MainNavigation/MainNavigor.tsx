import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { TabNavigator } from "./tabNavigation/TabNavigator"
import { WeatherDetailNavigator } from "./weatherDetailNavigation/WeatherDetailNavigator"

const { Navigator, Screen } = createStackNavigator()

export const MainNavigator = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name={"TabNavigator"} component={TabNavigator} />
            <Screen name={"WeatherDetailNavigator"} component={WeatherDetailNavigator} />
        </Navigator>
    )
}
