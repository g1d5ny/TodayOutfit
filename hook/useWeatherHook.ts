import { useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { currentWeatherInfoState, hourWeatherInfoState, myAddressListState, weeklyWeatherInfoState } from "../store"
import { FahrenheitToCelsius } from "../function"

export const useWeatherHook = () => {
    const { contents: myAddressList } = useRecoilValueLoadable(myAddressListState)
    const setCurrentWeatherInfo = useSetRecoilState(currentWeatherInfoState)
    const setHourWeatherInfo = useSetRecoilState(hourWeatherInfoState)
    const setWeeklyWeatherInfo = useSetRecoilState(weeklyWeatherInfoState)

    const CallAllWeather = () => {
        try {
            const key = "GJCA9EEEAQ642FRTTWQ6HDBWE"
            const xobj = new XMLHttpRequest()
            xobj.open("GET", "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + myAddressList?.latitude + "," + myAddressList?.longitude + "/next7days?key=" + key + "&lang=ko") //  + "&lang=ko"

            xobj.onreadystatechange = () => {
                if (xobj.readyState !== 4) {
                    return
                }

                const { days } = JSON.parse(xobj.response)
                console.log(days[0])

                setCurrentWeatherInfo({
                    icon: days[0].icon,
                    month: days[0].datetime.split("-")[1],
                    sunrise: days[0].sunrise,
                    sunriseEpoch: days[0].sunriseEpoch * 1000,
                    sunset: days[0].sunset,
                    sunsetEpoch: days[0].sunsetEpoch * 1000,
                    datetimeEpoch: days[0].datetimeEpoch * 1000,
                    currentTemp: FahrenheitToCelsius(days[0].temp),
                    feelsLike: FahrenheitToCelsius(days[0].feelslike),
                    max: FahrenheitToCelsius(days[0].tempmax),
                    min: FahrenheitToCelsius(days[0].tempmin),
                    description: days[0].description //  jsonResponse.current.weather[0].description
                })

                let daysCnt = 0
                let hoursCnt = 0
                let timeWeatherList = []
                while (timeWeatherList.length < 16) {
                    if (days[0].hours[hoursCnt].datetime.split(":")[0] === new Date().getHours().toString().padStart(2, "0")) {
                        console.log(days[0])
                        days[daysCnt].hours[hoursCnt].temp = FahrenheitToCelsius(days[daysCnt].hours[hoursCnt].temp)

                        timeWeatherList.push({
                            temp: days[daysCnt].hours[hoursCnt].temp as string,
                            datetime: days[daysCnt].hours[hoursCnt].datetime as string,
                            icon: days[daysCnt].hours[hoursCnt].icon as string
                        })
                    }

                    if (days[daysCnt].hours[hoursCnt].datetimeEpoch * 1000 > new Date().getTime()) {
                        days[daysCnt].hours[hoursCnt].temp = FahrenheitToCelsius(days[daysCnt].hours[hoursCnt].temp)

                        timeWeatherList.push({
                            temp: days[daysCnt].hours[hoursCnt].temp as string,
                            datetime: days[daysCnt].hours[hoursCnt].datetime as string,
                            icon: days[daysCnt].hours[hoursCnt].icon as string
                        })
                    }
                    if (days[daysCnt].hours[hoursCnt].datetime.split(":")[0] === "23") {
                        daysCnt++
                        hoursCnt = 0
                    } else {
                        hoursCnt++
                    }
                }
                setHourWeatherInfo(timeWeatherList)

                let weekWeatherList = []
                for (let i = 0; i <= 7; i++) {
                    days[i].sunriseEpoch *= 1000
                    weekWeatherList.push({
                        sunriseEpoch: days[i].sunriseEpoch as number,
                        sunrise: days[i].sunrise as string,
                        max: FahrenheitToCelsius(days[i].tempmax) as number,
                        min: FahrenheitToCelsius(days[i].tempmin) as number,
                        icon: days[i].icon as string,
                        date: days[i].datetime.split("-")[2] as string,
                        day: new Date(days[i].datetime).getDay() as number,
                        humidity: days[i].humidity as string,
                        wind: days[i].windspeed as string
                    })
                }
                setWeeklyWeatherInfo(weekWeatherList)
            }

            xobj.send("")
        } catch (e) {
            console.error(e)
        }
    }

    return { CallAllWeather }
}
