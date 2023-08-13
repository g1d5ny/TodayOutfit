import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CommonColor, MobileFont, TabletFont } from "../../style/CommonStyle"
import DeviceInfo from "react-native-device-info"
import Man from "../../asset/icon/icon_man_3D.svg"
import Woman from "../../asset/icon/icon_woman_3D.svg"
import TabletMan from "../../asset/icon/icon_tablet_man_3D.svg"
import TabletWoman from "../../asset/icon/icon_tablet_woman_3D.svg"
import { useState } from "react"
import { setStorage } from "../../store"

export const SelectGenderScreen = () => {
    const [gender, setGender] = useState<string | undefined>()

    return (
        <View style={styles.container}>
            <View style={[styles.textContainer]}>
                <Text style={[styles.subtitle, { color: CommonColor.main_blue }]}>캐릭터 만들기</Text>
                <Text style={[styles.title, { marginTop: 20 }]}>맞춤 코디를 대신 입어줄{"\n"}캐릭터를 선택해주세요!</Text>
                <Text style={[styles.content, { marginTop: isTablet ? 12 : 10, color: CommonColor.basic_gray_dark }]}>이후 설정에서 언제든 변경 가능합니다.</Text>
            </View>
            <View style={styles.genderContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setGender("man")
                        setStorage("gender", "man")
                    }}
                    style={[gender === "man" ? styles.checked : styles.unChecked]}
                >
                    {isTablet ? <TabletMan /> : <Man />}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setGender("woman")
                        setStorage("gender", "woman")
                    }}
                    style={[gender === "woman" ? styles.checked : styles.unChecked]}
                >
                    {isTablet ? <TabletWoman /> : <Woman />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const isTablet = DeviceInfo.isTablet()
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
    content: isTablet ? TabletFont.header : MobileFont.detail_2,
    title: isTablet ? TabletFont.bold_on_boarding : MobileFont.bold_on_boarding,
    subtitle: isTablet ? TabletFont.body_2 : MobileFont.body_2,
    textContainer: {
        alignItems: "center",
        marginTop: isTablet ? 96 : 66
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff"
    }
})
