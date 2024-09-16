import { Header, OpenSource } from "component/CommonComponent"
import { Linking, ScrollView, StyleSheet, Text, View } from "react-native"
import Hyperlink from "react-native-hyperlink"
import { isTablet } from "store"
import { CommonColor, CommonStyle, MobileFont, TabletFont, screenWidth } from "style/CommonStyle"

export const OpenSourceLicenseScreen = () => {
    return (
        <View style={CommonStyle.flex}>
            <Header text={"오픈 소스 라이선스"} hasBack />
            <ScrollView>
                <View style={CommonStyle.padding}>
                    <Text style={[isTablet ? TabletFont.label1_reading_regular : MobileFont.label1_reading_regular, styles.padding, { color: CommonColor.basic_gray_dark }]}>
                        '오늘모입지' 앱에서 사용된 오픈 소스 라이브러리
                    </Text>
                    <View style={[styles.view, styles.padding]}>
                        <OpenSource name={"Axios"} link={"https://axios-http.com/"} copyright={"Copyright © 2014-present Matt Zabriskie and contributors"} />
                        <OpenSource name={"dayjs"} link={"https://day.js.org/"} copyright={"Copyright © 2024 Day.js"} />
                        <OpenSource name={"lodash"} link={"https://lodash.com/"} copyright={"Copyright OpenJS Foundation and other contributors <https://openjsf.org/>"} />
                        <OpenSource name={"react-native"} link={"https://reactnative.dev/"} copyright={"Copyright © 2024 Meta Platforms, Inc."} />
                        <OpenSource name={"react-native-svg"} link={"https://github.com/software-mansion/react-native-svg"} copyright={"Copyright © [2015-2016] [Horcrux]"} />
                    </View>
                    <Text style={[isTablet ? TabletFont.label1_reading_regular : MobileFont.label1_reading_regular, { color: CommonColor.basic_gray_dark }]}>
                        위에 열거된 오픈 소스 라이브러리들은 모두 MIT 라이선스를 사용하고 있으며, 이를 준수하여 '오늘모입지' 앱을 개발하였습니다. 해당 라이선스에 대한 자세한 내용은 각
                        라이브러리의 문서에서 확인하실 수 있습니다.
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    copyright: {
        marginVertical: 8
    },
    line: {
        width: screenWidth,
        height: 8,
        backgroundColor: CommonColor.basic_gray_light,
        alignSelf: "center"
    },
    padding: {
        paddingTop: isTablet ? 40 : 32
    },
    view: {
        flexWrap: "wrap",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "flex-start"
    }
})
