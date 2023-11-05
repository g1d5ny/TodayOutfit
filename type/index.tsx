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
    location: string
    coordinate: {
        longitude: number
        latitude: number
    }
    date?: string
}

export interface CURRENT_WEATHER {
    code: number
    temp: number
    is_day: boolean // true: day, false: night
    minIcon: JSX.Element
}

export interface TODAY_WEATHER {
    code: number
    text: string
    sunrise: string
    sunset: string
    datetimeEpoch: number
    avgTemp: number
    maxTemp: number
    minTemp: number
    minIcon?: JSX.Element
    maxIcon?: JSX.Element
    backgroundColor: string
    uv: number
}

export interface HOUR_WEATHER {
    hour: string
    minIcon: JSX.Element
    temp: number
    uv: number
    feelslike: number
    windDir: string
    windSpeed: number
    precip_mm: number
    humidity: number
    will_it_rain: boolean
    will_it_snow: boolean
    chance_of_rain: number
    chance_of_snow: number
}

export interface WEEKELY_WEATHER {
    code: number
    avgTemp: number
    maxTemp: number
    minTemp: number
    minIcon?: JSX.Element
    maxIcon: JSX.Element
    date: string
    day: number
    sunrise: string
    sunset: string
    text: string
    backgroundColor: string
}

export type WEATHER_DESC_ENG = "clear-day" | "snow" | "partly-cloudy-day" | "partly-cloudy-night" | "cloudy" | "rain" | "fog"
export type WEATHER_DESC_KOR = "맑음" | "눈" | "구름 조금" | "흐림" | "비" | "안개" | "천둥 번개"
