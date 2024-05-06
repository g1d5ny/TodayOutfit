import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { WeatherDetailScreen } from "../../../screen/weatherDetail"

const { Navigator, Screen } = createStackNavigator()

export const WeatherDetailNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName={"WeatherDetailScreen"}>
        <Screen name={"WeatherDetailScreen"} component={WeatherDetailScreen} />
    </Navigator>
)
