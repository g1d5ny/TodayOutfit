import { Dispatch, SetStateAction, memo, useState } from "react"
import { CommonColor, FontStyle } from "../style/CommonStyle"
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
    autoFocus?: boolean
    isOnboarding?: boolean
    onFocus?: () => void
    onBlur?: () => void
}
export const SearchInput = memo(({ hasInput, autoFocus, isOnboarding = false, onFocus, onBlur, ...props }: IProps) => {
    const [inputAddress, setInputAddress] = useRecoilState(inputAddressState)
    const [resultAddress, setResultAddress] = useRecoilState(resultAdressListState)
    const isNotFoundAddress = resultAddress[0] === "NOT_FOUND"
    const [isVisible, setIsVisible] = useState(false)
    const [isOnFocus, setIsOnFocus] = useState(autoFocus)
    const { searchAddress } = useAddressHook()
    const { requestLocationPermission, checkLocationPermission, getUserLocation } = useUserLocationHook()

    const getLocation = async () => {
        await getUserLocation()
        if (isOnboarding) {
            navigationRef?.current?.navigate("SelectGenderScreen")
        }
        setInputAddress({ value: "", isEditing: false })
        setResultAddress([])
    }

    const onPressLocation = async () => {
        const checkP = await checkLocationPermission()
        if (checkP) {
            getLocation()
            return
        }
        const reqP = await requestLocationPermission()
        if (reqP) {
            getLocation()
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
                        value={inputAddress.value}
                        onChangeText={value => setInputAddress({ value, isEditing: true })}
                        placeholder='위치를 입력하세요'
                        placeholderTextColor={CommonColor.basic_gray_medium}
                        onFocus={() => {
                            setIsOnFocus(true)
                            onFocus && onFocus()
                        }}
                        onBlur={() => {
                            setIsOnFocus(false)
                            setInputAddress({ value: inputAddress.value, isEditing: false })
                            onBlur && onBlur()
                        }}
                        onSubmitEditing={searchAddress}
                        autoFocus={autoFocus}
                        style={[isTablet ? FontStyle.body1.regular : FontStyle.body2.regular, styles.textView, { paddingVertical: 0 }]}
                        {...props}
                    />
                ) : (
                    <Text
                        style={[isTablet ? FontStyle.body1.regular : FontStyle.body2.regular, styles.textView, { color: CommonColor.basic_gray_medium, paddingVertical: isTablet ? 20 : 17 }]}
                    >
                        위치를 입력하세요
                    </Text>
                )}
                <TouchableOpacity disabled={isOnFocus} onPress={onPressLocation}>
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
    textView: {
        flex: 1,
        height: "100%",
        marginLeft: isTablet ? 16 : 14
    },
    input: {
        width: "100%",
        height: isTablet ? 66 : 56,
        borderRadius: 6,
        paddingHorizontal: isTablet ? 24 : 18,
        backgroundColor: CommonColor.basic_gray_light,
        flexDirection: "row",
        alignItems: "center"
    }
})
