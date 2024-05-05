import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { isTablet } from "../../store"
import Back from "../../asset/icon/icon_arrow_back.svg"
import { MobileFont, TabletFont } from "../../style/CommonStyle"

export default ({ navigation, route }: { navigation: any; route: any }) => {
    const Header = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Back />
                </TouchableOpacity>
                <Text style={[isTablet ? TabletFont.button_1 : MobileFont.heading_1, { marginLeft: 20 }]}>기상정보에 관하여</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header />

            <View key='1'>
                <Text>First page</Text>
            </View>
            <View key='2'>
                <Text>Second page</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        paddingHorizontal: isTablet ? 32 : 16,
        paddingVertical: isTablet ? 14 : 13,
        flexDirection: "row",
        alignItems: "center"
    }
})
