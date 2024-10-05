import { atom, selector } from "recoil"
import { isEmpty } from "lodash"
import Storage from "@react-native-async-storage/async-storage"
import DeviceInfo from "react-native-device-info"
import { RESULT_ADDRESS, MY_ADDRSS, TOAST, CURRENT_WEATHER, HOUR_WEATHER, WEEKELY_WEATHER, WEATHER_DESC_KOR, RECOMMEND_COSTUME, INPUT_ADDRESS } from "../type"
import { setRecoil } from "recoil-nexus"
import ClearDay from "../asset/icon/icon_clear_day.svg"
import ClearNight from "../asset/icon/icon_clear_night.svg"
import MaxSunny from "../asset/icon/3d/weather/day/icon_3d_sunny.svg"
import Snow from "../asset/icon/icon_light_snow.svg"
import MaxSnowDay from "../asset/icon/3d/weather/day/icon_3d_snowy.svg"
import MaxSnowNight from "../asset/icon/3d/weather/night/icon_3d_snowy.svg"
import PartyCloudyDay from "../asset/icon/icon_party_cloudy_day.svg"
import PartyCloudyNight from "../asset/icon/icon_party_cloudy_night.svg"
import MaxPartyCloudyDay from "../asset/icon/3d/weather/day/icon_3d_party_cloudy_day.svg"
import MaxPartyCloudyNight from "../asset/icon/3d/weather/night/icon_3d_party_cloudy_night.svg"
import CloudyDay from "../asset/icon/icon_cloudy_day.svg"
import CloudyNight from "../asset/icon/icon_cloudy_night.svg"
import MaxCloudyDay from "../asset/icon/3d/weather/day/icon_3d_cloudy.svg"
import MaxCloudyNight from "../asset/icon/3d/weather/night/icon_3d_cloudy.svg"
import RainyDay from "../asset/icon/icon_rain_day.svg"
import RainyNight from "../asset/icon/icon_rain_night.svg"
import MaxRainyDay from "../asset/icon/3d/weather/day/icon_3d_rainy.svg"
import MaxRainyNight from "../asset/icon/3d/weather/night/icon_3d_rainy.svg"
import FogNight from "../asset/icon/icon_fog_night.svg"
import FogDay from "../asset/icon/icon_fog_day.svg"
import MaxFogDay from "../asset/icon/3d/weather/day/icon_3d_fog.svg"
import MaxFogNight from "../asset/icon/3d/weather/night/icon_3d_fog.svg"
import MaxMoon from "../asset/icon/3d/weather/night/icon_3d_moon.svg"
import Thunder from "../asset/icon/icon_thunder.svg"
import MaxThunder from "../asset/icon/3d/weather/icon_3d_thunder.svg"
import SW from "../asset/icon/wind_direction/icon_wind_direction_1.svg"
import SE from "../asset/icon/wind_direction/icon_wind_direction_2.svg"
import NE from "../asset/icon/wind_direction/icon_wind_direction_3.svg"
import NW from "../asset/icon/wind_direction/icon_wind_direction_4.svg"
import S from "../asset/icon/wind_direction/icon_wind_direction_5.svg"
import E from "../asset/icon/wind_direction/icon_wind_direction_6.svg"
import W from "../asset/icon/wind_direction/icon_wind_direction_7.svg"
import N from "../asset/icon/wind_direction/icon_wind_direction_8.svg"

import Precip0 from "../asset/icon/rain_percentage/icon_rain_percentage_0.svg"
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
import { Alert, Dimensions } from "react-native"

const { width } = Dimensions.get("window")
export const isTablet = DeviceInfo.isTablet() || width >= 600
export const currentMonth = new Date().getMonth() + 1
export const currentDate = new Date().getDate()

export const getStorage = async (key: string): Promise<string | any> => {
    if (isEmpty(key)) {
        if (__DEV__) {
            throw Error("스토리지에서 가져올 key가 존재하지 않습니다.")
        } else {
            return null
        }
    }

    const data = await Storage.getItem(key)
    if (!data) {
        return null
    }
    return JSON.parse(data)
}

export const setStorage = async (key: string, value: any) => {
    if (isEmpty(key)) {
        handleError("스토리지에 저장할 key가 존재하지 않습니다.", Alert.alert("데이터를 저장하는데 실패하였습니다."))
    }

    await Storage.setItem(key, JSON.stringify(value), error => {
        if (error) {
            handleError("데이터를 스토리지 저장하는데 실패하였습니다.", Alert.alert("데이터를 저장하는데 실패하였습니다."), error)
            return
        }
    })
}

