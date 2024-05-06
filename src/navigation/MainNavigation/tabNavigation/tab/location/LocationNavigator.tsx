import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import LocationScreen from "../../../../../screen/location/LocationScreen"

const { Navigator, Screen } = createStackNavigator()

export const LocationNavigator = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name={"LocationScreen"} component={LocationScreen} />
        </Navigator>
    )
}
