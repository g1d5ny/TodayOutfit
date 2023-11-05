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
import UV1 from "../asset/icon/uv_index/icon_uv_index_1.svg"
import UV2 from "../asset/icon/uv_index/icon_uv_index_2.svg"
import UV3 from "../asset/icon/uv_index/icon_uv_index_3.svg"
import UV4 from "../asset/icon/uv_index/icon_uv_index_4.svg"
import UV5 from "../asset/icon/uv_index/icon_uv_index_5.svg"
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

export const DateFormat = () => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const date = new Date().getDate()

    return year + "년 " + month + "월 " + date + "일"
}

export const getDay = () => {
    const day = { 0: "일", 1: "월", 2: "화", 3: "수", 4: "목", 5: "금", 6: "토" } as { [key: string]: string }
    const index = new Date().getDay().toString()
    return day[index]
}

export const FahrenheitToCelsius = (temp: number) => {
    return Math.floor(((temp - 32) * 5) / 9)
}

export const WindDirectionFormat = (dir: string) => {
    if (!dir) return
    if (dir.includes("SW")) return { text: "남서풍", content: "남서쪽으로 바람이 붑니다.", icon: <SW /> }
    if (dir.includes("SE")) return { text: "남동풍", content: "남동쪽으로 바람이 붑니다.", icon: <SE /> }
    if (dir.includes("NE")) return { text: "북동풍", content: "북동쪽으로 바람이 붑니다.", icon: <NE /> }
    if (dir.includes("NW")) return { text: "북서풍", content: "북서쪽으로 바람이 붑니다.", icon: <NW /> }
    if (dir === "S") return { text: "남풍", content: "남쪽으로 바람이 붑니다.", icon: <S /> }
    if (dir === "E") return { text: "동풍", content: "동쪽으로 바람이 붑니다.", icon: <E /> }
    if (dir === "W") return { text: "서풍", content: "서쪽으로 바람이 붑니다.", icon: <W /> }
    if (dir === "N") return { text: "북풍", content: "북쪽으로 바람이 붑니다.", icon: <N /> }
}

export const RainPercentageFormat = (precip: number) => {
    if (precip === 0) return { text: precip + "%", content: "강수 확률이 없습니다.", icon: <Precip1 /> }
    if (precip < 20) return { text: precip + "%", content: "강수 확률이 매우 낮습니다.", icon: <Precip2 /> }
    if (precip < 30) return { text: precip + "%", content: "강수 확률이 낮습니다.", icon: <Precip3 /> }
    if (precip < 40) return { text: precip + "%", content: "강수 확률이 낮습니다.", icon: <Precip4 /> }
    if (precip < 50) return { text: precip + "%", content: "강수 확률이 있어 우산 휴대를 권장합니다.", icon: <Precip5 /> }
    if (precip < 60) return { text: precip + "%", content: "강수 확률이 있어 우산 휴대를 권장합니다.", icon: <Precip6 /> }
    if (precip < 70) return { text: precip + "%", content: "강수 확률이 높아 우산 휴대를 권장합니다.", icon: <Precip7 /> }
    if (precip < 80) return { text: precip + "%", content: "강수 확률이 높아 우산 휴대를 권장합니다.", icon: <Precip8 /> }
    if (precip < 90) return { text: precip + "%", content: "강수 확률이 매우 높아 우산 휴대가 필요합니다.", icon: <Precip9 /> }
    if (precip <= 95) return { text: precip + "%", content: "강수 확률이 매우 높아 우산 휴대가 필요합니다.", icon: <Precip10 /> }
    if (precip > 95) return { text: precip + "%", content: "강수 확률이 매우 높아 우산  휴대가 필수입니다", icon: <Precip11 /> }
}

export const WindSpeedFormat = (windspeed: number) => {
    if (windspeed <= 0.2) return { text: "고요", content: "바람이 불지 않는 고요한 상태가 예상됩니다.", icon: <WindSpeed1 /> }
    if (windspeed <= 1.5) return { text: "실바람", content: "바람이 거의 느껴지지 않는 약한바람이 예상됩니다.", icon: <WindSpeed2 /> }
    if (windspeed <= 3.3) return { text: "남실바람", content: "나뭇잎이 흔들리는 정도의 약한바람이 예상됩니다.", icon: <WindSpeed3 /> }
    if (windspeed <= 5.4) return { text: "산들바람", content: "깃발이 흔들리는 정도의 약한바람이 예상됩니다.", icon: <WindSpeed4 /> }
    if (windspeed <= 7.9) return { text: "건들바람", content: "나무 가지가 흔들리는 정도의 중간바람이 예상됩니다.", icon: <WindSpeed5 /> }
    if (windspeed <= 10.7) return { text: "흔들바람", content: "작은 나무가 흔들리는 정도의 중간바람이 예상됩니다.", icon: <WindSpeed6 /> }
    if (windspeed <= 13.8) return { text: "된바람", content: "우산을 들기가 곤란한 정도의 강한바람이 예상됩니다.", icon: <WindSpeed7 /> }
    if (windspeed <= 17.1) return { text: "센바람", content: "바람을 마주해 걷기 힘든 강한바람이 예상됩니다.", icon: <WindSpeed8 /> }
    if (windspeed <= 20.7) return { text: "큰바람", content: "나무가지가 꺾이는 아주 큰 바람이 예상됩니다.", icon: <WindSpeed9 /> }
    if (windspeed > 20.7) return { text: "큰센바람", content: "가옥에 손해가 있을 정도의태풍급 바람이 예상됩니다.", icon: <WindSpeed10 /> }
}

