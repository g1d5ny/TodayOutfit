import { NavigationContainer } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { SafeAreaView, StatusBar, useColorScheme } from "react-native"
import { navigationRef } from "./RootNavigation"
import { useRecoilValueLoadable } from "recoil"
import { loggedInState } from "../store"
import { OnBoardingNavigator } from "./onBoardingNavigation/OnBoardingNavigator"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { MainNavigator } from "./mainNavigation/MainNavigor"
import { CommonStyle } from "style/CommonStyle"

export const NavController = () => {
    const { contents: isLoggedIn, state } = useRecoilValueLoadable(loggedInState)

    const [goTo, setGoTo] = useState<string>("auth")
    const isDarkMode = useColorScheme() === "dark"
    const { top } = useSafeAreaInsets()

    useEffect(() => {
        if (isLoggedIn && state === "hasValue") {
            setGoTo("main")
        }
    }, [isLoggedIn, state])

    return (
        // TODO HomeScreen에서만 -top 되도록
        <SafeAreaView style={CommonStyle.flex}>
            <StatusBar />
            <NavigationContainer ref={navigationRef}>{goTo === "main" ? <MainNavigator /> : <OnBoardingNavigator />}</NavigationContainer>
            {/* <ToastComponent/> */}
        </SafeAreaView>
    )
}
