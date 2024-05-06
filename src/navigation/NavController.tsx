import { NavigationContainer } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { SafeAreaView, StatusBar, useColorScheme } from "react-native"
import { navigationRef } from "./RootNavigation"
import { useRecoilValueLoadable } from "recoil"
import { loggedInState } from "../store"
import { OnBoardingNavigator } from "./onBoardingNavigation/OnBoardingNavigator"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { MainNavigator } from "./MainNavigation/MainNavigor"

export default () => {
    const { contents: isLoggedIn, state } = useRecoilValueLoadable(loggedInState)

    const [goTo, setGoTo] = useState<string>("auth")
    const isDarkMode = useColorScheme() === "dark"
    const { top } = useSafeAreaInsets()

    const backgroundStyle = {
        flex: 1,
        marginTop: -top,
        backgroundColor: "#fff"
    }

    useEffect(() => {
        if (isLoggedIn && state === "hasValue") {
            setGoTo("main")
        }
    }, [isLoggedIn, state])

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
            <NavigationContainer ref={navigationRef}>{goTo === "main" ? <MainNavigator /> : <OnBoardingNavigator />}</NavigationContainer>
            {/* <ToastComponent/> */}
        </SafeAreaView>
    )
}
