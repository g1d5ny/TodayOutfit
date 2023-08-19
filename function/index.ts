export const DateFormat = () => {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let date = new Date().getDate()

    return year + "년 " + month + "월 " + date + "일"
}

export const FahrenheitToCelsius = (temp: number) => {
    return Math.floor(((temp - 32) * 5) / 9)
}
