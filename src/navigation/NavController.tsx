import { NavigationContainer } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { Platform, StatusBar, useColorScheme, View } from "react-native"
import { navigationRef } from "./RootNavigation"
import { useRecoilValueLoadable } from "recoil"
import { loggedInState } from "../store"
import { OnBoardingNavigator } from "./onBoardingNavigation/OnBoardingNavigator"
import { MainNavigator } from "./mainNavigation/MainNavigor"
import { CommonStyle } from "style/CommonStyle"
import { ToastComponent } from "component/LocationPermissionModal"

export const NavController = () => {
    const { contents: isLoggedIn, state } = useRecoilValueLoadable(loggedInState)
    const [goTo, setGoTo] = useState<string>("auth")
    const isDarkMode = useColorScheme() === "dark"

    useEffect(() => {
        if (isLoggedIn && state === "hasValue") {
            setGoTo("main")
        }
    }, [isLoggedIn, state])

    return (
        <View style={CommonStyle.flex}>
            <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"} />
            <NavigationContainer ref={navigationRef}>{goTo === "main" ? <MainNavigator /> : <OnBoardingNavigator />}</NavigationContainer>
            <ToastComponent />
        </View>
    )
}
