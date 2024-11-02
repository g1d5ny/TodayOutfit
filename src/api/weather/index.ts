import { WEATHER_BASE_URL } from "asset/key"
import axios from "axios"

export const getCurrentWeatherApi = async (lng: number, lat: number) => {
    const resp = await axios.get(WEATHER_BASE_URL("current") + `&q=${lat},${lng}&aqi=no&lang=ko`)
    return resp.data
}

export const getDailyWeatherApi = async (lng: number, lat: number, days: number) => {
    const resp = await axios.get(WEATHER_BASE_URL("forecast") + `&q=${lat},${lng}&days=${days}&aqi=no&lang=ko`)
    return resp.data
}
