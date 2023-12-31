export const allData = {
    queryCost: 1,
    latitude: 37.4887524986311,
    longitude: 126.979253427857,
    resolvedAddress: "37.4887524986311,126.979253427857",
    address: "37.4887524986311,126.979253427857",
    timezone: "Asia/Seoul",
    tzoffset: 9.0,
    description: "유사한 온도가 계속됩니다 및 비가 올 기회 오늘 & 내일.",
    days: ["~"], // onedayData * 8일 데이터
    alerts: [],
    stations: { "...": "..." }, // stationsData
    currentConditions: { "...": "..." } // currentData
}

export const stationsData = {
    RKSI: {
        distance: 46801.0,
        latitude: 37.47,
        longitude: 126.45,
        useCount: 0,
        id: "RKSI",
        name: "RKSI",
        quality: 50,
        contribution: 0.0
    },
    RKSF: {
        distance: 3686.0,
        latitude: 37.5,
        longitude: 126.94,
        useCount: 0,
        id: "RKSF",
        name: "RKSF",
        quality: 0,
        contribution: 0.0
    },
    RKSO: {
        distance: 45724.0,
        latitude: 37.08,
        longitude: 127.03,
        useCount: 0,
        id: "RKSO",
        name: "RKSO",
        quality: 47,
        contribution: 0.0
    },
    RKSM: {
        distance: 14052.0,
        latitude: 37.43,
        longitude: 127.12,
        useCount: 0,
        id: "RKSM",
        name: "RKSM",
        quality: 45,
        contribution: 0.0
    },
    RKSS: {
        distance: 16825.0,
        latitude: 37.54,
        longitude: 126.8,
        useCount: 0,
        id: "RKSS",
        name: "RKSS",
        quality: 50,
        contribution: 0.0
    }
}

export const oneDayData = {
    cloudcover: 72.4,
    conditions: "비, 부분적으로 흐린",
    datetime: "2023-09-17",
    datetimeEpoch: 1694876400,
    description: "하루 동안 부분적으로 흐려짐 및 비.",
    dew: 68.8,
    feelslike: 73.5,
    feelslikemax: 79.2,
    feelslikemin: 68.8,
    hours: ["~"], // oneHourData * 24시 데이터
    humidity: 85.7,
    icon: "rain",
    moonphase: 0.07,
    precip: 1.068,
    precipcover: 66.67,
    precipprob: 100,
    preciptype: ["rain"],
    pressure: 1010.8,
    severerisk: 10,
    snow: 0,
    snowdepth: 0,
    solarenergy: 11.2,
    solarradiation: 130.7,
    source: "comb",
    stations: ["RKSO", "RKSM", "RKSI", "RKSS"],
    sunrise: "06:15:02",
    sunriseEpoch: 1694898902,
    sunset: "18:38:05",
    sunsetEpoch: 1694943485,
    temp: 73.5,
    tempmax: 79.2,
    tempmin: 68.8,
    uvindex: 5,
    visibility: 12.4,
    winddir: 108.1,
    windgust: 10.5,
    windspeed: 4.3
}

export const oneHourData = {
    cloudcover: 100,
    conditions: "비, 흐린",
    datetime: "00:00:00",
    datetimeEpoch: 1694876400,
    dew: 71.6,
    feelslike: 72.6,
    humidity: 96.82,
    icon: "rain",
    precip: 0.157,
    precipprob: 100,
    preciptype: ["rain"],
    pressure: 1010.8,
    severerisk: 10,
    snow: 0,
    snowdepth: 0,
    solarenergy: 0,
    solarradiation: 0,
    source: "obs",
    stations: ["RKSO", "RKSM", "RKSI", "RKSS"],
    temp: 72.6,
    uvindex: 0,
    visibility: 6,
    winddir: 43,
    windgust: 9.4,
    windspeed: 3.2
}

export const currentData = {
    datetime: "01:36:00",
    datetimeEpoch: 1694882160,
    temp: 71.6,
    feelslike: 71.6,
    humidity: 99.6,
    dew: 71.5,
    precip: null,
    precipprob: 0.0,
    snow: 0.0,
    snowdepth: 0.0,
    preciptype: null,
    windgust: null,
    windspeed: 1.1,
    winddir: 307.0,
    pressure: 1011.0,
    visibility: 6.2,
    cloudcover: 89.3,
    solarradiation: 0.0,
    solarenergy: 0.0,
    uvindex: 0.0,
    conditions: "부분적으로 흐린",
    icon: "partly-cloudy-night",
    stations: ["RKSM", "RKSF", "RKSS"],
    source: "obs",
    sunrise: "06:15:02",
    sunriseEpoch: 1694898902,
    sunset: "18:38:05",
    sunsetEpoch: 1694943485,
    moonphase: 0.07
}
