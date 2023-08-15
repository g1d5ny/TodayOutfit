import { memo, useEffect, useState } from "react"
import { CommonColor, MobileFont, TabletFont } from "../style/CommonStyle"
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { inputAddressState, isTablet, resultAdressListState } from "../store"
import { LocationPermissionModal } from "."
import Search from "../asset/icon/icon_search.svg"
import Location from "../asset/icon/icon_now_location.svg"
import TabletSearch from "../asset/icon/icon_tablet_search.svg"
import TabletLocation from "../asset/icon/icon_tablet_now_location.svg"
import { useRecoilState, useRecoilValue } from "recoil"
import useAddressHook from "../api"
import { isEmpty } from "lodash"

interface InputProps {
    isInput: boolean
    onPress?: () => void
}

const resultViewHeight = 62
export default memo(({ isInput, onPress }: InputProps) => {
    // const [loading, setLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(false)
    const [inputAddress, setInputAddress] = useRecoilState(inputAddressState)
    const [resultAddress, setResultAddress] = useRecoilState(resultAdressListState)
    const isNotFoundAddress = resultAddress && resultAddress[0] === "NOT_FOUND"
    const { SearchAddressFunction } = useAddressHook()

    const border = () => {
        if (isEmpty(inputAddress) || isEmpty(resultAddress)) {
            return { borderWidth: 0 }
        }
        if (isNotFoundAddress) {
            return { borderWidth: 2, borderColor: CommonColor.etc_red }
        }
        return { borderWidth: 2, borderColor: CommonColor.main_blue }
    }

    useEffect(() => {
        return () => {
            setInputAddress("")
            setResultAddress([])
        }
    }, [])

    return isInput ? (
        <View style={{ width: "100%", justifyContent: "space-between" }}>
            <View>
                <View style={[styles.input, border()]}>
                    {isTablet ? <TabletSearch /> : <Search />}
                    <TextInput
                        value={inputAddress}
                        onChangeText={value => setInputAddress(value)}
                        placeholder='예시: 서울특별시 중구'
                        placeholderTextColor={CommonColor.basic_gray_medium}
                        autoFocus
                        onSubmitEditing={SearchAddressFunction}
                        style={[isTablet ? TabletFont.body_2 : MobileFont.body_2, styles.textView]}
                    />
                    <TouchableOpacity onPress={() => setIsVisible(true)}>{isTablet ? <TabletLocation /> : <Location />}</TouchableOpacity>
                    {/* {loading ? <Loader style={{ marginTop: 100 }} /> : <></>} */}
                </View>
                {!isEmpty(resultAddress) ? (
                    isNotFoundAddress ? (
                        <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_2, { color: CommonColor.etc_red, marginTop: 6 }]}>올바르지 않은 주소입니다.</Text>
                    ) : (
                        <View style={{ marginTop: 6 }}>
                            <Text style={[isTablet ? TabletFont.detail_2 : MobileFont.detail_2, { color: CommonColor.main_blue }]}>'{inputAddress}' 검색 결과</Text>
                            <ScrollView style={{ maxHeight: isTablet ? resultViewHeight * 7 : resultViewHeight * 6, marginTop: isTablet ? 24 : 9 }}>
                                {resultAddress.map(({ address_name }, index) => {
                                    return (
                                        <TouchableOpacity key={index} style={styles.resultView}>
                                            <Text style={isTablet ? TabletFont.body_2 : MobileFont.body_2}>{address_name}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    )
                ) : (
                    <></>
                )}
            </View>
            <TouchableOpacity style={[styles.confirmButton, { backgroundColor: isNotFoundAddress ? CommonColor.etc_red : CommonColor.main_blue }]}>
                <Text style={[isTablet ? TabletFont.button_1 : MobileFont.button_1, { color: CommonColor.main_white }]}>확인</Text>
            </TouchableOpacity>
            {/* <LocationPermissionModal isVisible={isVisible} setIsVisible={setIsVisible} /> */}
        </View>
    ) : (
        <TouchableOpacity style={styles.textView} onPress={onPress}>
            <Text style={[styles.text, { color: CommonColor.basic_gray_medium }]}>예시: 서울특별시 중구</Text>
        </TouchableOpacity>
    )
})

export const styles = StyleSheet.create({
    confirmButton: {
        // flex: 1,
        width: "100%",
        height: isTablet ? 64 : 56,
        alignItems: "center",
        justifyContent: "center"
    },
    resultView: {
        width: "100%",
        borderLeftWidth: 2,
        borderColor: CommonColor.basic_gray_medium,
        backgroundColor: CommonColor.basic_gray_light,
        paddingVertical: 20,
        paddingLeft: 18,
        marginBottom: 2
    },
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
        paddingLeft: isTablet ? 24 : 18,
        paddingRight: isTablet ? 24 : 15,
        paddingVertical: isTablet ? 20 : 17,
        backgroundColor: CommonColor.basic_gray_light,
        flexDirection: "row",
        alignItems: "center"
    }
})
