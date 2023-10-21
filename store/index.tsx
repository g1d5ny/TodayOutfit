import { atom, selector } from "recoil"
import { isEmpty } from "lodash"
import Storage from "@react-native-async-storage/async-storage"
import DeviceInfo from "react-native-device-info"
import { RESULT_ADDRESS, MY_ADDRSS, TOAST, CURRENT_WEATHER, HOUR_WEATHER, WEEKELY_WEATHER, WEATHER_DESC_KOR, WEATHER_DESC_ENG, TODAY_WEATHER } from "../type"
import { setRecoil } from "recoil-nexus"
import ClearDay from "../asset/icon/icon_clear_day.svg"
import ClearNight from "../asset/icon/icon_clear_night.svg"
import MaxSunny from "../asset/icon/3d_sunny.svg"
import Snow from "../asset/icon/icon_light_snow.svg"
import MaxSnow from "../asset/icon/3d_snowy.svg"
import PartyCloudyDay from "../asset/icon/icon_party_cloudy_day.svg"
import PartyCloudyNight from "../asset/icon/icon_party_cloudy_night.svg"
import MaxPartyCloudyDay from "../asset/icon/3d_party_cloudy_day.svg"
import MaxPartyCloudyNight from "../asset/icon/3d_party_cloudy_night.svg"
import Cloudy from "../asset/icon/icon_cloudy_day.svg"
import MaxCloudy from "../asset/icon/3d_cloudy.svg"
import Rainy from "../asset/icon/icon_rain.svg"
import MaxRainy from "../asset/icon/3d_rainy.svg"
import Fog from "../asset/icon/icon_fog.svg"
import MaxFog from "../asset/icon/3d_fog.svg"
import MaxMoon from "../asset/icon/3d_moon.svg"
import Thunder from "../asset/icon/icon_thunder.svg"
import MaxThunder from "../asset/icon/3d_thunder.svg"

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

