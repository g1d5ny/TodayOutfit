/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react"
import { StyleSheet } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import NavController from "./navigation/NavController"
import { RecoilEnv, RecoilRoot } from "recoil"
import RecoilNexus from "recoil-nexus"

if (__DEV__) {
    RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false
}

function App(): JSX.Element {
    return (
        <RecoilRoot>
            <RecoilNexus />
            <SafeAreaProvider>
                <NavController />
            </SafeAreaProvider>
        </RecoilRoot>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "600"
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "400"
    },
    highlight: {
        fontWeight: "700"
    }
})

export default App
