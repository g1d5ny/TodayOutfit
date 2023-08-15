import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CommonColor, MobileFont, TabletFont } from "../../style/CommonStyle"
import Man from "../../asset/icon/icon_man_3D.svg"
import Woman from "../../asset/icon/icon_woman_3D.svg"
import TabletMan from "../../asset/icon/icon_tablet_man_3D.svg"
import TabletWoman from "../../asset/icon/icon_tablet_woman_3D.svg"
import { useState } from "react"
import { isTablet, setStorage } from "../../store"

export const SelectGenderScreen = ({ navigation }: { navigation: any }) => {
    const [gender, setGender] = useState<string | undefined>()

    const onPress = (gender: "man" | "woman") => {
        setGender(gender)
        setStorage("gender", gender)
        navigation.navigate("GuideAddressScreen")
    }

    return (
        <View style={styles.container}>
            <View style={[styles.textContainer]}>
                <Text style={[styles.subtitle, { color: CommonColor.main_blue }]}>캐릭터 만들기</Text>
                <Text style={[styles.title, { marginTop: 20 }]}>맞춤 코디를 대신 입어줄</Text>
                <Text style={[styles.title]}>캐릭터를 선택해주세요!</Text>
                <Text style={[styles.content, { marginTop: isTablet ? 12 : 10, color: CommonColor.basic_gray_dark }]}>이후 설정에서 언제든 변경 가능합니다.</Text>
            </View>
            <View style={styles.genderContainer}>
                <TouchableOpacity onPress={() => onPress("man")} style={[gender === "man" ? styles.checked : styles.unChecked]}>
                    {isTablet ? <TabletMan /> : <Man />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPress("woman")} style={[gender === "woman" ? styles.checked : styles.unChecked]}>
                    {isTablet ? <TabletWoman /> : <Woman />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    checked: {
        padding: isTablet ? 30 : 15,
        backgroundColor: "#F6F7FF",
        borderWidth: 2,
        borderColor: CommonColor.main_blue,
        borderRadius: 15
    },
    unChecked: {
        padding: isTablet ? 30 : 15,
        backgroundColor: "transparent",
        borderWidth: 0,
        borderRadius: 15
    },
    genderContainer: {
        height: isTablet ? 280 : 174,
        marginTop: isTablet ? 183 : 95,
        flexDirection: "row",
        alignItems: "center"
    },
    content: isTablet ? TabletFont.title_on_boarding : MobileFont.detail_2,
    title: isTablet ? TabletFont.bold_on_boarding : MobileFont.bold_on_boarding,
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
