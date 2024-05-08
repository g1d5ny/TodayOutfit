import { atom, selector } from "recoil"
import { isEmpty } from "lodash"
import Storage from "@react-native-async-storage/async-storage"
import DeviceInfo from "react-native-device-info"
import { RESULT_ADDRESS, MY_ADDRSS, TOAST, CURRENT_WEATHER, HOUR_WEATHER, WEEKELY_WEATHER, WEATHER_DESC_KOR, TODAY_WEATHER } from "../type"
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
import CloudyDay from "../asset/icon/icon_cloudy_day.svg"
import CloudyNight from "../asset/icon/icon_cloudy_night.svg"
import MaxCloudy from "../asset/icon/3d_cloudy.svg"
import RainyDay from "../asset/icon/icon_rain_day.svg"
import RainyNight from "../asset/icon/icon_rain_night.svg"
import MaxRainy from "../asset/icon/3d_rainy.svg"
import FogNight from "../asset/icon/icon_fog_night.svg"
import FogDay from "../asset/icon/icon_fog_day.svg"
import MaxFog from "../asset/icon/3d_fog.svg"
import MaxMoon from "../asset/icon/3d_moon.svg"
import Thunder from "../asset/icon/icon_thunder.svg"
import MaxThunder from "../asset/icon/3d_thunder.svg"
import UV1 from "../asset/icon/uv_index/icon_uv_index_1.svg"
import UV2 from "../asset/icon/uv_index/icon_uv_index_2.svg"
import UV3 from "../asset/icon/uv_index/icon_uv_index_3.svg"
import UV4 from "../asset/icon/uv_index/icon_uv_index_4.svg"
import UV5 from "../asset/icon/uv_index/icon_uv_index_5.svg"
import SW from "../asset/icon/wind_direction/icon_wind_direction_1.svg"
import SE from "../asset/icon/wind_direction/icon_wind_direction_2.svg"
import NE from "../asset/icon/wind_direction/icon_wind_direction_3.svg"
import NW from "../asset/icon/wind_direction/icon_wind_direction_4.svg"
import S from "../asset/icon/wind_direction/icon_wind_direction_5.svg"
import E from "../asset/icon/wind_direction/icon_wind_direction_6.svg"
import W from "../asset/icon/wind_direction/icon_wind_direction_7.svg"
import N from "../asset/icon/wind_direction/icon_wind_direction_8.svg"
import WindSpeed1 from "../asset/icon/wind_speed/icon_wind_speed_1.svg"
import WindSpeed2 from "../asset/icon/wind_speed/icon_wind_speed_2.svg"
import WindSpeed3 from "../asset/icon/wind_speed/icon_wind_speed_3.svg"
import WindSpeed4 from "../asset/icon/wind_speed/icon_wind_speed_4.svg"
import WindSpeed5 from "../asset/icon/wind_speed/icon_wind_speed_5.svg"
import WindSpeed6 from "../asset/icon/wind_speed/icon_wind_speed_6.svg"
import WindSpeed7 from "../asset/icon/wind_speed/icon_wind_speed_7.svg"
import WindSpeed8 from "../asset/icon/wind_speed/icon_wind_speed_8.svg"
import WindSpeed9 from "../asset/icon/wind_speed/icon_wind_speed_9.svg"
import WindSpeed10 from "../asset/icon/wind_speed/icon_wind_speed_10.svg"
import Precip1 from "../asset/icon/rain_percentage/icon_rain_percentage_1.svg"
import Precip2 from "../asset/icon/rain_percentage/icon_rain_percentage_2.svg"
import Precip3 from "../asset/icon/rain_percentage/icon_rain_percentage_3.svg"
import Precip4 from "../asset/icon/rain_percentage/icon_rain_percentage_4.svg"
import Precip5 from "../asset/icon/rain_percentage/icon_rain_percentage_5.svg"
import Precip6 from "../asset/icon/rain_percentage/icon_rain_percentage_6.svg"
import Precip7 from "../asset/icon/rain_percentage/icon_rain_percentage_7.svg"
import Precip8 from "../asset/icon/rain_percentage/icon_rain_percentage_8.svg"
import Precip9 from "../asset/icon/rain_percentage/icon_rain_percentage_9.svg"
import Precip10 from "../asset/icon/rain_percentage/icon_rain_percentage_10.svg"
import Precip11 from "../asset/icon/rain_percentage/icon_rain_percentage_11.svg"
import Humidity1 from "../asset/icon/humidity/icon_humidity_1.svg"
import Humidity2 from "../asset/icon/humidity/icon_humidity_2.svg"
import Humidity3 from "../asset/icon/humidity/icon_humidity_3.svg"
import Humidity4 from "../asset/icon/humidity/icon_humidity_4.svg"
import Humidity5 from "../asset/icon/humidity/icon_humidity_5.svg"
import Humidity6 from "../asset/icon/humidity/icon_humidity_6.svg"
import FeelsLike1 from "../asset/icon/feels_like/icon_feels_like_1.svg"
import FeelsLike2 from "../asset/icon/feels_like/icon_feels_like_2.svg"
import FeelsLike3 from "../asset/icon/feels_like/icon_feels_like_3.svg"
import FeelsLike4 from "../asset/icon/feels_like/icon_feels_like_4.svg"
import FeelsLike5 from "../asset/icon/feels_like/icon_feels_like_5.svg"
import FeelsLike6 from "../asset/icon/feels_like/icon_feels_like_6.svg"
import FeelsLike7 from "../asset/icon/feels_like/icon_feels_like_7.svg"
import FeelsLike8 from "../asset/icon/feels_like/icon_feels_like_8.svg"
import FeelsLike9 from "../asset/icon/feels_like/icon_feels_like_9.svg"
import FeelsLike10 from "../asset/icon/feels_like/icon_feels_like_10.svg"
import SnowFall1 from "../asset/icon/snow_fall/icon_snow_fall_1.svg"
import SnowFall2 from "../asset/icon/snow_fall/icon_snow_fall_2.svg"
import SnowFall3 from "../asset/icon/snow_fall/icon_snow_fall_3.svg"
import SnowFall4 from "../asset/icon/snow_fall/icon_snow_fall_4.svg"

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
export type Rain = 1063 | 1150 | 1153 | 1180 | 1183 | 1186 | 1189 | 1192 | 1195 | 1246
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
    return code === 1063 || code === 1150 || code === 1153 || code === 1180 || code === 1183 || code === 1186 || code === 1189 || code === 1192 || code === 1195 || code === 1246
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
    if (isCloudy(code)) {
        return is_day ? weatherDesc["cloudy-day"] : weatherDesc["cloudy-night"]
    }
    if (isFog(code)) {
        return is_day ? weatherDesc["fog-day"] : weatherDesc["fog-night"]
    }
    if (isThunder(code)) {
        return weatherDesc["thunder"]
    }
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
    "cloudy-day": { minIcon: <CloudyDay />, maxIcon: <MaxCloudy width={"100%"} height={"100%"} />, text: "흐림", backgroundColor: "rgb(241, 252, 255)" },
    "cloudy-night": { minIcon: <CloudyNight />, maxIcon: <MaxCloudy width={"100%"} height={"100%"} />, text: "흐림", backgroundColor: "rgb(241, 252, 255)" },
    "rain-day": { minIcon: <RainyDay />, maxIcon: <MaxRainy width={"100%"} height={"100%"} />, text: "비", backgroundColor: "rgb(239, 245, 245)" },
    "rain-night": { minIcon: <RainyNight />, maxIcon: <MaxRainy width={"100%"} height={"100%"} />, text: "비", backgroundColor: "rgb(239, 245, 245)" },
    "fog-day": { minIcon: <FogDay />, maxIcon: <MaxFog width={"100%"} height={"100%"} />, text: "안개", backgroundColor: "rgb(230, 242, 253)" },
    "fog-night": { minIcon: <FogNight />, maxIcon: <MaxFog width={"100%"} height={"100%"} />, text: "안개", backgroundColor: "rgb(230, 242, 253)" },
    thunder: { minIcon: <Thunder />, maxIcon: <MaxThunder width={"100%"} height={"100%"} />, text: "천둥 번개", backgroundColor: "rgb(228, 230, 242)" }
}

