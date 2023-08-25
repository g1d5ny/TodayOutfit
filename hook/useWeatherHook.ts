import { useRecoilValue, useSetRecoilState } from "recoil"
import { currentWeatherInfoState, hourWeatherInfoState, myAddressListState, weatherDesc, weeklyWeatherInfoState } from "../store"
import { FahrenheitToCelsius, WindNameFormat, WinddirFormat } from "../function"
import { HOUR_WEATHER, WEEKELY_WEATHER } from "../type"
import { WEATHER_INFO_KEY } from "../asset/key"
import { isEmpty } from "lodash"

interface CUSTOM_HOUR_WEATHER {
    temp: number
    datetime: string
    icon: string
    feelslike: number
    windspeed: number
    windname: string
    winddir: number
    precipprob: number
}
export const useWeatherHook = () => {
    const myAddressList = useRecoilValue(myAddressListState)
    const setCurrentWeatherInfo = useSetRecoilState(currentWeatherInfoState)
    const setHourWeatherInfo = useSetRecoilState(hourWeatherInfoState)
    const setWeeklyWeatherInfo = useSetRecoilState(weeklyWeatherInfoState)

    const CallAllWeather = () => {
        if (!isEmpty(myAddressList)) {
            const xobj = new XMLHttpRequest()
            xobj.open(
                "GET",
                "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + myAddressList[0].coordinate.latitude + "," + myAddressList[0]?.coordinate.longitude + "/next7days?key=" + WEATHER_INFO_KEY + "&lang=ko"
            ) //  + "&lang=ko"

            xobj.onreadystatechange = () => {
                if (xobj.readyState !== 4) {
                    return
                }

                const { days } = JSON.parse(xobj.response)

                setCurrentWeatherInfo({
                    sunrise: days[0].sunrise.slice(":", 5),
                    sunset: days[0].sunset.slice(":", 5),
                    datetimeEpoch: days[0].datetimeEpoch * 1000,
                    currentTemp: FahrenheitToCelsius(days[0].temp),
                    feelsLike: FahrenheitToCelsius(days[0].feelslike),
                    max: FahrenheitToCelsius(days[0].tempmax),
                    min: FahrenheitToCelsius(days[0].tempmin),
                    precipprob: days[0].precipprob,
                    humidity: days[0].humidity,
                    windspeed: days[0].windspeed,
                    winddir: WinddirFormat(days[0].winddir),
                    windname: WindNameFormat(days[0].windspeed),
                    description: days[0].description, //  jsonResponse.current.weather[0].description
                    uxindex: days[0].uvindex,
                    summary: weatherDesc[days[0].icon].text,
                    minIcon: weatherDesc[days[0].icon].minIcon,
                    maxIcon: weatherDesc[days[0].icon].maxIcon,
                    backgroundColor: weatherDesc[days[0].icon].backgroundColor
                })

                let hourWeather = [] as HOUR_WEATHER[]
                days[0].hours.map(({ icon, datetime, temp, feelslike, windspeed, winddir, precipprob }: CUSTOM_HOUR_WEATHER) => {
                    hourWeather.push({
                        minIcon: weatherDesc[icon].minIcon,
                        maxIcon: weatherDesc[icon].maxIcon,
                        hour: datetime.split(":")[0],
                        temp: FahrenheitToCelsius(temp),
                        feelslike: FahrenheitToCelsius(feelslike),
                        windspeed,
                        windname: WindNameFormat(windspeed),
                        winddir: WinddirFormat(winddir),
                        precipprob
                    })
                })
                setHourWeatherInfo(hourWeather)

                let weeklyWeatherList = [] as WEEKELY_WEATHER[]
                for (let i = 0; i <= 7; i++) {
                    weeklyWeatherList.push({
                        max: FahrenheitToCelsius(days[i].tempmax),
                        min: FahrenheitToCelsius(days[i].tempmin),
                        minIcon: weatherDesc[days[i].icon].minIcon,
                        maxIcon: weatherDesc[days[i].icon].maxIcon,
                        date: days[i].datetime.split("-")[2],
                        day: new Date(days[i].datetime).getDay(),
                        description: weatherDesc[days[i].icon].text
                    })
                }
                setWeeklyWeatherInfo(weeklyWeatherList)
            }

            xobj.send("")
        }
    }

    return { CallAllWeather }
}
