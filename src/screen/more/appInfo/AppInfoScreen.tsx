import { AppBar, AppInfoMenu } from "component/CommonComponent"
import { navigationRef } from "navigation/RootNavigation"
import { StyleSheet, View } from "react-native"
import DeviceInfo from "react-native-device-info"
import { isTablet } from "store"
import { CommonStyle } from "style/CommonStyle"

export const AppInfoScreen = () => {
    return (
        <View style={CommonStyle.flex}>
            <AppBar text={"앱 정보"} hasBack />
            <View style={[styles.container, CommonStyle.padding]}>
                <AppInfoMenu text={"오픈소스 라이선스"} onPress={() => navigationRef.current?.navigate("OpenSourceLicenseScreen")} />
                <AppInfoMenu text={"개발자 연락처"} customText='todaysoutfit.developer@gmail.com' />
                <AppInfoMenu text={"앱 버전"} customText={DeviceInfo.getVersion()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        marginVertical: isTablet ? 20 : 16,
        justifyContent: "space-between"
    },
    container: {
        marginTop: isTablet ? 38 : 32,
        gap: isTablet ? 40 : 32
    }
})
