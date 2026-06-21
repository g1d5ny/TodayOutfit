import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { WeatherScreen } from "../../../../../screen/weather/WeatherScreen"
import { SafeAreaView } from "react-native"
import { CommonStyle } from "style/CommonStyle"

const { Navigator, Screen } = createStackNavigator()

export const WeatherNavigator = () => {
    return (
        <SafeAreaView style={CommonStyle.flex}>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name={"WeatherScreen"} component={WeatherScreen} />
            </Navigator>
        </SafeAreaView>
    )
}
