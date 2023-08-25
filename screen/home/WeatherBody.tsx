import { Image, StyleSheet, Text, View } from "react-native"
import { currentWeatherInfoState, isTablet } from "../../store"
import { CommonColor, MobileFont, TabletFont } from "../../style/CommonStyle"
import TempClothes from "../../asset/icon/icon_recom_temp_clothes.svg"
import TempPants from "../../asset/icon/icon_recom_temp_pants.svg"
import { useRecoilValue } from "recoil"
import { getDay } from "../../function"
import LinearGradient from "react-native-linear-gradient"
import MinTemp from "../../asset/icon/icon_min_temp.svg"
import MaxTemp from "../../asset/icon/icon_max_temp.svg"
import Sunrise from "../../asset/icon/icon_sunrise.svg"
import Sunset from "../../asset/icon/icon_sunset.svg"

export default () => {
    const currentWeather = useRecoilValue(currentWeatherInfoState)

    return (
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
                            <View style={styles.weatherCard}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.row}>
                                        <Text style={TabletFont.body_1}>{getDay()}</Text>
                                        <Text style={[TabletFont.body_2, { marginLeft: 6 }]}>{new Date().getDate()}</Text>
                                    </View>
                                    <View style={[styles.row, { marginLeft: 20 }]}>
                                        {currentWeather.minIcon}
                                        <Text style={{ marginLeft: 4 }}>{currentWeather.summary}</Text>
                                    </View>
                                </View>
                                <LinearGradient colors={[currentWeather.backgroundColor, "#fff"]} style={styles.gradient}>
                                    {currentWeather.maxIcon}
                                    <View style={styles.cardDesc}>
                                        <View style={[styles.row, { justifyContent: "space-between" }]}>
                                            <View style={styles.temp}>
                                                <View style={[styles.row, { marginBottom: 8 }]}>
                                                    <MaxTemp width={10} height={10} />
                                                    <Text style={[TabletFont.detail_3, { marginLeft: 4 }]}>최고온도</Text>
                                                </View>
                                                <Text style={[TabletFont.temperature, { color: CommonColor.etc_red }]}>{currentWeather.max}˚</Text>
                                            </View>
                                            <View style={[styles.temp, { marginLeft: 8 }]}>
                                                <View style={[styles.row, { marginBottom: 8 }]}>
                                                    <MinTemp width={10} height={10} />
                                                    <Text style={[TabletFont.detail_3, { marginLeft: 4 }]}>최저온도</Text>
                                                </View>
                                                <Text style={[TabletFont.temperature, { color: CommonColor.main_blue }]}>{currentWeather.min}˚</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.row, styles.temp, { marginTop: 23, justifyContent: "space-between" }]}>
                                            <View style={styles.row}>
                                                <Sunrise />
                                                <Text style={[TabletFont.detail_2, { color: CommonColor.basic_gray_dark, marginLeft: 8 }]}>일출</Text>
                                            </View>
                                            <Text style={[TabletFont.detail_2, { color: CommonColor.main_black }]}>{currentWeather.sunrise}</Text>
                                        </View>
                                        <View style={[styles.row, styles.temp, { justifyContent: "space-between", marginTop: 15 }]}>
                                            <View style={styles.row}>
                                                <Sunset />
                                                <Text style={[TabletFont.detail_2, { color: CommonColor.basic_gray_dark, marginLeft: 8 }]}>일몰</Text>
                                            </View>
                                            <Text style={[TabletFont.detail_2, { color: CommonColor.main_black }]}>{currentWeather.sunset}</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    temp: {
        paddingHorizontal: 8,
        alignItems: "center"
    },
    cardDesc: {
        flex: 1
    },
    gradient: {
        flex: 1,
        padding: 14,
        justifyContent: "space-between",
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row"
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    cardHeader: {
        height: 56,
        paddingHorizontal: 20,
        paddingVertical: 11,
        flexDirection: "row",
        alignItmes: "center"
    },
    weatherCard: {
        width: "100%",
        height: 250,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginTop: 8
    },
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
        alignItems: isTablet ? "flex-start" : "center",
        flexDirection: "row",
        marginTop: isTablet ? 40 : 20
    }
})
