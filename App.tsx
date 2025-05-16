import { QueryClientProvider } from "@tanstack/react-query"
import { Splash } from "component/lottie/Splash"
import React, { useEffect, useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import SplashScreen from "react-native-splash-screen"
import { RecoilEnv, RecoilRoot } from "recoil"
import RecoilNexus from "recoil-nexus"
import { queryClient } from "store"
import { NavController } from "./src/navigation/NavController"

if (__DEV__) {
    RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false
}

function App(): JSX.Element {
    const [appLoading, setAppLoading] = useState(true)

    useEffect(() => {
        // Storage.removeItem("loggedInState")
        // Storage.removeItem("myAddressList")
        SplashScreen.hide()
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            {appLoading && <Splash onAnimationFinish={() => setAppLoading(false)} />}
            <RecoilRoot>
                <RecoilNexus />
                <SafeAreaProvider>
                    <NavController />
                </SafeAreaProvider>
            </RecoilRoot>
        </QueryClientProvider>
    )
}

export default App