export const UV = [
    {
        text: "위험",
        content: "피부 화상을 입을 수 있어 가능한 실내에 머물러야합니다.",
        desc: ["햇볕에 노출 시 수십 분 이내에도 피부 화상을 입을 수 있어 가장 위험합니다.", "가능한 실내에 머물러야 합니다.", "외출 시 긴 소매 옷, 선글라스 이용을 권장합니다."],
        icon: <UV5 />,
        range: "11~"
    },
    {
        text: "매우 높음",
        content: "자외선 차단제를 정기적으로 발라야 합니다.",
        desc: ["햇볕에 노출 시 수십 분 이내에도 피부 화상을 입을 수 있어 매우 위험합니다.", "오전 10시부터 오후 3시까지 외출을 피하고 실내나 그늘에 머물러야 합니다.", "외출 시 긴 소매 옷, 선글라스 착용을 권장합니다."],
        icon: <UV4 />,
        range: "8~10"
    },
    { text: "높음", content: "자외선 차단제를 정기적으로 발라야 합니다.", desc: ["햇볕에 노출 시 1~2시간 이내에도 피부 화상을 입을 수 있어 가장 위험합니다.", "한낮에는 그늘에 머무르는 것을 권장 합니다."], icon: <UV3 />, range: "6~7" },
    {
        text: "보통",
        content: "자외선 차단제를 바르는 것을 권장합니다.",
        desc: ["2~3시간 햇볕에 노출 시에  피부 화상을 입을 수 있습니다."],
        icon: <UV2 />,
        range: "3~5"
    },
    {
        text: "낮음",
        content: "햇볕 노출에 대한 보호조치가 필요하지 않은 정도의 낮은 수준입니다.",
        desc: ["햇볕 노출에 대한 보호조치가 필요하지 않습니다.", "그러나 햇볕에 민감한 피부를 가진 사람은 자외선 차단제를 발라야 합니다."],
        icon: <UV1 />,
        range: "~2"
    }
]

