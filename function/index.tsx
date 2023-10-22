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
import UV1 from "../asset/icon/uv_index/icon_uv_index_1.svg"
import UV2 from "../asset/icon/uv_index/icon_uv_index_2.svg"
import UV3 from "../asset/icon/uv_index/icon_uv_index_3.svg"
import UV4 from "../asset/icon/uv_index/icon_uv_index_4.svg"
import UV5 from "../asset/icon/uv_index/icon_uv_index_5.svg"
import UV6 from "../asset/icon/uv_index/icon_uv_index_6.svg"
import Humidity1 from "../asset/icon/humidity/icon_humidity_1.svg"
import Humidity2 from "../asset/icon/humidity/icon_humidity_2.svg"
import Humidity3 from "../asset/icon/humidity/icon_humidity_3.svg"
import Humidity4 from "../asset/icon/humidity/icon_humidity_4.svg"
import Humidity5 from "../asset/icon/humidity/icon_humidity_5.svg"
import Humidity6 from "../asset/icon/humidity/icon_humidity_6.svg"
import Humidity7 from "../asset/icon/humidity/icon_humidity_7.svg"
import Humidity8 from "../asset/icon/humidity/icon_humidity_8.svg"
import Humidity9 from "../asset/icon/humidity/icon_humidity_9.svg"
import Humidity10 from "../asset/icon/humidity/icon_humidity_10.svg"
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

export const WindDirectionFormat = {
    SW: { text: "남서", icon: <SW /> },
    SE: { text: "남동", icon: <SE /> },
    NE: { text: "북동", icon: <NE /> },
    NW: { text: "북서", icon: <NW /> },
    S: { text: "남", icon: <S /> },
    E: { text: "동", icon: <E /> },
    W: { text: "서", icon: <W /> },
    N: { text: "북", icon: <N /> }
}

export const TotalPrecipFormat = (precip: number) => {
    if (precip <= 5) return { text: "매우 낮습니다.", icon: <Precip1 /> }
    if (precip <= 10) return { text: "매우 낮습니다.", icon: <Precip2 /> }
    if (precip <= 20) return { text: "낮습니다.", icon: <Precip3 /> }
    if (precip <= 30) return { text: "낮습니다.", icon: <Precip4 /> }
    if (precip <= 40) return { text: "보통입니다.", icon: <Precip5 /> }
    if (precip <= 60) return { text: "보통입니다.", icon: <Precip6 /> }
    if (precip <= 70) return { text: "높습니다.", icon: <Precip7 /> }
    if (precip <= 90) return { text: "높습니다.", icon: <Precip8 /> }
    if (precip <= 100) return { text: "매우 높습니다.", icon: <Precip9 /> }
    if (precip > 100) return { text: "매우 높습니다.", icon: <Precip10 /> }
}

export const WindSpeedFormat = (windspeed: number) => {
    if (windspeed <= 0.2) return { text: "고요", icon: <WindSpeed1 /> }
    if (windspeed <= 1.5) return { text: "실바람", icon: <WindSpeed2 /> }
    if (windspeed <= 3.3) return { text: "남실바람", icon: <WindSpeed3 /> }
    if (windspeed <= 5.4) return { text: "산들바람", icon: <WindSpeed4 /> }
    if (windspeed <= 7.9) return { text: "건들바람", icon: <WindSpeed5 /> }
    if (windspeed <= 10.7) return { text: "흔들바람", icon: <WindSpeed6 /> }
    if (windspeed <= 13.8) return { text: "된바람", icon: <WindSpeed7 /> }
    if (windspeed <= 17.1) return { text: "센바람", icon: <WindSpeed8 /> }
    if (windspeed <= 20.7) return { text: "큰바람", icon: <WindSpeed9 /> }
    if (windspeed > 20.7) return { text: "태풍", icon: <WindSpeed10 /> }
}

export const UVFormat = (uvIndex: number) => {
    if (uvIndex === 0) return { text: "없음", icon: <UV1 /> }
    if (uvIndex <= 2) return { text: "낮음", icon: <UV2 /> }
    if (uvIndex <= 5) return { text: "보통", icon: <UV3 /> }
    if (uvIndex <= 7) return { text: "높음", icon: <UV4 /> }
    if (uvIndex <= 10) return { text: "매우 높음", icon: <UV5 /> }
    if (uvIndex > 10) return { text: "위험", icon: <UV6 /> }
}

export const HumidityFormat = (humidity: number) => {
    if (humidity <= 10) return <Humidity1 />
    if (humidity <= 20) return <Humidity2 />
    if (humidity <= 30) return <Humidity3 />
    if (humidity <= 40) return <Humidity4 />
    if (humidity <= 50) return <Humidity5 />
    if (humidity <= 60) return <Humidity6 />
    if (humidity <= 70) return <Humidity7 />
    if (humidity <= 80) return <Humidity8 />
    if (humidity <= 90) return <Humidity9 />
    if (humidity > 90) return <Humidity10 />
}

export const FeelsLikeFormat = (feelsLike: number) => {
    if (feelsLike <= -60) return <FeelsLike1 />
    if (feelsLike <= -25) return <FeelsLike2 />
    if (feelsLike <= -11) return <FeelsLike3 />
    if (feelsLike <= 5) return <FeelsLike4 />
    if (feelsLike <= 15) return <FeelsLike5 />
    if (feelsLike <= 26) return <FeelsLike6 />
    if (feelsLike <= 32) return <FeelsLike7 />
    if (feelsLike <= 41) return <FeelsLike8 />
    if (feelsLike <= 52) return <FeelsLike9 />
    if (feelsLike > 52) return <FeelsLike10 />
}

export const SnowFallFormat = (snowFall: number) => {
    if (snowFall < 1) return <SnowFall1 />
    if (snowFall <= 5) return <SnowFall2 />
    if (snowFall <= 20) return <SnowFall3 />
    if (snowFall > 20) return <SnowFall4 />
}
