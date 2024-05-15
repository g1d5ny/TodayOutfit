import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "../../style/CommonStyle"
import { isTablet, resultAdressListState } from "../../store"
import { useRecoilValue } from "recoil"
import { SearchInput } from "../../component/SearchInput"
import { isEmpty } from "lodash"
import { useState } from "react"
import { useUserLocationHook } from "../../hook/useUserLocationHook"
import { LocationPermissionModal } from "../../component/LocationPermissionModal"
import { useAddressHook } from "../../hook/useAddressHook"
import { MY_ADDRSS } from "../../type"

const selectedAddressInitialValue = {
    id: "",
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
    const { checkOnlyLocationPermission, getUserLocation, addUserAddress } = useUserLocationHook()
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
            <KeyboardAvoidingView style={styles.flex} behavior={"padding"}>
                <View style={styles.container}>
                    <View style={[styles.textContainer]}>
                        <Text style={[styles.subtitle, { color: CommonColor.main_blue }]}>위치 서비스</Text>
                        <Text style={[styles.title, { marginTop: 20 }]}>정확한 날씨 정보를 위해</Text>
                        <Text style={[styles.title]}>위치 서비스를 {isEmpty(resultAddress) ? "입력" : "선택"}해주세요!</Text>
                        <Text style={[styles.content, { marginTop: isTablet ? 12 : 10, color: CommonColor.basic_gray_dark }]}>상세주소를 제외한 행정구역까지만 입력해주세요.</Text>
                    </View>
                    <View style={styles.addressContainer}>
                        <SearchInput
                            isInput={true}
                            getLocation={onPress}
                            isOnFocus={onFocus}
                            setIsOnFocus={setOnFocus}
                            selectedAddress={selectedAddress}
                            setSelectedAddress={setSelectedAddress}
                            autoFocus
                        />
                    </View>
                </View>
                <View style={{ justifyContent: "space-between" }}>
                    <View style={[CommonStyle.row, styles.phase]}>
                        <View style={styles.selectedPhase} />
                        <View style={styles.unSelectedPhase} />
                    </View>
                    {isEmpty(selectedAddress.location) ? (
                        <TouchableOpacity
                            disabled={isNotFoundAddress}
                            style={[styles.confirmButton, { backgroundColor: isNotFoundAddress ? CommonColor.basic_gray_medium : CommonColor.main_blue }]}
                            onPress={searchAddress}
                        >
                            <Text style={[isTablet ? TabletFont.button_1 : MobileFont.button_1, { color: "#fff" }]}>확인</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[styles.confirmButton, { backgroundColor: isNotFoundAddress ? CommonColor.basic_gray_medium : CommonColor.main_blue }]}
                            onPress={() => {
                                const { id, location, coordinate } = selectedAddress
                                addUserAddress({ id, location: location.trim(), coordinate })
                                navigate()
                            }}
                        >
                            <Text style={[isTablet ? TabletFont.button_1 : MobileFont.button_1, { color: "#fff" }]}>앱 구경하러 가기</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <LocationPermissionModal isVisible={isVisible} setIsVisible={setIsVisible} />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    phase: {
        alignSelf: "center",
        marginBottom: 20
    },
    unSelectedPhase: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 8,
        backgroundColor: CommonColor.basic_gray_medium
    },
    selectedPhase: {
        width: 50,
        height: 8,
        backgroundColor: CommonColor.main_blue,
        borderRadius: 5
    },
    confirmButton: {
        width: "100%",
        paddingVertical: isTablet ? 20 : 17,
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
    title: isTablet ? TabletFont.title_on_boarding : MobileFont.title_on_boarding,
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
    },
    flex: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between"
    }
})