export const loggedInState = atom<boolean | null>({
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

export const inputAddressState = atom<INPUT_ADDRESS>({
    key: "inputAddressState",
    default: { value: "", isEditing: false }
})

export const resultAddressListState = atom<[RESULT_ADDRESS] | [] | ["NOT_FOUND"]>({
    key: "resultAddressListState",
    default: []
})

export const toastState = atom<TOAST | undefined>({
    key: "toastState",
    default: undefined
})

export const setToast = (message: TOAST) => {
    setRecoil(toastState, message)
}

export const myAddressListState = atom<MY_ADDRSS[]>({
    key: "myAddressListState",
    default: selector({
        key: "myAddressListState/default",
        get: async () => {
            const myAddressList = await getStorage("myAddressList")
            return myAddressList || []
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

export const recommendCostumeState = atom<RECOMMEND_COSTUME>({
    key: "recommendCostumeState",
    default: undefined
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

export const weather = (code: Weather, is_day: boolean) => {
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
        return is_day ? weatherDesc["snow-day"] : weatherDesc["snow-night"]
    }
}

export const weatherDesc: { [key: string]: { minIcon: JSX.Element; maxIcon: JSX.Element; text: WEATHER_DESC_KOR; backgroundColor: string } } = {
    "clear-day": { minIcon: <ClearDay />, maxIcon: <MaxSunny width={"100%"} height={"100%"} />, text: "맑음", backgroundColor: "rgb(252, 252, 221)" },
    "clear-night": { minIcon: <ClearNight />, maxIcon: <MaxMoon width={"100%"} height={"100%"} />, text: "맑음", backgroundColor: "rgb(201, 211, 246)" },
    "snow-day": { minIcon: <Snow />, maxIcon: <MaxSnowDay width={"100%"} height={"100%"} />, text: "눈", backgroundColor: "rgb(230, 242, 253)" },
    "snow-night": { minIcon: <Snow />, maxIcon: <MaxSnowNight width={"100%"} height={"100%"} />, text: "눈", backgroundColor: "rgb(228, 230, 242)" },
    "party-cloudy-day": { minIcon: <PartyCloudyDay />, maxIcon: <MaxPartyCloudyDay width={"100%"} height={"100%"} />, text: "구름 조금", backgroundColor: "rgb(241, 243, 255)" },
    "party-cloudy-night": { minIcon: <PartyCloudyNight />, maxIcon: <MaxPartyCloudyNight width={"100%"} height={"100%"} />, text: "구름 조금", backgroundColor: "rgb(241, 243, 255)" },
    "cloudy-day": { minIcon: <CloudyDay />, maxIcon: <MaxCloudyDay width={"100%"} height={"100%"} />, text: "흐림", backgroundColor: "rgb(241, 252, 255)" },
    "cloudy-night": { minIcon: <CloudyNight />, maxIcon: <MaxCloudyNight width={"100%"} height={"100%"} />, text: "흐림", backgroundColor: "rgb(241, 252, 255)" },
    "rain-day": { minIcon: <RainyDay />, maxIcon: <MaxRainyDay width={"100%"} height={"100%"} />, text: "비", backgroundColor: "rgb(239, 245, 245)" },
    "rain-night": { minIcon: <RainyNight />, maxIcon: <MaxRainyNight width={"100%"} height={"100%"} />, text: "비", backgroundColor: "rgb(239, 245, 245)" },
    "fog-day": { minIcon: <FogDay />, maxIcon: <MaxFogDay width={"100%"} height={"100%"} />, text: "안개", backgroundColor: "rgb(230, 242, 253)" },
    "fog-night": { minIcon: <FogNight />, maxIcon: <MaxFogNight width={"100%"} height={"100%"} />, text: "안개", backgroundColor: "rgb(230, 242, 253)" },
    thunder: { minIcon: <Thunder />, maxIcon: <MaxThunder width={"100%"} height={"100%"} />, text: "천둥 번개", backgroundColor: "rgb(228, 230, 242)" }
}

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
    { text: precip + "%", content: "강수 확률이 없습니다.", icon: <Precip0 /> },
    { text: precip + "%", content: "강수 확률이 매우 낮습니다.", icon: <Precip1 /> },
    { text: precip + "%", content: "강수 확률이 낮습니다.", icon: <Precip2 /> },
    { text: precip + "%", content: "강수 확률이 낮습니다.", icon: <Precip3 /> },
    { text: precip + "%", content: "강수 확률이 있어 우산 휴대를 권장합니다.", icon: <Precip4 /> },
    { text: precip + "%", content: "강수 확률이 있어 우산 휴대를 권장합니다.", icon: <Precip5 /> },
    { text: precip + "%", content: "강수 확률이 높아 우산 휴대를 권장합니다.", icon: <Precip6 /> },
    { text: precip + "%", content: "강수 확률이 높아 우산 휴대를 권장합니다.", icon: <Precip7 /> },
    { text: precip + "%", content: "강수 확률이 매우 높아 우산 휴대가 필요합니다.", icon: <Precip8 /> },
    { text: precip + "%", content: "강수 확률이 매우 높아 우산 휴대가 필요합니다.", icon: <Precip9 /> },
    { text: precip + "%", content: "강수 확률이 매우 높아 우산  휴대가 필수입니다", icon: <Precip10 /> }
]

export const Humidity = (humidity: number) => [
    { text: humidity + "%", content: "매우 건조한 상태로 호흡기 환자는 주의해야 합니다.", icon: <Humidity1 /> },
    { text: humidity + "%", content: "건조한 상태로 주의가 필요합니다.", icon: <Humidity2 /> },
    { text: humidity + "%", content: "다소 건조함을 느낄 수 있는 정도 입니다.", icon: <Humidity3 /> },
    { text: humidity + "%", content: "쾌적한 상태인 적정 습도 단계입니다.", icon: <Humidity4 /> },
    { text: humidity + "%", content: "습도가 높아 주의가 필요합니다.", icon: <Humidity5 /> },
    { text: humidity + "%", content: "습도가 매우 높아 주의가 필요합니다.", icon: <Humidity6 /> }
]

export const FeelsLikeContent = (feelsLike: number) => [
    { text: feelsLike + "°C", content: "한파주의보에 해당하는 기온으로 저체온증 위험이 있어 주의가 필요합니다.", icon: <FeelsLike2 /> },
    { text: feelsLike + "°C", content: "한파 경보에 해당하는 기온으로 야외활동시 저체온 위험이 커 주의해야 합니다.", icon: <FeelsLike1 /> },
    { text: feelsLike + "°C", content: "노출된 피부에 찬 기운이 느껴지는 정도로 방풍기능이 있는 옷을 착용해야합니다.", icon: <FeelsLike3 /> },
    { text: feelsLike + "°C", content: "겨울의 평균 기온에 해당하며 따뜻한 옷을 착용하는 것을 권장합니다.", icon: <FeelsLike4 /> },
    { text: feelsLike + "°C", content: "봄 평균 기온에 해당하며 추위가 느껴질 수 있어 따뜻한 옷 착용을 권장합니다.", icon: <FeelsLike5 /> },
    { text: feelsLike + "°C", content: "가을 평균기온에 해당하는 체감온도입니다.", icon: <FeelsLike6 /> },
    { text: feelsLike + "°C", content: "여름 평균기온에 해당하는 체감온도입니다.", icon: <FeelsLike7 /> },
    { text: feelsLike + "°C", content: "장기 외부 활동 시 일사병이나 탈수가 일어날 수 있으니 주의해야 합니다.", icon: <FeelsLike8 /> },
    { text: feelsLike + "°C", content: "직사광선을 오래 받을 시 온열질환이 발생할 가능성이 높습니다.", icon: <FeelsLike9 /> },
    { text: feelsLike + "°C", content: "폭염 특보 수준의 체감 온도로 더위 질병에 주의하며 야외 활동을 자제해야 합니다.", icon: <FeelsLike10 /> }
]

export const SnowFall = (snowFall: number) => [
    { text: snowFall + "cm", content: "겨우 발자국이 날만한, 적은 양의 자국눈이 예상됩니다.", icon: <SnowFall1 /> },
    { text: snowFall + "cm", content: "대설경보 직전 단계로 교통 혼잡과 산간지역의 눈사태에 주의해야 합니다.", icon: <SnowFall2 /> },
    { text: snowFall + "cm", content: "재해 피해가 예상되는 대설주의보 단계로 주의해야 합니다.", icon: <SnowFall3 /> },
    { text: snowFall + "cm", content: "재해 피해가 예상되는 대설경보 단계로 주의해야 합니다.", icon: <SnowFall4 /> }
]

export const handleError = (debuggingMessage: string, func: any, error?: any): ErrorConstructor => {
    if (__DEV__) {
        console.error(error)
        throw Error(debuggingMessage)
    }
    return func() || func
}
