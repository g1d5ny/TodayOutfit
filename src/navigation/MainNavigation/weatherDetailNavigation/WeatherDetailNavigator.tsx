import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { WeatherDetailScreen } from "../../../screen/weatherDetail"
import { CommonStyle } from "style/CommonStyle"
import { SafeAreaView } from "react-native"

const { Navigator, Screen } = createStackNavigator()

export const WeatherDetailNavigator = () => (
    <SafeAreaView style={CommonStyle.flex}>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName={"WeatherDetailScreen"}>
            <Screen name={"WeatherDetailScreen"} component={WeatherDetailScreen} />
        </Navigator>
    </SafeAreaView>
)
