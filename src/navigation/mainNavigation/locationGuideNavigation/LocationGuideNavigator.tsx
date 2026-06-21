import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { WeatherDetailScreen } from "../../../screen/weatherDetail"
import { CommonStyle } from "style/CommonStyle"
import { SafeAreaView } from "react-native"
import { LocationGuideScreen } from "screen/location/LocationGuideScreen"

const { Navigator, Screen } = createStackNavigator()

export const LocationGuideNavigator = () => (
    <SafeAreaView style={CommonStyle.flex}>
        <Navigator screenOptions={{ headerShown: false }} initialRouteName={"LocationGuideScreen"}>
            <Screen name={"LocationGuideScreen"} component={LocationGuideScreen} />
        </Navigator>
    </SafeAreaView>
)
