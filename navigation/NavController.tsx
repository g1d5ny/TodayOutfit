import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import { SafeAreaView, StatusBar, useColorScheme } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { navigationRef } from "./RootNavigation"
import { ToastComponent } from "../component/Toast"
import { useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable } from "recoil"
import { loggedInState } from "../store"
import { TabNavigator } from "./tabNavigation/TabNavigator"
import { OnBoardingNavigator } from "./onBoardingNavigation/OnBoardingNavigator"

export default () => {
    const { contents: isLoggedIn } = useRecoilValueLoadable(loggedInState)
    const isDarkMode = useColorScheme() === "dark"
    const backgroundStyle = {
        flex: 1,
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
            <NavigationContainer ref={navigationRef}>{isLoggedIn ? <TabNavigator /> : <OnBoardingNavigator />}</NavigationContainer>
            {/* <ToastComponent/> */}
        </SafeAreaView>
    )
}
