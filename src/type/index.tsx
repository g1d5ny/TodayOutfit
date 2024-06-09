import { Weather } from "store"

export interface RESULT_ADDRESS {
    address: {
        address_name: string
        b_code: string
        h_code: string
        main_address_no: string
        mountain_yn: string
        region_1depth_name: string
        region_2depth_name: string
        region_3depth_h_name: string
        region_3depth_name: string
        sub_address_no: string
        x: string
        y: string
    }
    address_name: string
    address_type: string
    road_address: null
    x: string
    y: string
}

export interface COORDINATE_ADDRESS {
    documents: [
        {
            address: {
                address_name: string
                main_address_no: string
                mountain_yn: string
                region_1depth_name: string
                region_2depth_name: string
                region_3depth_name: string
                sub_address_no: string
                zip_code: string
            }
            road_address: {
                address_name: string
                building_name: string
                main_building_no: string
                region_1depth_name: string
                region_2depth_name: string
                region_3depth_name: string
                road_name: string
                sub_building_no: string
                underground_yn: string
                zone_no: string
            }
        }
    ]
    meta: {
        total_count: number
    }
}

export interface TOAST {
    message?: string
    duration?: number
}

export interface MY_ADDRSS {
    id: string
    location: string
    coordinate: {
        longitude: number
        latitude: number
    }
    date?: string
}

interface ADDRESS {
    address_name: string
    main_address_no: string
    mountain_yn: string
    region_1depth_name: string
    region_2depth_name: string
    region_3depth_name: string
    sub_address_no: string
    zip_code: string
}

interface ROAD_ADDRESS {
    address_name: string
    building_name: string
    main_building_no: string
    region_1depth_name: string
    region_2depth_name: string
    region_3depth_name: string
    road_name: string
    sub_building_no: string
    underground_yn: string
    zone_no: string
}

export interface DOCUMENT {
    address: ADDRESS
    road_address: ROAD_ADDRESS
}

export interface COSTUME {
    top: string
    topDesc: string
    bottom: string
    bottomDesc: string
}

export interface CURRENT_WEATHER {
    code: Weather
    temp: number
    is_day: boolean // 1: day, 0: night
    minIcon: JSX.Element
    maxIcon: JSX.Element
    backgroundColor: string
    desc: string // 현재 날씨에 대한 한줄 요약
    costume: COSTUME
}

export interface TODAY_WEATHER {
    code: Weather
    text: string
    sunrise: string
    sunset: string
    datetimeEpoch?: number
    avgTemp: number
    maxTemp: number
    minTemp: number
    minIcon?: JSX.Element
    maxIcon?: JSX.Element
    backgroundColor: string
    uv: number
    maxWindSpeed: number // 최대 풍속
    rainPercentage: number // 강수 확률
    snowPercentage: number // 강설 확률
    willItRain: boolean
    willItSnow: boolean
}

export interface HOUR_WEATHER {
    hour: string
    minIcon: JSX.Element
    temp?: number
    uv: number
    feelslike: number
    windDir: string
    windSpeed: number
    precip_mm?: number
    humidity: number
    willItRain: boolean
    willItSnow: boolean
    rainPercentage: number
    snowPercentage: number
}

export interface WEEKELY_WEATHER extends TODAY_WEATHER {
    date: string
    day: number
    backgroundColor: string
}

export interface RECOMMEND_COSTUME {
    top: string // 상의
    bottom: string // 하의
}

export type WEATHER_DESC_ENG = "clear-day" | "snow" | "partly-cloudy-day" | "partly-cloudy-night" | "cloudy" | "rain" | "fog"
export type WEATHER_DESC_KOR = "맑음" | "눈" | "구름 조금" | "흐림" | "비" | "안개" | "천둥 번개"

export type GENDER = "W" | "M"

interface CONDITION {
    code: Weather
    icon: string
    text: string
}

interface ASTRO {
    sunrise: string
    sunset: string
}

interface DAY {
    avgtemp_c: number
    condition: CONDITION
    daily_chance_of_rain: number
    daily_chance_of_snow: number
    daily_will_it_rain: number
    daily_will_it_snow: number
    maxtemp_c: number
    maxwind_kph: number
    mintemp_c: number
    totalprecip_mm: number
    totalsnow_cm: number
    uv: number
}

export interface FORECAST_DAY {
    astro: ASTRO
    date: string
    date_epoch: number
    day: DAY
    hour: HOUR[]
}

export interface HOUR {
    chance_of_rain: number
    chance_of_snow: number
    condition: CONDITION
    feelslike_c: string
    humidity: string
    is_day: number
    precip_mm: number
    snow_cm: number
    temp_c: number
    time: string
    time_epoch: number
    uv: number
    will_it_rain: boolean
    will_it_snow: boolean
    wind_dir: string
    wind_kph: number
}

export interface CURRENT {
    condition: CONDITION
    feelslike_c: number
    humidity: number
    is_day: number
    precip_mm: number
    temp_c: number
    uv: number
    wind_dir: string
    wind_kph: number
}

interface Message {
    content: string
    role: string
}

export interface Choice {
    finish_reason: string
    index: number
    logprobs: null | any
    message: Message
}
