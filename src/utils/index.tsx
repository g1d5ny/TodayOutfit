import { UV, WindSpeed } from "text/DetailInfoText"
import { FeelsLikeContent, Humidity, RainPercentage, SnowFall, WindDirection } from "../store"

export const NowDate = () => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const date = new Date().getDate()

    return year + "년 " + month + "월 " + date + "일"
}

export const getDay = (index: number) => {
    const day = { 0: "일", 1: "월", 2: "화", 3: "수", 4: "목", 5: "금", 6: "토" } as { [key: string]: string }
    return day[index]
}

export const FahrenheitToCelsius = (temp: number) => {
    return Math.floor(((temp - 32) * 5) / 9)
}

export const WindDirectionFormat = (dir: string) => {
    if (!dir) return
    if (dir.includes("SW")) return WindDirection[0]
    if (dir.includes("SE")) return WindDirection[1]
    if (dir.includes("NE")) return WindDirection[2]
    if (dir.includes("NW")) return WindDirection[3]
    if (dir === "S") return WindDirection[4]
    if (dir === "E") return WindDirection[5]
    if (dir === "W") return WindDirection[6]
    if (dir === "N") return WindDirection[7]
}

export const RainPercentageFormat = (precip: number) => {
    if (precip === 0) return RainPercentage(precip)[0]
    if (precip < 20) return RainPercentage(precip)[1]
    if (precip < 30) return RainPercentage(precip)[2]
    if (precip < 40) return RainPercentage(precip)[3]
    if (precip < 50) return RainPercentage(precip)[4]
    if (precip < 60) return RainPercentage(precip)[5]
    if (precip < 70) return RainPercentage(precip)[6]
    if (precip < 80) return RainPercentage(precip)[7]
    if (precip < 90) return RainPercentage(precip)[8]
    if (precip <= 95) return RainPercentage(precip)[9]
    if (precip > 95) return RainPercentage(precip)[10]
}

export const WindSpeedFormat = (windspeed: number) => {
    if (windspeed < 1) return WindSpeed()[0]
    if (windspeed < 5) return WindSpeed()[1]
    if (windspeed < 11) return WindSpeed()[2]
    if (windspeed < 19) return WindSpeed()[3]
    if (windspeed < 28) return WindSpeed()[4]
    if (windspeed < 38) return WindSpeed()[5]
    if (windspeed < 49) return WindSpeed()[6]
    if (windspeed < 61) return WindSpeed()[7]
    if (windspeed < 74) return WindSpeed()[8]
    if (windspeed >= 75) return WindSpeed()[9]
}

export const UVFormat = (uvIndex: number) => {
    if (uvIndex <= 2) return UV[4]
    if (uvIndex <= 5) return UV[3]
    if (uvIndex <= 7) return UV[2]
    if (uvIndex <= 10) return UV[1]
    if (uvIndex > 10) return UV[0]
}

export const HumidityFormat = (humidity: number) => {
    if (humidity === 0) return Humidity(humidity)[0]
    if (humidity <= 20) return Humidity(humidity)[1]
    if (humidity <= 30) return Humidity(humidity)[2]
    if (humidity <= 60) return Humidity(humidity)[3]
    if (humidity <= 80) return Humidity(humidity)[4]
    if (humidity > 80) return Humidity(humidity)[5]
}

export const FeelsLikeFormat = (feelsLike: number) => {
    if (feelsLike <= -10) return FeelsLikeContent(feelsLike)[0]
    if (feelsLike <= -20) return FeelsLikeContent(feelsLike)[1]
    if (feelsLike <= -3) return FeelsLikeContent(feelsLike)[2]
    if (feelsLike <= 5) return FeelsLikeContent(feelsLike)[3]
    if (feelsLike <= 10) return FeelsLikeContent(feelsLike)[4]
    if (feelsLike <= 18) return FeelsLikeContent(feelsLike)[5]
    if (feelsLike <= 22) return FeelsLikeContent(feelsLike)[6]
    if (feelsLike <= 28) return FeelsLikeContent(feelsLike)[7]
    if (feelsLike <= 31) return FeelsLikeContent(feelsLike)[8]
    if (feelsLike > 31) return FeelsLikeContent(feelsLike)[9]
}

export const SnowFallFormat = (snowFall: number) => {
    if (snowFall <= 1) return SnowFall(snowFall)[0]
    if (snowFall < 5) return SnowFall(snowFall)[1]
    if (snowFall < 20) return SnowFall(snowFall)[2]
    if (snowFall >= 20) return SnowFall(snowFall)[3]
}