export const UVFormat = (uvIndex: number) => {
    if (uvIndex <= 2) return { text: "낮음", content: "햇볕 노출에 대한 보호조치가 필요하지 않은 정도의 낮은 수준입니다.", icon: <UV1 /> }
    if (uvIndex <= 5) return { text: "보통", content: "자외선 차단제를 바르는 것을 권장합니다.", icon: <UV2 /> }
    if (uvIndex <= 7) return { text: "높음", content: "자외선 차단제를 정기적으로 발라야 합니다.", icon: <UV3 /> }
    if (uvIndex <= 10) return { text: "매우 높음", content: "자외선 차단제를 정기적으로 발라야 합니다.", icon: <UV4 /> }
    if (uvIndex > 10) return { text: "위험", content: "피부 화상을 입을 수 있어 가능한 실내에 머물러야합니다.", icon: <UV5 /> }
}

export const HumidityFormat = (humidity: number) => {
    if (humidity === 0) return { text: humidity + "%", content: "매우 건조한 상태로 호흡기 환자는 주의해야합니다.", icon: <Humidity1 /> }
    if (humidity <= 20) return { text: humidity + "%", content: "건조한 상태로 주의가 필요합니다.", icon: <Humidity2 /> }
    if (humidity <= 40) return { text: humidity + "%", content: "다소 건조함을 느낄 수 있는 정도 입니다.", icon: <Humidity3 /> }
    if (humidity <= 60) return { text: humidity + "%", content: "쾌적한 상태인 적정 습도 단계입니다.", icon: <Humidity4 /> }
    if (humidity <= 80) return { text: humidity + "%", content: "습도가 높아 주의가 필요합니다.", icon: <Humidity5 /> }
    if (humidity > 80) return { text: humidity + "%", content: "습도가 매우 높아 주의가 필요합니다.", icon: <Humidity6 /> }
}

export const FeelsLikeFormat = (feelsLike: number) => {
    if (feelsLike <= -20) return { text: feelsLike + "°C", content: "한파 경보에 해당하는 기온으로 야외활동시 저체온 위험이 커 주의해야 합니다.", icon: <FeelsLike1 /> }
    if (feelsLike <= -10) return { text: feelsLike + "°C", content: "한파주의보에 해당하는 기온으로 저체온증 위험이 있어 주의가 필요합니다.", icon: <FeelsLike2 /> }
    if (feelsLike <= -3) return { text: feelsLike + "°C", content: "노출된 피부에 찬 기운이 느껴지는 정도로 방풍기능이 있는 옷을 착용해야합니다.", icon: <FeelsLike3 /> }
    if (feelsLike <= 5) return { text: feelsLike + "°C", content: "겨울의 평균 기온에 해당하며 따뜻한 옷을 착용하는 것을 권장합니다.", icon: <FeelsLike4 /> }
    if (feelsLike <= 10) return { text: feelsLike + "°C", content: "봄 평균 기온에 해당하며 추위가 느껴질 수 있어 따뜻한 옷 착용을 권장합니다.", icon: <FeelsLike5 /> }
    if (feelsLike <= 18) return { text: feelsLike + "°C", content: "가을 평균기온에 해당하는 적정한 체감온도입니다.", icon: <FeelsLike6 /> }
    if (feelsLike <= 22) return { text: feelsLike + "°C", content: "여름 평균기온에 해당하는 적정한 체감온도입니다.", icon: <FeelsLike7 /> }
    if (feelsLike <= 28) return { text: feelsLike + "°C", content: "장기 외부활동시 일사병이나 탈수가 일어날 수 있으니 주의해야합니다.", icon: <FeelsLike8 /> }
    if (feelsLike <= 31) return { text: feelsLike + "°C", content: "직사광선을 오래 받을 시 온열질환이 발생할 가능성이 높습니다.", icon: <FeelsLike9 /> }
    if (feelsLike > 36) return { text: feelsLike + "°C", content: "폭염 특보 수준의 체감 온도로 더위 질병에 주의하며 야외 활동을 자제해야 합니다.", icon: <FeelsLike10 /> }
}

export const SnowFallFormat = (snowFall: number) => {
    if (snowFall < 1) return { text: snowFall + "cm", content: "겨우 발자국이 날만한, 적은 양의 자국눈이 예상됩니다.", icon: <SnowFall1 /> }
    if (snowFall <= 5) return { text: snowFall + "cm", content: "대설경보 직전 단계로 교통 혼잡과 산간지역의 눈사태에 주의해야합니다.", icon: <SnowFall2 /> }
    if (snowFall <= 20) return { text: snowFall + "cm", content: "재해 피해가 예상되는 대설주의보 단계로 주의해야 합니다.", icon: <SnowFall3 /> }
    if (snowFall > 20) return { text: snowFall + "cm", content: "재해 피해가 예상되는 대설경보 단계로 주의해야합니다.", icon: <SnowFall4 /> }
}
