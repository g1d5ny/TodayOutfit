export const DateFormat = () => {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let date = new Date().getDate()

    return year + "년 " + month + "월 " + date + "일"
}

export const FahrenheitToCelsius = (temp: number) => {
    return Math.floor(((temp - 32) * 5) / 9)
}

export const WinddirFormat = (winddir: number) => {
    if (winddir >= 11.25 && winddir <= 78.75) {
        return "NE"
    }
    if (winddir <= 101.25) {
        return "E"
    }
    if (winddir <= 168.75) {
        return "SE"
    }
    if (winddir <= 191.25) {
        return "S"
    }
    if (winddir <= 258.75) {
        return "SW"
    }
    if (winddir <= 281.25) {
        return "W"
    }
    if (winddir <= 348.75) {
        return "NW"
    }
    return "N"
}

export const WindNameFormat = (windspeed: number) => {
    if (windspeed <= 0.2) {
        return "고요"
    }
    if (windspeed <= 1.5) {
        return "실바람"
    }
    if (windspeed <= 3.3) {
        return "남실바람"
    }
    if (windspeed <= 5.4) {
        return "산들바람"
    }
    if (windspeed <= 7.9) {
        return "건들바람"
    }
    if (windspeed <= 10.7) {
        return "흔들바람"
    }
    if (windspeed <= 13.8) {
        return "된바람"
    }
    if (windspeed <= 17.1) {
        return "센바람"
    }
    if (windspeed <= 20.7) {
        return "큰바람"
    }
    if (windspeed <= 24.4) {
        return "큰센바람"
    }
    if (windspeed <= 28.4) {
        return "노대바람"
    }
    if (windspeed <= 32.6) {
        return "왕바람"
    }
    return "싹쓸바람"
}
