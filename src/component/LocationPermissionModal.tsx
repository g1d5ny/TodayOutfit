import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"
import AppName from "../asset/icon/icon_small_app_name.svg"
import Map from "../asset/icon/icon_modal_map.svg"
import { isTablet, locationPermissionState, setStorage, toastState } from "../store"
import { CommonColor, MobileFont, TabletFont } from "../style/CommonStyle"
import { useEffect, useState } from "react"
import { useRecoilValue, useRecoilValueLoadable } from "recoil"
import Toast from "react-native-toast-message"
import { useUserLocationHook } from "../hook/useUserLocationHook"

interface ModalProps {
    isVisible: boolean
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}
export const LocationPermissionModal = ({ isVisible, setIsVisible }: ModalProps) => {
    const { contents: locationPermission } = useRecoilValueLoadable(locationPermissionState)
    const { checkOnlyLocationPermission, getUserLocation } = useUserLocationHook()

    const checkLocationPermission = async () => {
        if (locationPermission === null) {
            const checkP = await checkOnlyLocationPermission()
            if (checkP) {
                getUserLocation()
                setStorage("locationPermission", String(checkP))
            }
        }
        if (locationPermission === "false") {
            Linking.openSettings()
            return
        }
    }

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={() => setIsVisible(false)}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            style={{ alignItems: "center", justifyContent: "center" }}
        >
            <View
                style={{
                    width: 312,
                    height: 339,
                    backgroundColor: CommonColor.main_white,
                    justifyContent: "space-between",
                    borderRadius: 20
                }}
            >
                <View style={{ flex: 1, justifyContent: "space-between", paddingLeft: 20, paddingTop: 40, marginBottom: 8 }}>
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                            <AppName />
                            <Text style={[isTablet ? TabletFont.title2_semi_bold : MobileFont.mobile_title, { marginLeft: 5 }]}>에서는</Text>
                        </View>
                        <Text style={[isTablet ? TabletFont.title2_semi_bold : MobileFont.mobile_title]}>정확한 날씨 정보를 위해{"\n"}위치 접근 허용이 필요합니다.</Text>
                        <Text style={[MobileFont.label1_bold, { color: CommonColor.main_blue, marginTop: 20, marginBottom: 14 }]}>• 선택적 접근 권한 이용내역</Text>
                        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                            <Text style={[isTablet ? TabletFont.label2_bold : MobileFont.label2_bold]}>위치정보</Text>
                            <Text style={[MobileFont.label2_regular, { marginLeft: 12 }]}>실시간 위치 정보에 기반한{"\n"}정확한 날씨 정보 및 콘텐츠 제공</Text>
                        </View>
                    </View>
                    <Text style={[isTablet ? TabletFont.caption1_regular : MobileFont.caption1_regular, { color: CommonColor.basic_gray_dark, alignSelf: "center" }]}>
                        동의하지 않으셔도 이용이 가능함을 알려드립니다.
                    </Text>
                </View>
                <View style={{ position: "absolute", bottom: 40, right: 0 }}>
                    <Map />
                </View>
                <TouchableOpacity
                    style={{
                        width: "100%",
                        height: 60,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        backgroundColor: CommonColor.main_blue,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onPress={() => {
                        checkLocationPermission()
                        setIsVisible(false)
                    }}
                >
                    <Text style={[MobileFont.title2_regular, { color: CommonColor.main_white }]}>설정하러 가기</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export const ToastComponent = () => {
    const toast = useRecoilValue(toastState)
    const [visible, setVisible] = useState<boolean>(false)

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
                    {/* <Check /> */}
                    <Text style={[MobileFont.label1_regular, { marginLeft: 8, color: CommonColor.main_blue }]}>{toast?.message}</Text>
                </View>
            </View>
        )
    }

    useEffect(() => {
        if (toast && !visible) {
            setVisible(true)
        }
    }, [toast])

    return <Toast config={toastConfig} visibilityTime={toast?.duration ?? 1000} />
}
