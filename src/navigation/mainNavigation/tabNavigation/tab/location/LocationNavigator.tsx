import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { LocationScreen } from "../../../../../screen/location/LocationScreen"
import { SafeAreaView } from "react-native"
import { CommonStyle } from "style/CommonStyle"

const { Navigator, Screen } = createStackNavigator()

export const LocationNavigator = () => {
    return (
        <SafeAreaView style={CommonStyle.flex}>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name={"LocationScreen"} component={LocationScreen} />
            </Navigator>
        </SafeAreaView>
    )
}
