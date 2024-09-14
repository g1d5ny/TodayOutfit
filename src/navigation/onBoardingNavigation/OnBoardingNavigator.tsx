import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { SelectGenderScreen } from "../../screen/onBoarding/SelectGenderScreen"
import { GuideAddressScreen } from "../../screen/onBoarding/GuideAddressScreen"
import { SearchAddressScreen } from "../../screen/onBoarding/SearchAddressScreen"
import { SafeAreaView } from "react-native"
import { CommonStyle } from "style/CommonStyle"

const { Navigator, Screen } = createStackNavigator()

export const OnBoardingNavigator = () => {
    return (
        <SafeAreaView style={CommonStyle.flex}>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name={"GuideAddressScreen"} component={GuideAddressScreen} />
                <Screen name={"SearchAddressScreen"} component={SearchAddressScreen} />
                <Screen name={"SelectGenderScreen"} component={SelectGenderScreen} />
            </Navigator>
        </SafeAreaView>
    )
}
