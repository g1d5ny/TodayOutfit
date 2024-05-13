import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import LocationScreen from "../../../../../screen/location/LocationScreen"
import { MoreScreen } from "screen/more/MoreScreen"
import { PushScreen } from "screen/more/PushScreen"
import { AppInfoScreen } from "screen/more/AppInfoScreen"

const { Navigator, Screen } = createStackNavigator()

export const MoreNavigator = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name={"MoreScreen"} component={MoreScreen} />
            <Screen name={"PushScreen"} component={PushScreen} />
            <Screen name={"AppInfoScreen"} component={AppInfoScreen} />
        </Navigator>
    )
}
