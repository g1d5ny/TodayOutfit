import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { currentWeatherInfoState, hourWeatherInfoState, isTablet, myAddressListState, weeklyWeatherInfoState } from "../../store"
import { useWeatherHook } from "../../hook/useWeatherHook"
import { useRecoilValue } from "recoil"
import Loader from "../../component/lottie/Loader"
import { useEffect } from "react"
import { CommonColor, MobileFont, TabletFont, TextShadowStyle } from "../../style/CommonStyle"
import Location from "../../asset/icon/icon_line_location.svg"
import MinTemp from "../../asset/icon/icon_min_temp.svg"
import MaxTemp from "../../asset/icon/icon_max_temp.svg"
import TempClothes from "../../asset/icon/icon_recom_temp_clothes.svg"
import TempPants from "../../asset/icon/icon_recom_temp_pants.svg"

export default () => {
    const myAddressList = useRecoilValue(myAddressListState)
    const currentWeather = useRecoilValue(currentWeatherInfoState)
    const hourWeather = useRecoilValue(hourWeatherInfoState)

    const { CallAllWeather } = useWeatherHook()

    useEffect(() => {
        CallAllWeather()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {!currentWeather || !hourWeather ? (
                <View style={{ flex: 1 }}>
                    <Loader />
                </View>
            ) : (
                <ImageBackground source={require("../../asset/image/image_background.png")} resizeMode='cover' style={{ flex: 1 }}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={[styles.bar]}></View>
                        {/* <ScrollView style={{ flex: 1, paddingHorizontal: isTablet ? 32 : 16 }}> */}
                        <View style={styles.weatherDesc}>
                            <View style={{ maxWidth: "65%" }}>
                                <Text style={[isTablet ? TabletFont.detail_1 : MobileFont.detail_1, TextShadowStyle, { color: CommonColor.main_white }]}>오늘은</Text>
                                <Text style={[isTablet ? TabletFont.temperature : MobileFont.bold_on_boarding, TextShadowStyle, { color: CommonColor.main_white }]}>{currentWeather.description}</Text>
                            </View>
                            <Text style={[isTablet ? TabletFont.temperature_2 : MobileFont.temperature2, TextShadowStyle, { color: CommonColor.main_white }]}>{currentWeather.currentTemp}˚</Text>
                        </View>
                        <View style={[styles.weatherDesc, { marginTop: 0 }]}>
                            <View style={styles.addrView}>
                                <Location width={isTablet ? 18 : 12} height={isTablet ? 18 : 12} />
                                <Text style={[isTablet ? TabletFont.body_2 : MobileFont.detail_2, { marginLeft: isTablet ? 4 : 6, color: CommonColor.main_white }]}>{myAddressList && myAddressList[0].location}</Text>
                            </View>
                            <View style={styles.tempView}>
                                <MinTemp width={isTablet ? 14 : 12} height={isTablet ? 14 : 12} />
                                <Text style={[isTablet ? TabletFont.body_2 : MobileFont.detail_2, { color: CommonColor.main_white, marginLeft: 8 }]}>{currentWeather.min}˚</Text>
                                <Text style={[isTablet ? TabletFont.body_2 : MobileFont.detail_2, { color: CommonColor.main_white, marginHorizontal: 8 }]}>|</Text>
                                <MaxTemp width={isTablet ? 14 : 12} height={isTablet ? 14 : 12} />
                                <Text style={[isTablet ? TabletFont.body_2 : MobileFont.detail_2, { color: CommonColor.main_white, marginLeft: 8 }]}>{currentWeather.max}˚</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                            <View style={styles.character}>
                                <Image source={require("../../asset/image/image_girl.png")} style={{ width: isTablet ? 286 : 186, height: isTablet ? 720 : 470 }} />
                                <View>
                                    <Text style={[isTablet ? TabletFont.header : MobileFont.body_1, { color: CommonColor.main_white }]}>기온 맞춤 추천 의상</Text>
                                    <View style={styles.recomContainer}>
                                        <View style={[styles.recom, { marginBottom: isTablet ? 0 : 8, marginRight: isTablet ? 25 : 0 }]}>
                                            <View style={styles.clothes}>
                                                <TempClothes width={"90%"} height={"90%"} />
                                            </View>
                                            <View style={styles.clothesDesc}>
                                                <Text style={[isTablet ? TabletFont.body_1 : MobileFont.body_1, { color: CommonColor.main_blue }]}>반팔</Text>
                                                <Text style={[isTablet ? TabletFont.body_2 : MobileFont.detail_3, { color: CommonColor.basic_gray_dark }]}>소매가 짧은 상의</Text>
                                            </View>
                                        </View>
                                        <View style={styles.recom}>
                                            <View style={styles.clothes}>
                                                <TempPants width={"70%"} height={"70%"} />
                                            </View>
                                            <View style={styles.clothesDesc}>
                                                <Text style={[isTablet ? TabletFont.body_1 : MobileFont.body_1, { color: CommonColor.main_blue }]}>반바지</Text>
                                                <Text style={[isTablet ? TabletFont.body_2 : MobileFont.detail_3, { color: CommonColor.basic_gray_dark }]}>소매가 짧은 하의</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {isTablet && (
                                        <View style={styles.weatherContainer}>
                                            <Text style={[TabletFont.header, { color: CommonColor.main_white }]}>오늘 날씨 예보</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                        {/* </ScrollView> */}
                    </SafeAreaView>
                </ImageBackground>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    weatherContainer: {
        marginTop: 26
    },
    clothesDesc: {
        paddingVertical: isTablet ? 10 : 9,
        paddingHorizontal: isTablet ? 10 : 9
    },
    clothes: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    recom: {
        width: isTablet ? 174 : 136,
        height: isTablet ? 239 : 186,
        borderRadius: 10,
        backgroundColor: CommonColor.main_white
    },
    recomContainer: {
        flexDirection: isTablet ? "row" : "column",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: 9
    },
    character: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    tempView: {
        flexDirection: "row",
        alignItems: "center"
    },
    addrView: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center"
    },
    weatherDesc: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    bar: {
        width: "100%",
        height: 2,
        backgroundColor: "#fff",
        marginTop: isTablet ? 6 : 11
    }
})
