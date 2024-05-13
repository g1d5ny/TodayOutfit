import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { MoreScreen } from "screen/more/MoreScreen"
import { PushScreen } from "screen/more/PushScreen"
import { AppInfoScreen } from "screen/more/appInfo/AppInfoScreen"
import { OpenSourceLicenseScreen } from "screen/more/appInfo/OpenSourceLicenseScreen"

const { Navigator, Screen } = createStackNavigator()

export const MoreNavigator = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name={"MoreScreen"} component={MoreScreen} />
            <Screen name={"OpenSourceLicenseScreen"} component={OpenSourceLicenseScreen} />
            <Screen name={"PushScreen"} component={PushScreen} />
            <Screen name={"AppInfoScreen"} component={AppInfoScreen} />
        </Navigator>
    )
}
