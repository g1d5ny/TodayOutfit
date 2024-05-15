import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "../../style/CommonStyle"
import Man from "../../asset/icon/3d/icon_3d_gender_man.svg"
import Woman from "../../asset/icon/3d/icon_3d_gender_woman.svg"
import TabletMan from "../../asset/icon/3d/icon_3d_gender_man_tablet.svg"
import TabletWoman from "../../asset/icon/3d/icon_3d_gender_woman_tablet.svg"
import Check from "asset/icon/icon_blue_check.svg"
import UnCheck from "asset/icon/icon_gray_check.svg"
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
            <View>
                <View style={[styles.textContainer]}>
                    <Text style={[styles.subtitle, { color: CommonColor.main_blue }]}>캐릭터 만들기</Text>
                    <Text style={[styles.title, { marginTop: 20 }]}>맞춤 코디를 대신 입어줄</Text>
                    <Text style={[styles.title]}>캐릭터를 선택해주세요!</Text>
                    <Text style={[styles.content, { marginTop: isTablet ? 12 : 10, color: CommonColor.basic_gray_dark }]}>이후 설정에서 언제든 변경 가능합니다.</Text>
                </View>
                <View style={styles.genderContainer}>
                    <View style={styles.genderView}>
                        <TouchableOpacity onPress={() => onPress("man")} style={styles.checkButton}>
                            {gender === "man" ? <Check /> : <UnCheck />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPress("man")} style={[styles.gender, gender === "man" ? styles.checked : styles.unChecked]}>
                            {isTablet ? <TabletMan /> : <Man />}
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: isTablet ? 24 : 14, height: isTablet ? 24 : 14 }} />
                    <View style={styles.genderView}>
                        <TouchableOpacity onPress={() => onPress("woman")} style={styles.checkButton}>
                            {gender === "woman" ? <Check /> : <UnCheck />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPress("woman")} style={[styles.gender, gender === "woman" ? styles.checked : styles.unChecked]}>
                            {isTablet ? <TabletWoman /> : <Woman />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={CommonStyle.row}>
                <View style={styles.unSelectedPhase} />
                <View style={styles.selectedPhase} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    checkButton: {
        marginBottom: 8
    },
    genderView: {
        alignItems: "center",
        justifyContent: "center"
    },
    unSelectedPhase: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: CommonColor.main_blue
    },
    selectedPhase: {
        width: 50,
        height: 8,
        marginLeft: 8,
        backgroundColor: CommonColor.main_blue,
        borderRadius: 5
    },
    checked: {
        padding: isTablet ? 30 : 15,
        borderWidth: 2,
        borderColor: CommonColor.main_blue,
        borderRadius: 15
    },
    unChecked: {
        padding: isTablet ? 30 : 15,
        borderWidth: 2,
        borderColor: "transparent",
        borderRadius: 15
    },
    gender: {
        borderRadius: isTablet ? 26 : 20,
        backgroundColor: CommonColor.basic_gray_light,
        alignItems: "center",
        justifyContent: "center",
        padding: 22
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
        justifyContent: "space-between",
        backgroundColor: "#fff"
    }
})
