import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CommonColor, MobileFont, TabletFont } from "../../style/CommonStyle"
import Man from "../../asset/icon/3d_gender_man.svg"
import Woman from "../../asset/icon/3d_gender_woman.svg"
import TabletMan from "../../asset/icon/3d_gender_man_tablet.svg"
import TabletWoman from "../../asset/icon/3d_gender_woman_tablet.svg"
import { useState } from "react"
import { isTablet, loggedInState, setStorage } from "../../store"
import { useSetRecoilState } from "recoil"

export const SelectGenderScreen = () => {
    const setIsLoggedIn = useSetRecoilState(loggedInState)
    const [gender, setGender] = useState<string | undefined>()

    const onPress = (gender: "man" | "woman") => {
        setGender(gender)
        setStorage("gender", gender)
        setIsLoggedIn(true)
        setStorage("loggedInState", true)
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
                <TouchableOpacity onPress={() => onPress("man")} style={[styles.gender, gender === "man" ? styles.checked : styles.unChecked]}>
                    {isTablet ? <TabletMan /> : <Man />}
                </TouchableOpacity>
                <View style={{ width: isTablet ? 24 : 14, height: isTablet ? 24 : 14 }} />
                <TouchableOpacity onPress={() => onPress("woman")} style={[styles.gender, gender === "woman" ? styles.checked : styles.unChecked]}>
                    {isTablet ? <TabletWoman /> : <Woman />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    checked: {
        padding: isTablet ? 30 : 15,
        borderWidth: 2,
        borderColor: CommonColor.main_blue,
        borderRadius: 15
    },
    unChecked: {
        padding: isTablet ? 30 : 15,
        borderWidth: 0,
        borderRadius: 15
    },
    gender: {
        borderRadius: isTablet ? 26 : 20,
        backgroundColor: CommonColor.basic_gray_light,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 17,
        paddingVertical: 19
    },
    genderContainer: {
        marginTop: isTablet ? 183 : 95,
        flexDirection: "row",
        alignItems: "center"
    },
    content: isTablet ? TabletFont.title_on_boarding : MobileFont.detail_2,
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
