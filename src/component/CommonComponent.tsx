import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Back from "../asset/icon/icon_arrow_back.svg"
import { navigationRef } from "../navigation/RootNavigation"
import { MobileFont, TabletFont } from "../style/CommonStyle"
import { isTablet } from "../store"

export const Header = ({ text }: { text: string }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigationRef?.current?.goBack()}>
                <Back />
            </TouchableOpacity>
            <Text style={[isTablet ? TabletFont.button_1 : MobileFont.heading_1, { marginLeft: 20 }]}>{text}</Text>
        </View>
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
