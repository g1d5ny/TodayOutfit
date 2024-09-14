import { Alert, Platform } from "react-native"
import { PERMISSIONS, requestMultiple } from "react-native-permissions"
import Geolocation from "react-native-geolocation-service"
import { isEmpty } from "lodash"
import { myAddressListState, setStorage } from "../store"
import { NowDate } from "../utils"
import { coordinateToAddressApi } from "api/address"
import { TextAlarm } from "text/AlarmText"
import { getRecoil, setRecoil } from "recoil-nexus"
import { MY_ADDRSS, DOCUMENT } from "type"

export const useUserLocationHook = () => {
    const checkOnlyLocationPermission = async () => {
        try {
            if (Platform.OS === "android") {
                const statuses = await requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION])
                return statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === "granted" || statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === "granted"
            } else {
                const statuses = await requestMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.LOCATION_ALWAYS])
                return statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === "granted" || statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === "granted"
            }
        } catch (err) {
            console.warn(err)
        }
    }

    const getUserLocation = async () => {
        Geolocation.getCurrentPosition(
            async ({ coords: { longitude, latitude } }) => {
                await getNowLocation(longitude, latitude)
            },
            error => {
                console.error(error)
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000
            }
        )
    }

    // 위도, 경도에 따른 지번, 도로명 주소 가져오기
    const getNowLocation = async (longitude: number, latitude: number) => {
        coordinateToAddressApi(longitude, latitude)
            .then(({ documents }: { documents: DOCUMENT[] }) => {
                if (isEmpty(documents)) {
                    return
                }
                const { region_1depth_name, region_2depth_name, region_3depth_name } = documents[0].address
                const location = region_1depth_name + " " + region_2depth_name + " " + region_3depth_name
                const coordinate = { longitude, latitude }
                const addedAddress = { id: String(coordinate), location: location.trim(), coordinate, date: NowDate() }
                addUserAddress(addedAddress)
            })
            .catch(rej => {
                Alert.alert(TextAlarm.error_0, rej)
                console.error(rej)
            })
    }

    const addUserAddress = async (addedAddress: MY_ADDRSS) => {
        const myAddress = await getRecoil(myAddressListState)

        // 내가 설정한 주소가 없으면
        if (isEmpty(myAddress)) {
            setStorage("myAddressList", [addedAddress])
            setRecoil(myAddressListState, [addedAddress])
            return
        }
        // userLocation에 이미 해당 주소가 있으면
        const newMyAddress = myAddress.filter(({ id }) => id !== addedAddress.id)
        newMyAddress.unshift(addedAddress)
        setStorage("myAddressList", newMyAddress)
        setRecoil(myAddressListState, newMyAddress)
    }

    const removeUserAddress = async (addedAddress: MY_ADDRSS) => {
        const myAddress = await getRecoil(myAddressListState)
        const hasAddress = myAddress.find(({ id }) => id === addedAddress.id)
        if (hasAddress) {
            const newMyAddress = myAddress.filter(({ id }) => id !== addedAddress.id)
            setStorage("myAddressList", newMyAddress)
            setRecoil(myAddressListState, newMyAddress)
        }
    }

    return { checkOnlyLocationPermission, getUserLocation, addUserAddress, removeUserAddress }
}
