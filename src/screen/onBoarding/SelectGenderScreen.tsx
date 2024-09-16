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
import { Guide } from "component/Guide"
import { OnBoardingText } from "text/OnBoardingText"
import { GENDER } from "type"

export const SelectGenderScreen = () => {
    const setIsLoggedIn = useSetRecoilState(loggedInState)
    const [gender, setGender] = useState<GENDER>()

    const onPress = (gender: GENDER) => {
        setGender(gender)
        setStorage("gender", gender)
        setIsLoggedIn(true)
        setStorage("loggedInState", true)
    }

    return (
        <View style={styles.container}>
            <Guide
                guideText={OnBoardingText.characterGuideText}
                title={OnBoardingText.characterTitle}
                subTitle={OnBoardingText.characterSubTitle}
                children={
                    <View style={styles.genderContainer}>
                        <View style={styles.genderView}>
                            <TouchableOpacity onPress={() => onPress("M")} style={styles.checkButton}>
                                {gender === "M" ? <Check /> : <UnCheck />}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onPress("M")} style={[styles.gender, gender === "M" ? styles.checked : styles.unChecked]}>
                                {isTablet ? <TabletMan /> : <Man />}
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: isTablet ? 24 : 14, height: isTablet ? 24 : 14 }} />
                        <View style={styles.genderView}>
                            <TouchableOpacity onPress={() => onPress("W")} style={styles.checkButton}>
                                {gender === "W" ? <Check /> : <UnCheck />}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onPress("W")} style={[styles.gender, gender === "W" ? styles.checked : styles.unChecked]}>
                                {isTablet ? <TabletWoman /> : <Woman />}
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />
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
        marginTop: isTablet ? 34 : 16,
        flexDirection: "row",
        alignItems: "center"
    },
    content: isTablet ? TabletFont.display_bold : MobileFont.label1_regular,
    title: isTablet ? TabletFont.display_bold : MobileFont.title1_bold,
    subtitle: isTablet ? TabletFont.body_2 : MobileFont.body_2,
    textContainer: {
        alignItems: "center",
        marginTop: isTablet ? 140 : 110
    },
    container: {
        flex: 1,
        paddingBottom: isTablet ? 60 : 30,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff"
    }
})
