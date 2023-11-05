import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { UVScreen } from "../../../screen/weatherDetail/UVScreen"
import { FeelsLikeScreen } from "../../../screen/weatherDetail/FeelsLikeScreen"
import { WindSpeedScreen } from "../../../screen/weatherDetail/WindSpeedScreen"
import { WindDirectionScreen } from "../../../screen/weatherDetail/WindDirectionScreen"
import { RainPercentageScreen } from "../../../screen/weatherDetail/RainPercentageScreen"
import { HumidityScreen } from "../../../screen/weatherDetail/HumidityScreen"
import { SnowFallScreen } from "../../../screen/weatherDetail/SnowFallScreen"

const { Navigator, Screen } = createStackNavigator()

export const WeatherDetailNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name={"UVScreen"} component={UVScreen} />
        <Screen name={"FeelsLikeScreen"} component={FeelsLikeScreen} />
        <Screen name={"WindSpeedScreen"} component={WindSpeedScreen} />
        <Screen name={"WindDirectionScreen"} component={WindDirectionScreen} />
        <Screen name={"RainPercentageScreen"} component={RainPercentageScreen} />
        <Screen name={"HumidityScreen"} component={HumidityScreen} />
        <Screen name={"SnowFallScreen"} component={SnowFallScreen} />
    </Navigator>
)
