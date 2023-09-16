import { atom, selector } from "recoil"
import { isEmpty } from "lodash"
import Storage from "@react-native-async-storage/async-storage"
import DeviceInfo from "react-native-device-info"
import { RESULT_ADDRESS, MY_ADDRSS, TOAST, CURRENT_WEATHER, HOUR_WEATHER, WEEKELY_WEATHER, WEATHER_DESC_KOR, WEATHER_DESC_ENG } from "../type"
import { setRecoil } from "recoil-nexus"
import Sunny from "../asset/icon/icon_sunny.svg"
import MaxSunny from "../asset/icon/3d_sunny.svg"
import Snow from "../asset/icon/icon_light_snow.svg"
import MaxSnow from "../asset/icon/3d_snowy.svg"
import PartyCloudyDay from "../asset/icon/icon_pary_cloudy_day.svg"
import MaxPartyCloudyDay from "../asset/icon/3d_partly_cloudy.svg"
import PartyCloudyNight from "../asset/icon/icon_party_cloudy_night.svg"
import MaxPartyCloudyNight from "../asset/icon/3d_partly_cloudy.svg"
import Cloudy from "../asset/icon/icon_cloudy_day.svg"
import MaxCloudy from "../asset/icon/3d_cloudy.svg"
import Rainy from "../asset/icon/icon_rain.svg"
import MaxRainy from "../asset/icon/3d_rainy.svg"
import Fog from "../asset/icon/icon_fog.svg"
import MaxFog from "../asset/icon/3d_thunder.svg"
import Moon from "../asset/icon/icon_moon.svg"
import MaxMoon from "../asset/icon/3d_sunny.svg"

export const isTablet = DeviceInfo.isTablet()

export const getStorage = (key: string): Promise<Record<string, any> | null> => {
    if (isEmpty(key)) {
        throw Error("item not found")
    }
    return new Promise((resolve, reject) => {
        Storage.getItem(key, async (err, result: any) => {
            if (err) {
                return reject(err)
            }
            if (result === null) {
                return resolve(null)
            }
            if (JSON.parse(result).expire) {
                const currentTime = Date.now()
                const expiredTime = JSON.parse(result).date + JSON.parse(result).expire
                if (currentTime > expiredTime) {
                    await Storage.removeItem(key)
                    return resolve(null)
                } else {
                    // console.log(key, " 현재 시간(ms)    : ", currentTime)
                    // console.log(key, " 만료 예정 시간(ms): ", expiredTime)
                }
            }
            resolve(JSON.parse(result))
        })
    })
}

export const setStorage = async (key: string, value: any, expire?: number) => {
    if (isEmpty(key)) {
        throw Error("item not found")
    }

    return new Promise((resolve, reject) => {
        if (expire) {
            value = { ...value, expire, date: Date.now() }
        }

        Storage.setItem(key, JSON.stringify(value), error => {
            if (error) {
                return reject(false)
            }
            resolve(true)
        })
    })
}

export const loggedInState = atom<Record<string, boolean> | boolean | null>({
    key: "loggedInState",
    default: selector({
        key: "loggedInState/default",
        get: async () => {
            const isLoggedIn = await getStorage("loggedInState")
            return isLoggedIn
        },
        cachePolicy_UNSTABLE: {
            eviction: "most-recent"
        }
    })
})

export const inputAddressState = atom<string>({
    key: "inputAddressState",
    default: ""
})

export const resultAdressListState = atom<[RESULT_ADDRESS] | [] | ["NOT_FOUND"]>({
    key: "resultAdressListState",
    default: []
})

export const toastState = atom<TOAST | undefined>({
    key: "toastState",
    default: undefined
})

export const setToast = (message: TOAST) => {
    setRecoil(toastState, message)
}

export const locationPermissionState = atom<Record<string, boolean> | null>({
    key: "locationPermissionState",
    default: selector({
        key: "locationPermissionState/default",
        get: async () => {
            const locationPermission = await getStorage("locationPermission")
            return locationPermission
        },
        cachePolicy_UNSTABLE: {
            eviction: "most-recent"
        }
    })
})

export const myAddressListState = atom<Record<string, MY_ADDRSS> | [MY_ADDRSS] | null>({
    key: "myAddressListState",
    default: selector({
        key: "myAddressListState/default",
        get: async () => {
            const myAddressList = await getStorage("myAddressList")
            return myAddressList
        },
        cachePolicy_UNSTABLE: {
            eviction: "most-recent"
        }
    })
})

export const currentWeatherInfoState = atom<CURRENT_WEATHER>({
    key: "currentWeatherInfoState",
    default: undefined
})

export const hourWeatherInfoState = atom<HOUR_WEATHER[]>({
    key: "hourWeatherInfoState",
    default: []
})

export const weeklyWeatherInfoState = atom<WEEKELY_WEATHER[]>({
    key: "weeklyWeatherInfoState",
    default: []
})

export const weatherDesc: { [key: string]: { minIcon: JSX.Element; maxIcon: JSX.Element; text: WEATHER_DESC_KOR; backgroundColor: string } } = {
    "clear-day": { minIcon: <Sunny />, maxIcon: <MaxSunny width={"100%"} height={"100%"} />, text: "맑음", backgroundColor: "rgb(255, 250, 226)" },
    snow: { minIcon: <Snow />, maxIcon: <MaxSnow width={"100%"} height={"100%"} />, text: "눈", backgroundColor: "rgb(230, 242, 253)" },
    "partly-cloudy-day": { minIcon: <PartyCloudyDay />, maxIcon: <MaxPartyCloudyDay width={"100%"} height={"100%"} />, text: "구름 조금", backgroundColor: "rgb(241, 243, 255)" },
    "partly-cloudy-night": { minIcon: <PartyCloudyNight />, maxIcon: <MaxPartyCloudyNight width={"100%"} height={"100%"} />, text: "구름 조금", backgroundColor: "rgb(241, 243, 255)" },
    cloudy: { minIcon: <Cloudy />, maxIcon: <MaxCloudy width={"100%"} height={"100%"} />, text: "흐림", backgroundColor: "rgb(241, 252, 255)" },
    rain: { minIcon: <Rainy />, maxIcon: <MaxRainy width={"100%"} height={"100%"} />, text: "비", backgroundColor: "rgb(239, 245, 245)" },
    fog: { minIcon: <Rainy />, maxIcon: <MaxRainy width={"100%"} height={"100%"} />, text: "안개", backgroundColor: "rgb(241, 252, 255)" },
    "clear-night": { minIcon: <Moon />, maxIcon: <MaxMoon width={"100%"} height={"100%"} />, text: "맑음 저녁", backgroundColor: "rgb(255, 250, 226)" }
}
