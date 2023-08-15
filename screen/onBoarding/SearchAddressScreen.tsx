import { StyleSheet, Text, View } from "react-native"
import { CommonColor, MobileFont, TabletFont } from "../../style/CommonStyle"
import { inputAddressState, isTablet, resultAdressListState } from "../../store"
import { useRecoilState, useRecoilValue } from "recoil"
import SearchInput from "../../component/SearchInput"

export const SearchAddressScreen = ({ navigation }: { navigation: any }) => {
    const [inputAddress, setInputAddress] = useRecoilState(inputAddressState)

    return (
        <View style={styles.container}>
            <View style={[styles.textContainer]}>
                <Text style={[styles.subtitle, { color: CommonColor.main_blue }]}>위치 서비스</Text>
                <Text style={[styles.title, { marginTop: 20 }]}>정확한 날씨 정보를 위해</Text>
                <Text style={[styles.title]}>위치 서비스를 입력해주세요!</Text>
                <Text style={[styles.content, { marginTop: isTablet ? 12 : 10, color: CommonColor.basic_gray_dark }]}>상세주소를 제외한 행정구역까지만 입력해주세요.</Text>
            </View>
            <View style={styles.addressContainer}>
                <SearchInput isInput={true} />
            </View>
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
    text: isTablet ? TabletFont.body_2 : MobileFont.body_2,
    addressContainer: {
        width: "100%",
        marginTop: isTablet ? 47 : 40,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: isTablet ? 132 : 16
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
