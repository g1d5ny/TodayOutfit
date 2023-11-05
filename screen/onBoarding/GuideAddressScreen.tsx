import { StyleSheet, Text, View } from "react-native"
import { CommonColor, MobileFont, ShadowStyle, TabletFont } from "../../style/CommonStyle"
import { useState } from "react"
import { isTablet } from "../../store"
import GreenCheck from "../../asset/icon/icon_green_check.svg"
import X from "../../asset/icon/icon_x.svg"
import { LocationPermissionModal } from "../../component/LocationPermissionModal"
import SearchInput from "../../component/SearchInput"

export const GuideAddressScreen = ({ navigation, param }: { navigation: any; param?: any }) => {
    const [isVisible, setIsVisible] = useState(false)

    const onPress = async () => {
        navigation.navigate("SearchAddressScreen")
    }

    return (
        <View style={styles.container}>
            <View style={[styles.textContainer]}>
                <Text style={[styles.subtitle, { color: CommonColor.main_blue }]}>위치 서비스</Text>
                <Text style={[styles.title, { marginTop: 20 }]}>정확한 날씨 정보를 위해</Text>
                <Text style={[styles.title]}>위치 서비스를 입력해주세요!</Text>
                <Text style={[styles.content, { marginTop: isTablet ? 12 : 10, color: CommonColor.basic_gray_dark }]}>상세주소를 제외한 행정구역까지만 입력해주세요.</Text>
            </View>
            <View style={styles.addressContainer}>
                <SearchInput isInput={false} onPress={onPress} />
                <View style={styles.addressView}>
                    <View style={[styles.card, ShadowStyle]}>
                        <Text style={[isTablet ? TabletFont.body_1 : MobileFont.body_1, { color: CommonColor.main_blue }]}>서울특별시 중구</Text>
                        <View style={styles.icon}>
                            <GreenCheck width={isTablet ? 26 : 22} height={isTablet ? 26 : 22} />
                        </View>
                    </View>
                    <View style={[styles.card, ShadowStyle, { marginLeft: isTablet ? 25 : 20 }]}>
                        <Text style={MobileFont.body_2}>서울특별시 중구</Text>
                        <Text style={MobileFont.body_2}>00대로 000길</Text>
                        <View style={styles.icon}>
                            <X width={isTablet ? 26 : 22} height={isTablet ? 26 : 22} />
                        </View>
                    </View>
                </View>
            </View>
            <LocationPermissionModal isVisible={isVisible} setIsVisible={setIsVisible} />
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        position: "absolute",
        bottom: isTablet ? -13 : -13
    },
    card: {
        width: isTablet ? 174 : 152,
        height: isTablet ? 112 : 98,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    addressView: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: isTablet ? 24 : 32
    },
    textView: {
        flex: 1,
        marginLeft: 15,
        marginRight: 20
    },
    input: {
        width: "100%",
        height: isTablet ? 66 : 56,
        borderRadius: 6,
        paddingHorizontal: isTablet ? 24 : 18,
        paddingVertical: isTablet ? 20 : 17,
        backgroundColor: CommonColor.basic_gray_light,
        flexDirection: "row",
        alignItems: "center"
    },
    addressContainer: {
        width: "100%",
        marginTop: isTablet ? 47 : 40,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: isTablet ? 132 : 16
    },
    content: isTablet ? TabletFont.title_on_boarding : MobileFont.title_on_boarding,
    title: isTablet ? TabletFont.title_on_boarding : MobileFont.title_on_boarding,
    subtitle: isTablet ? TabletFont.body_2 : MobileFont.body_2,
    textContainer: {
        alignItems: "center",
        marginTop: isTablet ? 140 : 110
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff"
    }
})
