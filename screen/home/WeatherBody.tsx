import { Image, StyleSheet, Text, View } from "react-native"
import { isTablet, todayWeatherInfoState } from "../../store"
import { CommonColor, MobileFont, TabletFont } from "../../style/CommonStyle"
import TempClothes from "../../asset/icon/icon_recom_temp_clothes.svg"
import TempPants from "../../asset/icon/icon_recom_temp_pants.svg"
import { useRecoilValue } from "recoil"
import WeatherCard from "../../component/WeatherCard"
import { getDay } from "../../function"

export default () => {
    const { minIcon, text, maxIcon, maxTemp, minTemp, sunrise, sunset, backgroundColor } = useRecoilValue(todayWeatherInfoState)
    const currentDay = getDay()
    const currentDate = new Date().getDate()

    return (
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View style={styles.character}>
                {/* <Image source={require("../../asset/image/image_girl.png")} style={{ width: isTablet ? 286 : 186, height: isTablet ? 720 : 470 }} /> */}
                <View>
                    <Text style={[isTablet ? TabletFont.button_1 : MobileFont.button_1, { color: CommonColor.main_white }]}>기온 맞춤 추천 의상</Text>
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
                        <WeatherCard
                            day={currentDay}
                            date={currentDate}
                            minIcon={minIcon as JSX.Element}
                            text={text}
                            maxIcon={maxIcon as JSX.Element}
                            maxTemp={maxTemp}
                            minTemp={minTemp}
                            sunrise={sunrise}
                            sunset={sunset}
                            backgroundColor={backgroundColor}
                        />
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
