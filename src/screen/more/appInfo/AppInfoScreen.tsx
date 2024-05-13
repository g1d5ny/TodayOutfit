import { AppInfoMenu, Header } from "component/CommonComponent"
import { navigationRef } from "navigation/RootNavigation"
import { StyleSheet, View } from "react-native"
import { isTablet } from "store"
import { CommonStyle } from "style/CommonStyle"

export const AppInfoScreen = () => {
    return (
        <View style={CommonStyle.flex}>
            <Header text={"앱 정보"} hasBack />
            <View style={[styles.container, CommonStyle.padding]}>
                <AppInfoMenu text={"오픈소스 라이선스"} onPress={() => navigationRef.current?.navigate("OpenSourceLicenseScreen")} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: isTablet ? 20 : 16
    }
})