export const WindDirection = [
    { text: "남서풍", content: "남서쪽으로 바람이 붑니다.", icon: <SW /> },
    { text: "남동풍", content: "남동쪽으로 바람이 붑니다.", icon: <SE /> },
    { text: "북동풍", content: "북동쪽으로 바람이 붑니다.", icon: <NE /> },
    { text: "북서풍", content: "북서쪽으로 바람이 붑니다.", icon: <NW /> },
    { text: "남풍", content: "남쪽으로 바람이 붑니다.", icon: <S /> },
    { text: "동풍", content: "동쪽으로 바람이 붑니다.", icon: <E /> },
    { text: "서풍", content: "서쪽으로 바람이 붑니다.", icon: <W /> },
    { text: "북풍", content: "북쪽으로 바람이 붑니다.", icon: <N /> }
]

export const RainPercentage = (precip: number) => [
    { text: precip + "%", content: "강수 확률이 없습니다.", icon: <Precip1 /> },
    { text: precip + "%", content: "강수 확률이 매우 낮습니다.", icon: <Precip2 /> },
    { text: precip + "%", content: "강수 확률이 낮습니다.", icon: <Precip3 /> },
    { text: precip + "%", content: "강수 확률이 낮습니다.", icon: <Precip4 /> },
    { text: precip + "%", content: "강수 확률이 있어 우산 휴대를 권장합니다.", icon: <Precip5 /> },
    { text: precip + "%", content: "강수 확률이 있어 우산 휴대를 권장합니다.", icon: <Precip6 /> },
    { text: precip + "%", content: "강수 확률이 높아 우산 휴대를 권장합니다.", icon: <Precip7 /> },
    { text: precip + "%", content: "강수 확률이 높아 우산 휴대를 권장합니다.", icon: <Precip8 /> },
    { text: precip + "%", content: "강수 확률이 매우 높아 우산 휴대가 필요합니다.", icon: <Precip9 /> },
    { text: precip + "%", content: "강수 확률이 매우 높아 우산 휴대가 필요합니다.", icon: <Precip10 /> },
    { text: precip + "%", content: "강수 확률이 매우 높아 우산  휴대가 필수입니다", icon: <Precip11 /> }
]

export const WindSpeed = [
    { text: "고요", content: "바람이 불지 않는 고요한 상태가 예상됩니다.", desc: "연기가 수직으로 올라가는 정도로 바람이 없는 수준", icon: <WindSpeed1 />, range: "0~0.02" },
    { text: "실바람", content: "풍향은 연기가 날리는 것으로 알 수 있으나, 풍향계가 움직이지 않는 정도", desc: "풍향은 연기가 날리는 것으로 알 수 있으나, 풍향계가 움직이지 않는 정도", icon: <WindSpeed2 />, range: "0.3~1.5" },
    { text: "남실바람", content: "가벼운 바람이 얼굴에 느껴지며 나뭇잎이 흔들리는 정도", desc: "가벼운 바람이 얼굴에 느껴지며 나뭇잎이 흔들리는 정도", icon: <WindSpeed3 />, range: "1.6~3.3" },
    { text: "산들바람", content: "나뭇잎과 가는 가지가 끊임없이 흔들리고 깃발이 가볍게 날리는 정도", desc: "나뭇잎과 가는 가지가 끊임없이 흔들리고 깃발이 가볍게 날리는 정도", icon: <WindSpeed4 />, range: "3.4~5.4" },
    { text: "건들바람", content: "나무 가지가 흔들리는 정도의 중간바람이 예상됩니다.", desc: "먼지가 일고 종잇조각이 날리며 작은 가지가 흔들리는 정도", icon: <WindSpeed5 />, range: "5.5~7.9" },
    { text: "흔들바람", content: "작은 나무가 흔들리는 정도의 중간바람이 예상됩니다.", desc: "잎이 무성한 작은 나무 전체가 흔들리고 호수에 물결이 일어나는 정도", icon: <WindSpeed6 />, range: "8.0~10.7" },
    { text: "된바람", content: "우산을 들기가 곤란한 정도의 강한바람이 예상됩니다.", desc: "큰 나뭇가지가 흔들리고 전선이 울리며 우산을 들기가 곤란한 정도", icon: <WindSpeed7 />, range: "10.8~13.8" },
    { text: "센바람", content: "바람을 마주해 걷기 힘든 강한바람이 예상됩니다.", desc: "나무 전체가 흔들려 바람을 마주하여 걷기 힘들 정도", icon: <WindSpeed8 />, range: "13.9~17.1" },
    { text: "큰바람", content: "나무가지가 꺾이는 아주 큰 바람이 예상됩니다.", desc: "작은 나뭇가지가 꺾이며, 바람을 마주하여 걷기 힘들 정도", icon: <WindSpeed9 />, range: "17.2~20.7" },
    { text: "큰센바람", content: "가옥에 손해가 있을 정도의태풍급 바람이 예상됩니다.", desc: "가옥에 다소 손해가 있을 정도로 굴뚝이 넘어지고 기와가 벗겨짐", icon: <WindSpeed10 />, range: "20.8~" }
]

