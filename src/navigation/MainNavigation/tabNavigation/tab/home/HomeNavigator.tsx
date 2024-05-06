import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { HomeScreen } from "../../../../../screen/home/HomeScreen"

const { Navigator, Screen } = createStackNavigator()

export const HomeNavigator = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name={"HomeScreen"} component={HomeScreen} />
        </Navigator>
    )
}
