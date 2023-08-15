import { Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"
import AppName from "../asset/icon/icon_small_app_name.svg"
import Map from "../asset/icon/icon_modal_map.svg"
import Search from "../asset/icon/icon_search.svg"
import Location from "../asset/icon/icon_now_location.svg"
import TabletSearch from "../asset/icon/icon_tablet_search.svg"
import TabletLocation from "../asset/icon/icon_tablet_now_location.svg"
import { inputAddressState, isTablet, resultAdressListState, toastState } from "../store"
import { CommonColor, MobileFont, TabletFont } from "../style/CommonStyle"
import { useEffect, useState } from "react"
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil"
import Loader from "./lottie/Loader"
import Toast from "react-native-toast-message"

interface ModalProps {
    isVisible: boolean
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}
export const LocationPermissionModal = ({ isVisible, setIsVisible }: ModalProps) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)} useNativeDriver={true} hideModalContentWhileAnimating={true} style={{ alignItems: "center", justifyContent: "center" }}>
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
                            <Text style={[MobileFont.modal_text_1, { marginLeft: 5 }]}>에서는</Text>
                        </View>
                        <Text style={[MobileFont.modal_text_1]}>정확한 날씨 정보를 위해{"\n"}위치 접근 허용이 필요합니다.</Text>
                        <Text style={[MobileFont.detail_1, { color: CommonColor.main_blue, marginTop: 20, marginBottom: 14 }]}>• 선택적 접근 권한 이용내역</Text>
                        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                            <Text style={[MobileFont.detail_4]}>위치정보</Text>
                            <Text style={[MobileFont.detail_3, { marginLeft: 12 }]}>실시간 위치 정보에 기반한{"\n"}정확한 날씨 정보 및 콘텐츠 제공</Text>
                        </View>
                    </View>

                    <Text style={[MobileFont.modal_text_2, { color: CommonColor.basic_gray_dark, alignSelf: "center" }]}>동의하지 않으셔도 이용이 가능함을 알려드립니다.</Text>
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
                        Linking.openSettings()
                        setIsVisible(false)
                    }}
                >
                    <Text style={[MobileFont.heading, { color: CommonColor.main_white }]}>설정으로 가기</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

interface InputProps {
    isInput: boolean
    onPress?: () => void
    inputAddress?: string
    setInputAddress?: SetterOrUpdater<string>
    resultAddress?: any
}

// export const SearchInput = ({ isInput, onPress, inputAddress, setInputAddress, resultAddress }: InputProps) => {
//     const [loading, setLoading] = useState(true)
//     const [isVisible, setIsVisible] = useState(false)
//     const isNotFoundAddress = resultAddress && resultAddress[0] === "NOT_FOUND"

//     const border = () => {
//         if (resultAddress) {
//             return { boderWidth: 0 }
//         }
//         if (isNotFoundAddress) {
//             return { borderWidth: 2, borderColor: CommonColor.etc_red }
//         }
//         return { borderWidth: 2, borderColor: CommonColor.main_blue }
//     }

//     return isInput ? (
//         <View style={styles.input}>
//             {isTablet ? <TabletSearch /> : <Search />}
//             <TextInput
//                 value={inputAddress}
//                 onChangeText={value => setInputAddress && setInputAddress(value)}
//                 placeholder='예시: 서울특별시 중구'
//                 placeholderTextColor={CommonColor.basic_gray_medium}
//                 onSubmitEditing={SearchAddressFunction}
//                 // onSubmitEditing={() => console.log(inputAddress)}
//                 style={[isTablet ? TabletFont.body_2 : MobileFont.body_2, styles.textView, { borderWidth: resultAddress ? 2 : 0 }, border()]}
//             />
//             {resultAddress ? (
//                 isNotFoundAddress ? (
//                     <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_2, { color: CommonColor.etc_red }]}>올바르지 않은 주소입니다.</Text>
//                 ) : (
//                     <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_2, { color: CommonColor.main_blue }]}>'{inputAddress}' 검색 결과</Text>
//                 )
//             ) : (
//                 <></>
//             )}
//             <TouchableOpacity onPress={() => setIsVisible(true)}>{isTablet ? <TabletLocation /> : <Location />}</TouchableOpacity>
//             <LocationPermissionModal isVisible={isVisible} setIsVisible={setIsVisible} />
//             {/* {loading ? <Loader style={{ marginTop: 100 }} /> : <></>} */}
//         </View>
//     ) : (
//         <TouchableOpacity style={styles.textView} onPress={onPress}>
//             <Text style={[styles.text, { color: CommonColor.basic_gray_medium }]}>예시: 서울특별시 중구</Text>
//         </TouchableOpacity>
//     )
// }

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
                    <Text style={[MobileFont.detail_2, { marginLeft: 8, color: CommonColor.main_blue }]}>{toast?.message}</Text>
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

export const styles = StyleSheet.create({
    text: isTablet ? TabletFont.body_2 : MobileFont.body_2,
    textView: {
        flex: 1,
        marginLeft: 15,
        marginRight: 20
    },
    input: {
        width: "100%",
        height: isTablet ? 66 : 56,
        borderRadius: 6,
        paddingHorizontal: isTablet ? 24 : 18,
        paddingVertical: isTablet ? 20 : 17,
        backgroundColor: CommonColor.basic_gray_light,
        flexDirection: "row",
        alignItems: "center"
    }
})
