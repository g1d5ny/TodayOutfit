import { Platform } from "react-native"
import { PERMISSIONS, requestMultiple } from "react-native-permissions"
import Geolocation from "react-native-geolocation-service"
import { useAddressHook } from "./useAddressHook"
import { isEmpty } from "lodash"
import { myAddressListState, setStorage } from "../store"
import { useRecoilStateLoadable } from "recoil"
import { DateFormat } from "../function"
import { MY_ADDRSS } from "../type"

export const useLocationPermissionHook = () => {
    const [{ contents: myAddress }, setMyAddress] = useRecoilStateLoadable(myAddressListState)
    const { coordinateToAddress } = useAddressHook()

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
                getNowLocation(longitude, latitude)
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
    const getNowLocation = (longitude: number, latitude: number) => {
        coordinateToAddress(longitude, latitude)
            .then((res: any) => {
                if (isEmpty(res.documents)) {
                    return
                }
                const { region_1depth_name, region_2depth_name, region_3depth_name } = res.documents[0].address
                const location = region_1depth_name + " " + region_2depth_name + " " + region_3depth_name
                const coordinate = { longitude, latitude }
                setUserLocation(location.trim(), coordinate)
            })
            .catch(rej => console.error(rej))
    }

    const setUserLocation = (location: string, coordinate: { longitude: number; latitude: number }) => {
        const myLocationFormat = { location, coordinate, date: DateFormat() } as MY_ADDRSS
        if (isEmpty(myAddress)) {
            setStorage("myAddressList", myLocationFormat)
            setMyAddress([myLocationFormat])
        } else {
            const locationList = [myAddress] as [MY_ADDRSS]
            locationList.unshift(myLocationFormat)
            setStorage("myAddressList", locationList)
            setMyAddress(locationList)
        }
    }

    return { checkOnlyLocationPermission, getUserLocation, setUserLocation }
}
