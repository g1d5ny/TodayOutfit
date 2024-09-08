import { Dispatch, SetStateAction, memo, useState } from "react"
import { CommonColor, MobileFont, TabletFont } from "../style/CommonStyle"
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native"
import { inputAddressState, isTablet, resultAdressListState } from "../store"
import { LocationPermissionModal } from "./LocationPermissionModal"
import Search from "../asset/icon/icon_search.svg"
import FocusLocation from "../asset/icon/icon_focus_location.svg"
import FocusOffLocation from "../asset/icon/icon_focus_off_location.svg"
import { useRecoilState } from "recoil"
import { useAddressHook } from "../hook/useAddressHook"
import { useUserLocationHook } from "hook/useUserLocationHook"
import { navigationRef } from "navigation/RootNavigation"

const SEARCH_ICON = isTablet ? 24 : 20
const LOCATION_ICON = isTablet ? 26 : 22

interface IProps extends TextInputProps {
    hasInput: boolean
}
export const SearchInput = memo(({ hasInput, ...props }: IProps) => {
    const [inputAddress, setInputAddress] = useRecoilState(inputAddressState)
    const [resultAddress, setResultAddress] = useRecoilState(resultAdressListState)
    const isNotFoundAddress = resultAddress[0] === "NOT_FOUND"
    const [isVisible, setIsVisible] = useState(false)
    const [isOnFocus, setIsOnFocus] = useState(hasInput)
    const { searchAddress } = useAddressHook()
    const { checkOnlyLocationPermission, getUserLocation } = useUserLocationHook()

    const onPressLocation = async () => {
        const checkP = await checkOnlyLocationPermission()
        if (checkP) {
            getUserLocation().then(() => {
                navigationRef?.current?.navigate("SelectGenderScreen")
            })
            return
        }
        setIsVisible(true)
    }

    const border = () => {
        if (isOnFocus) {
            return { borderWidth: 2, borderColor: CommonColor.main_blue }
        }
        if (isNotFoundAddress) {
            return { borderWidth: 2, borderColor: CommonColor.etc_red }
        }
    }

    return (
        <View style={{ width: "100%" }}>
            <View style={[styles.input, border()]}>
                <Search width={SEARCH_ICON} height={SEARCH_ICON} />
                {hasInput ? (
                    <TextInput
                        value={inputAddress}
                        onChangeText={value => setInputAddress(value)}
                        placeholder='예시: 서울특별시 중구'
                        placeholderTextColor={CommonColor.basic_gray_medium}
                        onFocus={() => setIsOnFocus(true)}
                        onBlur={() => setIsOnFocus(false)}
                        onSubmitEditing={searchAddress}
                        autoFocus={hasInput}
                        style={[isTablet ? TabletFont.body_2 : MobileFont.body_2, styles.textView]}
                        {...props}
                    />
                ) : (
                    <Text style={[isTablet ? TabletFont.body_2 : MobileFont.body_2, styles.textView, { color: CommonColor.basic_gray_medium }]}>예시: 서울특별시 중구</Text>
                )}
                <TouchableOpacity onPress={onPressLocation}>
                    {isOnFocus ? <FocusOffLocation width={LOCATION_ICON} height={LOCATION_ICON} /> : <FocusLocation width={LOCATION_ICON} height={LOCATION_ICON} />}
                </TouchableOpacity>
            </View>
            <LocationPermissionModal isVisible={isVisible} setIsVisible={setIsVisible} />
        </View>
    )
})

export const styles = StyleSheet.create({
    confirmButton: {
        width: "100%",
        height: isTablet ? 64 : 56,
        alignItems: "center",
        justifyContent: "center"
    },
    resultView: {
        width: "100%",
        borderLeftWidth: 2,
        backgroundColor: CommonColor.basic_gray_light,
        paddingVertical: 20,
        paddingHorizontal: 18,
        marginBottom: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: isTablet ? TabletFont.body_2 : MobileFont.body_2,
    textView: {
        flex: 1,
        marginLeft: 15,
        marginRight: 20,
        paddingVertical: 0
    },
    input: {
        width: "100%",
        borderRadius: 6,
        paddingHorizontal: isTablet ? 24 : 18,
        paddingVertical: isTablet ? 20 : 17,
        backgroundColor: CommonColor.basic_gray_light,
        flexDirection: "row",
        alignItems: "center"
    }
})
