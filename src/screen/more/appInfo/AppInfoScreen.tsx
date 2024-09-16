import { AppInfoMenu, Header } from "component/CommonComponent"
import { navigationRef } from "navigation/RootNavigation"
import { StyleSheet, Text, View } from "react-native"
import DeviceInfo from "react-native-device-info"
import { isTablet } from "store"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "style/CommonStyle"

export const AppInfoScreen = () => {
    return (
        <View style={CommonStyle.flex}>
            <Header text={"앱 정보"} hasBack />
            <View style={[styles.container, CommonStyle.padding]}>
                <AppInfoMenu text={"오픈소스 라이선스"} onPress={() => navigationRef.current?.navigate("OpenSourceLicenseScreen")} />
                <View style={[styles.infoContainer, CommonStyle.row]}>
                    <Text style={[isTablet ? TabletFont.heading_1 : MobileFont.body_1]}>개발자 연락처</Text>
                    <Text style={[isTablet ? TabletFont.title2_regular : MobileFont.body_2, { color: CommonColor.basic_gray_medium }]}>todaysoutfit.developer@gmail.com</Text>
                </View>
                <View style={[styles.infoContainer, CommonStyle.row]}>
                    <Text style={isTablet ? TabletFont.heading_1 : MobileFont.body_1}>앱 버전</Text>
                    <Text style={[isTablet ? TabletFont.title2_regular : MobileFont.body_2, { color: CommonColor.basic_gray_medium }]}>{DeviceInfo.getVersion()}</Text>
                </View>
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
        marginTop: isTablet ? 20 : 16
    }
})
