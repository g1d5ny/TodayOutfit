import { fetchCurrentWeatherQuery } from "hook/useCurrentWeatherHook"
import { Image, StyleSheet, Text, View } from "react-native"
import { isTablet } from "../../store"
import { CommonColor, CommonStyle, FontStyle, TextShadowStyle } from "../../style/CommonStyle"

export default () => {
    const { data: current } = fetchCurrentWeatherQuery()

    const is_day = current?.is_day ?? false
    const top = current?.costume?.top ?? []
    const topDesc = current?.costume?.topDesc ?? ""
    const bottom = current?.costume?.bottom ?? []
    const bottomDesc = current?.costume?.bottomDesc ?? ""
    const character = current?.character

    return (
        <View style={styles.character}>
            <View style={[styles.cardDesc, CommonStyle.center]}>
                <Image source={character} resizeMode={isTablet ? "contain" : "cover"} style={styles.charaterImage} />
            </View>
            <View style={styles.cardDesc}>
                <Text style={[isTablet ? FontStyle.title2.semibold : FontStyle.body2.bold, styles.recomText, !is_day && TextShadowStyle, { color: is_day ? CommonColor.main_black : CommonColor.main_white }]}>기온 맞춤 추천 의상</Text>
                <View style={[styles.recomContainer, isTablet && styles.tabletClothes]}>
                    <View style={styles.recom}>
                        <Image source={top[0]?.path} style={styles.clothes} resizeMode='contain' />
                        <View style={styles.clothesDesc}>
                            <Text style={[isTablet ? FontStyle.body1.bold : FontStyle.body2.bold, { color: CommonColor.main_blue }]}>{top[0]?.ko}</Text>
                            <Text lineBreakMode='tail' numberOfLines={2} style={[isTablet ? FontStyle.body2.regular : FontStyle.label2.regular, { color: CommonColor.basic_gray_dark }]}>
                                {topDesc} 상의
                            </Text>
                        </View>
                    </View>
                    <View style={styles.recom}>
                        <Image source={bottom[0]?.path} style={styles.clothes} resizeMode='contain' />
                        <View style={styles.clothesDesc}>
                            <Text style={[isTablet ? FontStyle.body1.bold : FontStyle.body2.bold, { color: CommonColor.main_blue }]}>{bottom[0]?.ko}</Text>
                            <Text lineBreakMode='tail' numberOfLines={2} style={[isTablet ? FontStyle.body2.regular : FontStyle.label2.regular, { color: CommonColor.basic_gray_dark }]}>
                                {bottomDesc} 하의
                            </Text>
                        </View>
                    </View>
                </View>
                {isTablet && top[1] && bottom[1] && (
                    <View style={[styles.recomContainer, styles.tabletClothes, { marginTop: 20 }]}>
                        <View style={styles.recom}>
                            <Image source={top[1]?.path} style={styles.clothes} resizeMode='contain' />
                            <View style={styles.clothesDesc}>
                                <Text style={[isTablet ? FontStyle.body1.bold : FontStyle.body2.bold, { color: CommonColor.main_blue }]}>{top[1]?.ko}</Text>
                                <Text lineBreakMode='tail' numberOfLines={2} style={[isTablet ? FontStyle.body2.regular : FontStyle.label2.regular, { color: CommonColor.basic_gray_dark }]}>
                                    {topDesc} 상의
                                </Text>
                            </View>
                        </View>
                        <View style={styles.recom}>
                            <Image source={bottom[1]?.path} style={styles.clothes} resizeMode='contain' />
                            <View style={styles.clothesDesc}>
                                <Text style={[isTablet ? FontStyle.body1.bold : FontStyle.body2.bold, { color: CommonColor.main_blue }]}>{bottom[1]?.ko}</Text>
                                <Text lineBreakMode='tail' numberOfLines={2} style={[isTablet ? FontStyle.body2.regular : FontStyle.label2.regular, { color: CommonColor.basic_gray_dark }]}>
                                    {bottomDesc} 하의
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tabletClothes: {
        gap: 16,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    recomText: {
        marginBottom: isTablet ? 8 : 9
    },
    clothes: {
        flex: 1,
        width: "90%",
        height: "90%",
        margin: 10
    },
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
        // flex: 1 / 4,
        paddingVertical: 9,
        paddingHorizontal: 9,
        gap: 4,
        backgroundColor: CommonColor.main_white,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopWidth: 1,
        borderColor: CommonColor.basic_gray_light
        // justifyContent: "space-around"
    },
    recom: {
        flex: isTablet ? 1 : undefined,
        width: isTablet ? undefined : "100%",
        height: isTablet ? 230 : 186,
        borderRadius: 10,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderWidth: 1,
        borderColor: CommonColor.basic_gray_light
    },
    recomContainer: {
        gap: 8
    },
    charaterImage: {
        width: "100%",
        height: "100%",
        alignSelf: "center"
    },
    character: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "row",
        marginTop: isTablet ? 40 : 33,
        gap: isTablet ? 20 : 10
    }
})
