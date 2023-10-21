import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { CommonColor, MobileFont, TabletFont } from "../../style/CommonStyle"
import { isTablet, resultAdressListState } from "../../store"
import { useRecoilValue } from "recoil"
import SearchInput from "../../component/SearchInput"
import { isEmpty } from "lodash"
import { useState } from "react"
import { useLocationPermissionHook } from "../../hook/useLocationPermissionHook"
import { LocationPermissionModal } from "../../component/LocationPermissionModal"
import { useAddressHook } from "../../hook/useAddressHook"
import { MY_ADDRSS } from "../../type"

const selectedAddressInitialValue = {
    location: "",
    coordinate: {
        longitude: 0,
        latitude: 0
    }
}
export const SearchAddressScreen = ({ navigation }: { navigation: any }) => {
    const resultAddress = useRecoilValue(resultAdressListState)
    const [isVisible, setIsVisible] = useState(false)
    const [onFocus, setOnFocus] = useState(false)
    const isNotFoundAddress = resultAddress && resultAddress[0] === "NOT_FOUND"
    const [selectedAddress, setSelectedAddress] = useState<MY_ADDRSS>(selectedAddressInitialValue)
    const { checkOnlyLocationPermission, getUserLocation, setUserLocation } = useLocationPermissionHook()
    const { searchAddress } = useAddressHook()

    const onPress = async () => {
        const checkP = await checkOnlyLocationPermission()
        if (checkP) {
            getUserLocation().then(() => {
                navigate()
            })
            return
        }
        setIsVisible(true)
    }

    const navigate = () => {
        navigation.navigate("SelectGenderScreen")
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    justifyContent: "space-between"
                }}
                behavior={"padding"}
            >
                <View style={styles.container}>
                    <View style={[styles.textContainer]}>
                        <Text style={[styles.subtitle, { color: CommonColor.main_blue }]}>위치 서비스</Text>
                        <Text style={[styles.title, { marginTop: 20 }]}>정확한 날씨 정보를 위해</Text>
                        <Text style={[styles.title]}>위치 서비스를 {isEmpty(resultAddress) ? "입력" : "선택"}해주세요!</Text>
                        <Text style={[styles.content, { marginTop: isTablet ? 12 : 10, color: CommonColor.basic_gray_dark }]}>상세주소를 제외한 행정구역까지만 입력해주세요.</Text>
                    </View>
                    <View style={styles.addressContainer}>
                        <SearchInput isInput={true} onPress={onPress} onFocus={onFocus} setOnFocus={setOnFocus} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
                    </View>
                </View>
                {isEmpty(selectedAddress.location) ? (
                    <TouchableOpacity disabled={isNotFoundAddress} style={[styles.confirmButton, { backgroundColor: isNotFoundAddress ? CommonColor.basic_gray_medium : CommonColor.main_blue }]} onPress={searchAddress}>
                        <Text style={[isTablet ? TabletFont.button_1 : MobileFont.button_1, { color: "#fff" }]}>확인</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[styles.confirmButton, { paddingHorizontal: isTablet ? 132 : 16, backgroundColor: isNotFoundAddress ? CommonColor.basic_gray_medium : CommonColor.main_blue }]}
                        onPress={() => {
                            setUserLocation(selectedAddress.location.trim(), selectedAddress.coordinate)
                            navigate()
                        }}
                    >
                        <Text style={[isTablet ? TabletFont.button_1 : MobileFont.button_1, { color: "#fff" }]}>앱 구경하러 가기</Text>
                    </TouchableOpacity>
                )}
                <LocationPermissionModal isVisible={isVisible} setIsVisible={setIsVisible} />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    confirmButton: {
        width: "100%",
        height: isTablet ? 64 : 56,
        alignItems: "center",
        justifyContent: "center"
    },
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
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff"
    }
})