export const myAddressListState = atom<MY_ADDRSS[] | Record<string, MY_ADDRSS[]> | null>({
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

export const todayWeatherInfoState = atom<TODAY_WEATHER>({
    key: "todayWeatherInfoState",
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

// Four_Seasons
export type Clear = 1000 | 1003
export type Partly_Cloudy = 1006
export type Cloudy = 1009
export type Fog = 1030 | 1135 | 1147
export type Thunder = 1087 | 1273 | 1276

export type Four_Seasons = Clear | Partly_Cloudy | Cloudy | Fog | Thunder

// SummeryRain
export type Rain = 1063 | 1150 | 1180 | 1183 | 1186 | 1189 | 1192 | 1195 | 1246
export type Hail = 1072 | 1201 | 1198 | 1168 | 1171
export type Shower = 1240 | 1243 | 1249 | 1252

export type SummeryRain = Rain | Hail | Shower

// WintrySnow
export type Snow = 1066 | 1114 | 1117 | 1210 | 1213 | 1216 | 1219 | 1282
export type Sleet = 1069 | 1204 | 1207 | 1261 | 1237 | 1279 | 1264
export type Heavy_Snow = 1222 | 1225 | 1255 | 1258

export type WintrySnow = Snow | Sleet | Heavy_Snow

export type Weather = Four_Seasons | SummeryRain | WintrySnow

export const isClear = (code: number): code is Clear => {
    return code === 1000 || code === 1003
}

export const isPartyCloudy = (code: number): code is Partly_Cloudy => {
    return code === 1006
}

export const isCloudy = (code: number): code is Cloudy => {
    return code === 1009
}

export const isFog = (code: number): code is Fog => {
    return code === 1030 || code === 1135 || code === 1147
}

export const isThunder = (code: number): code is Thunder => {
    return code === 1087 || code === 1273 || code === 1276
}

export const isSummeryRain = (code: number): code is SummeryRain => {
    return isRain(code) || isHail(code) || isShower(code)
}

export const isRain = (code: number): code is Rain => {
    return code === 1063 || code === 1150 || code === 1180 || code === 1183 || code === 1186 || code === 1189 || code === 1192 || code === 1195 || code === 1246
}

export const isHail = (code: number): code is Hail => {
    return code === 1072 || code === 1201 || code === 1198 || code === 1168 || code === 1171
}

export const isShower = (code: number): code is Shower => {
    return code === 1240 || code === 1243 || code === 1249 || code === 1252
}

export const isWintrySnow = (code: number): code is WintrySnow => {
    return isSnow(code) || isSleet(code) || isHeavySnow(code)
}

export const isSnow = (code: number): code is Snow => {
    return code === 1066 || code === 1114 || code === 1117 || code === 1210 || code === 1213 || code === 1216 || code === 1219 || code === 1282
}

export const isSleet = (code: number): code is Sleet => {
    return code === 1069 || code === 1204 || code === 1207 || code === 1261 || code === 1237 || code === 1279 || code === 1264
}

export const isHeavySnow = (code: number): code is Heavy_Snow => {
    return code === 1222 || code === 1225 || code === 1255 || code === 1258
}

export const weatherIcon = (code: Weather, is_day: boolean) => {
    if (isClear(code)) {
        return is_day ? weatherDesc["clear-day"] : weatherDesc["clear-night"]
    }
    if (isPartyCloudy(code)) {
        return is_day ? weatherDesc["party-cloudy-day"] : weatherDesc["party-cloudy-night"]
    }
    // cloudy-night 데이터 교체 필요
    if (isCloudy(code)) {
        return is_day ? weatherDesc["cloudy-day"] : weatherDesc["cloudy-night"]
    }
    // fog-night 데이터 교체 필요
    if (isFog(code)) {
        return is_day ? weatherDesc["fog-day"] : weatherDesc["fog-night"]
    }
    if (isThunder(code)) {
        return weatherDesc["thunder"]
    }
    // rain-night 데이터 교체 필요
    if (isSummeryRain(code)) {
        return is_day ? weatherDesc["rain-day"] : weatherDesc["rain-night"]
    }
    if (isWintrySnow(code)) {
        return weatherDesc["snow"]
    }
}

export const weatherDesc: { [key: string]: { minIcon: JSX.Element; maxIcon: JSX.Element; text: WEATHER_DESC_KOR; backgroundColor: string } } = {
    "clear-day": { minIcon: <ClearDay />, maxIcon: <MaxSunny width={"100%"} height={"100%"} />, text: "맑음", backgroundColor: "rgb(252, 252, 221)" },
    "clear-night": { minIcon: <ClearNight />, maxIcon: <MaxMoon width={"100%"} height={"100%"} />, text: "맑음", backgroundColor: "rgb(201, 211, 246)" },
    snow: { minIcon: <Snow />, maxIcon: <MaxSnow width={"100%"} height={"100%"} />, text: "눈", backgroundColor: "rgb(230, 242, 253)" },
    "party-cloudy-day": { minIcon: <PartyCloudyDay />, maxIcon: <MaxPartyCloudyDay width={"100%"} height={"100%"} />, text: "구름 조금", backgroundColor: "rgb(241, 243, 255)" },
    "party-cloudy-night": { minIcon: <PartyCloudyNight />, maxIcon: <MaxPartyCloudyNight width={"100%"} height={"100%"} />, text: "구름 조금", backgroundColor: "rgb(241, 243, 255)" },
    "cloudy-day": { minIcon: <Cloudy />, maxIcon: <MaxCloudy width={"100%"} height={"100%"} />, text: "흐림", backgroundColor: "rgb(241, 252, 255)" },
    "cloudy-night": { minIcon: <Cloudy />, maxIcon: <MaxCloudy width={"100%"} height={"100%"} />, text: "흐림", backgroundColor: "rgb(241, 252, 255)" },
    "rain-day": { minIcon: <Rainy />, maxIcon: <MaxRainy width={"100%"} height={"100%"} />, text: "비", backgroundColor: "rgb(239, 245, 245)" },
    "rain-night": { minIcon: <Rainy />, maxIcon: <MaxRainy width={"100%"} height={"100%"} />, text: "비", backgroundColor: "rgb(239, 245, 245)" },
    "fog-day": { minIcon: <Fog />, maxIcon: <MaxFog width={"100%"} height={"100%"} />, text: "안개", backgroundColor: "rgb(230, 242, 253)" },
    "fog-night": { minIcon: <Fog />, maxIcon: <MaxFog width={"100%"} height={"100%"} />, text: "안개", backgroundColor: "rgb(230, 242, 253)" },
    thunder: { minIcon: <Thunder />, maxIcon: <MaxThunder width={"100%"} height={"100%"} />, text: "천둥 번개", backgroundColor: "rgb(228, 230, 242)" }
}
