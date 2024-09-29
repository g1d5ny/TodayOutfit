import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"
import AppName from "../asset/icon/icon_small_app_name.svg"
import Map from "../asset/icon/icon_modal_map.svg"
import { isTablet, setStorage, toastState } from "../store"
import { CommonColor, CommonStyle, FontStyle } from "../style/CommonStyle"
import { useEffect, useState } from "react"
import { useRecoilValue, useRecoilValueLoadable } from "recoil"
import Toast from "react-native-toast-message"
import { useUserLocationHook } from "../hook/useUserLocationHook"

interface ModalProps {
    isVisible: boolean
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}
export const LocationPermissionModal = ({ isVisible, setIsVisible }: ModalProps) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)} useNativeDriver={true} hideModalContentWhileAnimating={true} style={CommonStyle.center}>
            <View style={styles.modalView}>
                <View style={styles.topView}>
                    <View>
                        <View style={CommonStyle.row}>
                            <AppName width={isTablet ? 125 : 120} />
                            <Text style={[isTablet ? FontStyle.title1.bold : FontStyle.title2.semibold, { marginLeft: 5 }]}>에서는</Text>
                        </View>
                        <Text style={[isTablet ? FontStyle.title1.bold : FontStyle.title2.semibold]}>정확한 날씨 정보를 위해{"\n"}위치 접근 허용이 필요합니다.</Text>
                    </View>
                    <View>
                        <Text style={[isTablet ? FontStyle.body1.bold : FontStyle.label1.bold, { color: CommonColor.main_blue }]}>선택적 접근 권한 이용내역</Text>
                        <View style={styles.modalTextView}>
                            <Text style={[isTablet ? FontStyle.body2.bold : FontStyle.label2.bold, { color: CommonColor.basic_gray_dark }]}>위치정보</Text>
                            <Text style={[isTablet ? FontStyle.body2.regular : FontStyle.label2.reading_regular, { color: CommonColor.basic_gray_dark }]}>
                                실시간 위치 정보에 기반한{"\n"}정확한 날씨 정보 및 콘텐츠 제공
                            </Text>
                        </View>
                    </View>
                </View>
                {/* <View style={{ position: "absolute", bottom: 40, right: 0 }}>
                    <Map />
                </View> */}
                <TouchableOpacity
                    style={[CommonStyle.center, styles.settingButton]}
                    onPress={() => {
                        Linking.openSettings()
                        setIsVisible(false)
                    }}
                >
                    <Text style={[isTablet ? FontStyle.title2.semibold2 : FontStyle.body1.bold, { color: CommonColor.main_white }]}>설정으로 가기</Text>
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
                    <Text style={[FontStyle.label1.regular, { marginLeft: 8, color: CommonColor.main_blue }]}>{toast?.message}</Text>
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

const styles = StyleSheet.create({
    settingButton: {
        width: "100%",
        paddingVertical: isTablet ? 22 : 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: CommonColor.main_blue
    },
    modalTextView: {
        marginTop: isTablet ? 14 : 12,
        gap: isTablet ? 4 : 2
    },
    topView: {
        flex: 1,
        paddingLeft: isTablet ? 32 : 24,
        paddingTop: isTablet ? 40 : 32,
        paddingBottom: 58,
        gap: isTablet ? 27 : 22
    },
    modalView: {
        width: isTablet ? 392 : 316,
        height: isTablet ? 408 : 348,
        backgroundColor: CommonColor.main_white,
        justifyContent: "space-between",
        borderRadius: 25
    }
})
