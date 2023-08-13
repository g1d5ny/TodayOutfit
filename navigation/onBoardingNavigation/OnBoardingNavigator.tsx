import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { SelectGenderScreen } from "../../screen/onBoarding/SelectGenderScreen"
import { SelectAddressScreen } from "../../screen/onBoarding/SelectAddressScreen"

const { Navigator, Screen } = createStackNavigator()

export const OnBoardingNavigator = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name={"SelectGenderScreen"} component={SelectGenderScreen} />
            <Screen name={"SelectAddressScreen"} component={SelectAddressScreen} />
        </Navigator>
    )
}
