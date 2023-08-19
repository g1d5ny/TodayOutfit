import { NavigationContainer } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { SafeAreaView, StatusBar, useColorScheme } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { navigationRef } from "./RootNavigation"
// import { ToastComponent } from "../component/Toast"
import { useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable } from "recoil"
import { loggedInState } from "../store"
import { TabNavigator } from "./tabNavigation/TabNavigator"
import { OnBoardingNavigator } from "./onBoardingNavigation/OnBoardingNavigator"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default () => {
    const { contents: isLoggedIn } = useRecoilValueLoadable(loggedInState)
    const [goTo, setGoTo] = useState<string>("auth")
    const isDarkMode = useColorScheme() === "dark"
    const { top } = useSafeAreaInsets()

    const backgroundStyle = {
        flex: 1,
        marginTop: -top,
        backgroundColor: "#fff"
    }

    useEffect(() => {
        if (isLoggedIn) {
            setGoTo("main")
        }
    }, [isLoggedIn])

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
            <NavigationContainer ref={navigationRef}>{goTo === "main" ? <TabNavigator /> : <OnBoardingNavigator />}</NavigationContainer>
            {/* <ToastComponent/> */}
        </SafeAreaView>
    )
}
