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
    sunrise: string
    sunset: string
    datetimeEpoch: number
    currentTemp: number
    feelsLike: number
    max: number
    min: number
    humidity: number
    precipprob: number
    windspeed: number
    windname: string
    winddir: string
    description: string
}

export interface HOUR_WEATHER {
    temp: number
    hour: string
    icon: JSX.Element
    feelslike: number
    windspeed: number
    windname: string
    winddir: string
    precipprob: number
}

export interface WEEKELY_WEATHER {
    max: number
    min: number
    icon: JSX.Element
    date: string
    day: number
    description: WEATHER_DESC_KOR
}

export type WEATHER_DESC_ENG = "clear-day" | "snow" | "partly-cloudy-day" | "partly-cloudy-night" | "cloudy" | "rain" | "fog"
export type WEATHER_DESC_KOR = "맑음" | "눈" | "구름 조금" | "흐림" | "비" | "안개" | "맑음 저녁"
