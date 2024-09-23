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

    const selectGender = (gender: GENDER) => {
        setGender(gender)
        setStorage("gender", gender)
    }

    const navigateMain = () => {
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
                    <View style={[CommonStyle.flex, CommonStyle.center, CommonStyle.spread]}>
                        <View style={styles.genderContainer}>
                            <View style={styles.genderView}>
                                <TouchableOpacity onPress={() => selectGender("M")} style={styles.checkButton}>
                                    {gender === "M" ? <Check width={isTablet ? 20 : 24} /> : <UnCheck width={isTablet ? 20 : 24} />}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => selectGender("M")} style={[styles.gender, gender === "M" ? styles.checked : styles.unChecked]}>
                                    {isTablet ? <TabletMan /> : <Man />}
                                </TouchableOpacity>
                            </View>
                            <View style={styles.genderView}>
                                <TouchableOpacity onPress={() => selectGender("W")} style={styles.checkButton}>
                                    {gender === "W" ? <Check width={isTablet ? 20 : 24} /> : <UnCheck width={isTablet ? 20 : 24} />}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => selectGender("W")} style={[styles.gender, gender === "W" ? styles.checked : styles.unChecked]}>
                                    {isTablet ? <TabletWoman /> : <Woman />}
                                </TouchableOpacity>
                            </View>
                        </View>
                        {gender ? (
                            <TouchableOpacity style={styles.confirmButton} onPress={navigateMain}>
                                <Text style={[isTablet ? TabletFont.title2_semi_bold2 : MobileFont.body1_bold, { color: CommonColor.main_white }]}>앱 구경하러 가기</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={CommonStyle.row}>
                                <View style={styles.unSelectedPhase} />
                                <View style={styles.selectedPhase} />
                            </View>
                        )}
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    confirmButton: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        borderRadius: 8,
        paddingVertical: isTablet ? 20 : 17,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: CommonColor.main_blue
    },
    checkButton: {
        marginBottom: 12
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
        paddingHorizontal: 22,
        paddingVertical: 16,
        borderWidth: 2
    },
    genderContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: isTablet ? 24 : 14
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
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingBottom: isTablet ? 60 : 28
    }
})
