import { AppBar, MoreMenu } from "component/CommonComponent"
import { StyleSheet, View } from "react-native"
import { CommonStyle } from "style/CommonStyle"
import Push from "asset/icon/icon_menu_push.svg"
import Weather from "asset/icon/icon_menu_weather.svg"
import Setting from "asset/icon/icon_menu_setting.svg"
import { isTablet } from "store"
import { navigationRef } from "navigation/RootNavigation"

export const MoreScreen = () => {
    return (
        <View style={CommonStyle.flex}>
            <AppBar text='더보기' hasBack={false} />
            <View style={[CommonStyle.padding, styles.container]}>
                {/* <MoreMenu icon={<Push />} text='알림 수신' onPress={() => navigationRef.current?.navigate("PushScreen")} /> */}
                <MoreMenu
                    icon={<Weather />}
                    text='기상 정보에 관하여'
                    onPress={() => navigationRef.current?.navigate("WeatherDetailNavigator", { screen: "WeatherDetailScreen", params: { index: 0 } })}
                />
                <MoreMenu icon={<Setting />} text='앱 정보' onPress={() => navigationRef.current?.navigate("AppInfoScreen")} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: isTablet ? 40 : 32,
        gap: isTablet ? 48 : 40
    }
})