export const Humidity = (humidity: number) => [
    { text: humidity + "%", content: "매우 건조한 상태로 호흡기 환자는 주의해야합니다.", icon: <Humidity1 /> },
    { text: humidity + "%", content: "건조한 상태로 주의가 필요합니다.", icon: <Humidity2 /> },
    { text: humidity + "%", content: "다소 건조함을 느낄 수 있는 정도 입니다.", icon: <Humidity3 /> },
    { text: humidity + "%", content: "쾌적한 상태인 적정 습도 단계입니다.", icon: <Humidity4 /> },
    { text: humidity + "%", content: "습도가 높아 주의가 필요합니다.", icon: <Humidity5 /> },
    { text: humidity + "%", content: "습도가 매우 높아 주의가 필요합니다.", icon: <Humidity6 /> }
]

export const FeelsLike = (feelsLike: number) => [
    { text: feelsLike + "°C", content: "한파주의보에 해당하는 기온으로 저체온증 위험이 있어 주의가 필요합니다.", icon: <FeelsLike2 /> },
    { text: feelsLike + "°C", content: "한파 경보에 해당하는 기온으로 야외활동시 저체온 위험이 커 주의해야 합니다.", icon: <FeelsLike1 /> },
    { text: feelsLike + "°C", content: "노출된 피부에 찬 기운이 느껴지는 정도로 방풍기능이 있는 옷을 착용해야합니다.", icon: <FeelsLike3 /> },
    { text: feelsLike + "°C", content: "겨울의 평균 기온에 해당하며 따뜻한 옷을 착용하는 것을 권장합니다.", icon: <FeelsLike4 /> },
    { text: feelsLike + "°C", content: "봄 평균 기온에 해당하며 추위가 느껴질 수 있어 따뜻한 옷 착용을 권장합니다.", icon: <FeelsLike5 /> },
    { text: feelsLike + "°C", content: "가을 평균기온에 해당하는 적정한 체감온도입니다.", icon: <FeelsLike6 /> },
    { text: feelsLike + "°C", content: "여름 평균기온에 해당하는 적정한 체감온도입니다.", icon: <FeelsLike7 /> },
    { text: feelsLike + "°C", content: "장기 외부활동시 일사병이나 탈수가 일어날 수 있으니 주의해야합니다.", icon: <FeelsLike8 /> },
    { text: feelsLike + "°C", content: "직사광선을 오래 받을 시 온열질환이 발생할 가능성이 높습니다.", icon: <FeelsLike9 /> },
    { text: feelsLike + "°C", content: "폭염 특보 수준의 체감 온도로 더위 질병에 주의하며 야외 활동을 자제해야 합니다.", icon: <FeelsLike10 /> }
]

export const SnowFall = (snowFall: number) => [
    { text: snowFall + "cm", content: "겨우 발자국이 날만한, 적은 양의 자국눈이 예상됩니다.", icon: <SnowFall1 /> },
    { text: snowFall + "cm", content: "대설경보 직전 단계로 교통 혼잡과 산간지역의 눈사태에 주의해야합니다.", icon: <SnowFall2 /> },
    { text: snowFall + "cm", content: "재해 피해가 예상되는 대설주의보 단계로 주의해야 합니다.", icon: <SnowFall3 /> },
    { text: snowFall + "cm", content: "재해 피해가 예상되는 대설경보 단계로 주의해야합니다.", icon: <SnowFall4 /> }
]
