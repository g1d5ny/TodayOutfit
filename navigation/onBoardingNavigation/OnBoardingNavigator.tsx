import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { SelectGenderScreen } from "../../screen/onBoarding/SelectGenderScreen"
import { GuideAddressScreen } from "../../screen/onBoarding/GuideAddressScreen"
import { SearchAddressScreen } from "../../screen/onBoarding/SearchAddressScreen"

const { Navigator, Screen } = createStackNavigator()

export const OnBoardingNavigator = () => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name={"SelectGenderScreen"} component={SelectGenderScreen} />
            <Screen name={"GuideAddressScreen"} component={GuideAddressScreen} />
            <Screen name={"SearchAddressScreen"} component={SearchAddressScreen} />
        </Navigator>
    )
}
