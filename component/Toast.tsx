import Toast from "react-native-toast-message"
import { CommonColor, MobileFont } from "../style/CommonStyle"
import { Text, View } from "react-native"

export const ToastComponent = () => {
    const toastConfig = {
        my_custom_type: ({}) => (
            <View
                style={{
                    maxWidth: 300,
                    height: 45,
                    backgroundColor: CommonColor.main_blue,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    borderRadius: 10,
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5
                }}
            >
                <View
                    style={{
                        width: "100%",
                        height: 43,
                        backgroundColor: CommonColor.main_white,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        borderRadius: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 13,
                        paddingBottom: 13
                    }}
                >
                    <Check />
                    <Text style={[MobileFont.detail_2, { marginLeft: 8, color: CommonColor.main_blue }]}>{text1}</Text>
                </View>
            </View>
        )
    }

    return <Toast config={toastConfig} visibilityTime={2500} />
}
