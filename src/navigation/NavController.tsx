import { NavigationContainer } from "@react-navigation/native"
import { ToastComponent } from "component/LocationPermissionModal"
import React, { useEffect, useState } from "react"
import { StatusBar, View } from "react-native"
import { useRecoilValueLoadable } from "recoil"
import { CommonStyle } from "style/CommonStyle"
import { loggedInState } from "../store"
import { MainNavigator } from "./mainNavigation/MainNavigor"
import { OnBoardingNavigator } from "./onBoardingNavigation/OnBoardingNavigator"
import { navigationRef } from "./RootNavigation"

export const NavController = () => {
    const { contents: isLoggedIn, state } = useRecoilValueLoadable(loggedInState)
    const [goTo, setGoTo] = useState<string>("auth")

    useEffect(() => {
        if (isLoggedIn && state === "hasValue") {
            setGoTo("main")
        }
    }, [isLoggedIn, state])

    return (
        <View style={CommonStyle.flex}>
            <StatusBar />
            <NavigationContainer ref={navigationRef}>{goTo === "main" ? <MainNavigator /> : <OnBoardingNavigator />}</NavigationContainer>
            <ToastComponent />
        </View>
    )
}
