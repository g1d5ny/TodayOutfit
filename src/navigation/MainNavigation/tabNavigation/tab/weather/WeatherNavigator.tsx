import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import WeatherScreen from "../../../../../screen/weather/WeatherScreen"

const { Navigator, Screen } = createStackNavigator()

export const WeatherNavigator = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name={"WeatherScreen"} component={WeatherScreen} />
        </Navigator>
    )
}
