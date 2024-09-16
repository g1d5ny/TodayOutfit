import { Image, StyleSheet, Text, View } from "react-native"
import { currentWeatherInfoState, getStorage, isTablet } from "../../store"
import { CommonColor, MobileFont, TabletFont } from "../../style/CommonStyle"
import { useRecoilValue } from "recoil"
import { useEffect, useState } from "react"
import { GENDER } from "type"

export default () => {
    const {
        is_day,
        costume: { top, topDesc, bottom, bottomDesc }
    } = useRecoilValue(currentWeatherInfoState)
    const [gender, setGender] = useState<GENDER>("W")

    useEffect(() => {
        const myGender = async () => {
            const gender = await getStorage("gender")
            setGender(gender)
        }
        myGender()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.character}>
                <Image
                    source={gender === "W" ? require("asset/image/image_girl.png") : require("asset/image/image_hood_boy.png")}
                    style={{ width: isTablet ? "40%" : "50%", height: "80%" }}
                />
                <View>
                    <Text style={[isTablet ? TabletFont.title2_semi_bold2 : MobileFont.body_1, { color: is_day ? CommonColor.main_black : CommonColor.main_white }]}>
                        기온 맞춤 추천 의상
                    </Text>
                    <View style={styles.recomContainer}>
                        <View style={[styles.recom, { marginBottom: 8, marginRight: isTablet ? 25 : 0 }]}>
                            <View style={styles.clothes}>
                                <Image source={top[0].path} style={{ width: "90%", height: "90%" }} />
                            </View>
                            <View style={styles.clothesDesc}>
                                <Text style={[isTablet ? TabletFont.body_1 : MobileFont.body_1, { color: CommonColor.main_blue }]}>{top[0].ko}</Text>
                                <Text style={[isTablet ? TabletFont.body_2 : MobileFont.label2_regular, { color: CommonColor.basic_gray_dark }]}>{topDesc} 상의</Text>
                            </View>
                        </View>
                        <View style={styles.recom}>
                            <View style={styles.clothes}>
                                <Image source={bottom[0].path} style={{ width: "90%", height: "90%" }} />
                            </View>
                            <View style={styles.clothesDesc}>
                                <Text style={[isTablet ? TabletFont.body_1 : MobileFont.body_1, { color: CommonColor.main_blue }]}>{bottom[0].ko}</Text>
                                <Text style={[isTablet ? TabletFont.body_2 : MobileFont.label2_regular, { color: CommonColor.basic_gray_dark }]}>{bottomDesc} 하의</Text>
                            </View>
                        </View>
                    </View>
                    {isTablet && (
                        <View style={styles.recomContainer}>
                            <View style={[styles.recom, { marginBottom: isTablet ? 0 : 8, marginRight: isTablet ? 25 : 0 }]}>
                                <View style={styles.clothes}>
                                    <Image source={top[1].path} style={{ width: "90%", height: "90%" }} />
                                </View>
                                <View style={styles.clothesDesc}>
                                    <Text style={[isTablet ? TabletFont.body_1 : MobileFont.body_1, { color: CommonColor.main_blue }]}>{top[1].ko}</Text>
                                    <Text style={[isTablet ? TabletFont.body_2 : MobileFont.label2_regular, { color: CommonColor.basic_gray_dark }]}>{topDesc} 상의</Text>
                                </View>
                            </View>
                            <View style={styles.recom}>
                                <View style={styles.clothes}>
                                    <Image source={bottom[1].path} style={{ width: "90%", height: "90%" }} />
                                </View>
                                <View style={styles.clothesDesc}>
                                    <Text style={[isTablet ? TabletFont.body_1 : MobileFont.body_1, { color: CommonColor.main_blue }]}>{bottom[1].ko}</Text>
                                    <Text style={[isTablet ? TabletFont.body_2 : MobileFont.label2_regular, { color: CommonColor.basic_gray_dark }]}>{bottomDesc} 하의</Text>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
        marginTop: 26,
        marginBottom: 8,
        color: CommonColor.main_white
    },
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
        paddingHorizontal: isTablet ? 10 : 9,
        gap: isTablet ? 8 : 4,
        backgroundColor: CommonColor.main_white,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
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
        backgroundColor: "rgba(255, 255, 255, 0.4)"
    },
    recomContainer: {
        flexDirection: isTablet ? "row" : "column",
        alignSelf: "flex-end",
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
