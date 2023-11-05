import { useRecoilValue, useSetRecoilState } from "recoil"
import { currentWeatherInfoState, hourWeatherInfoState, isRain, isSummeryRain, myAddressListState, todayWeatherInfoState, weatherIcon, weeklyWeatherInfoState } from "../store"
import { HOUR_WEATHER, WEEKELY_WEATHER } from "../type"
import { WEATHER_BASE_URL } from "../asset/key"
import { isEmpty } from "lodash"
import axios from "axios"

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
    const setTodayWeatherInfo = useSetRecoilState(todayWeatherInfoState)
    const setHourWeatherInfo = useSetRecoilState(hourWeatherInfoState)
    const setWeeklyWeatherInfo = useSetRecoilState(weeklyWeatherInfoState)

    const CallCurrentWeather = async () => {
        if (!isEmpty(myAddressList)) {
            const {
                data: {
                    current: {
                        temp_c,
                        is_day,
                        condition: { code }
                    }
                }
            } = await axios.get(WEATHER_BASE_URL("current") + "&q=" + myAddressList[0].coordinate.latitude + "," + myAddressList[0]?.coordinate.longitude + "&aqi=no&lang=ko")

            setCurrentWeatherInfo({
                code,
                temp: parseInt(temp_c),
                is_day,
                minIcon: weatherIcon(code, is_day)?.minIcon as JSX.Element
            })
        }
    }

    const CallTodayWeather = async () => {
        if (!isEmpty(myAddressList)) {
            const {
                data: {
                    forecast: { forecastday }
                }
            } = await axios.get(WEATHER_BASE_URL("forecast") + "&q=" + myAddressList[0]?.coordinate.latitude + "," + myAddressList[0]?.coordinate.longitude + "&days=1&aqi=no&lang=ko")

            const {
                date_epoch,
                astro: { sunrise, sunset },
                day: {
                    maxtemp_c,
                    mintemp_c,
                    avgtemp_c,
                    uv,
                    condition: { text, code }
                }
            } = forecastday[0]

            setTodayWeatherInfo({
                code,
                sunrise,
                sunset,
                text,
                uv,
                datetimeEpoch: date_epoch,
                avgTemp: parseInt(avgtemp_c),
                maxTemp: parseInt(maxtemp_c),
                minTemp: parseInt(mintemp_c),
                minIcon: weatherIcon(code, true)?.minIcon as JSX.Element,
                maxIcon: weatherIcon(code, true)?.maxIcon as JSX.Element,
                backgroundColor: weatherIcon(code, true)?.backgroundColor as string
            })
        }
    }

    const CallWeeklyWeather = async () => {
        if (!isEmpty(myAddressList)) {
            const {
                data: {
                    forecast: { forecastday }
                }
            } = await axios.get(WEATHER_BASE_URL("forecast") + "&q=" + myAddressList[0]?.coordinate.latitude + "," + myAddressList[0]?.coordinate.longitude + "&days=3&aqi=no&lang=ko")

            const weeklyWeather = [] as WEEKELY_WEATHER[]
            forecastday.forEach(
                (
                    {
                        date,
                        astro: { sunrise, sunset },
                        day: {
                            maxtemp_c,
                            mintemp_c,
                            avgtemp_c,
                            condition: { text, code }
                        }
                    }: any,
                    index: number
                ) => {
                    weeklyWeather[index] = {
                        code,
                        date,
                        day: new Date(date).getDay(),
                        sunrise,
                        sunset,
                        text,
                        avgTemp: parseInt(avgtemp_c),
                        maxTemp: parseInt(maxtemp_c),
                        minTemp: parseInt(mintemp_c),
                        maxIcon: weatherIcon(code, true)?.maxIcon as JSX.Element,
                        backgroundColor: weatherIcon(code, true)?.backgroundColor as string
                    }
                }
            )
            setWeeklyWeatherInfo(weeklyWeather)
        }
    }

    const CallHourlyWeather = async () => {
        if (!isEmpty(myAddressList)) {
            const {
                data: {
                    forecast: { forecastday }
                }
            } = await axios.get(WEATHER_BASE_URL("forecast") + "&q=" + myAddressList[0].coordinate.latitude + "," + myAddressList[0]?.coordinate.longitude + "&days=2&aqi=no&lang=ko")

            // const { hour } = forecastday[0]
            const hourlyWeather = [] as HOUR_WEATHER[]

            let count = 0
            for (let i = 0; i < forecastday.length; i++) {
                forecastday[i].hour.map(({ condition: { code }, time_epoch, is_day, time, temp_c, uv, feelslike_c, wind_dir, wind_mph, precip_mm, humidity, will_it_rain, will_it_snow, chance_of_rain, chance_of_snow }: any) => {
                    if (count > 16) {
                        return
                    }
                    if (time_epoch * 1000 > Date.now()) {
                        hourlyWeather[count] = {
                            hour: time.split(" ")[1].split(":")[0],
                            minIcon: weatherIcon(code, is_day)?.minIcon as JSX.Element,
                            temp: parseInt(temp_c),
                            uv: parseInt(uv),
                            feelslike: parseInt(feelslike_c),
                            windDir: wind_dir,
                            windSpeed: parseInt(wind_mph),
                            precip_mm: parseInt(precip_mm),
                            humidity: parseInt(humidity),
                            will_it_rain,
                            will_it_snow,
                            chance_of_rain,
                            chance_of_snow
                        }
                        count++
                    }
                })
            }

            setHourWeatherInfo(hourlyWeather)
        }
    }

    // const CallAllWeather = () => {
    //     if (!isEmpty(myAddressList)) {
    //         const xobj = new XMLHttpRequest()
    //         xobj.open("GET", WEATHER_BASE_URL + "&q=" + myAddressList[0].coordinate.latitude + "," + myAddressList[0]?.coordinate.longitude + "&aqi=no&lang=ko")
    //         xobj.onreadystatechange = () => {
    //             if (xobj.readyState !== 4) {
    //                 return
    //             }

    //             const { days, currentConditions } = JSON.parse(xobj.response)

    //             setCurrentWeatherInfo({
    //                 sunrise: currentConditions.sunrise.slice(":", 5),
    //                 sunset: currentConditions.sunset.slice(":", 5),
    //                 datetimeEpoch: currentConditions.datetimeEpoch * 1000,
    //                 currentTemp: FahrenheitToCelsius(currentConditions.temp),
    //                 feelsLike: FahrenheitToCelsius(currentConditions.feelslike),
    //                 max: FahrenheitToCelsius(days[0].tempmax),
    //                 min: FahrenheitToCelsius(days[0].tempmin),
    //                 precipprob: days[0].precipprob,
    //                 humidity: currentConditions.humidity,
    //                 windspeed: currentConditions.windspeed,
    //                 winddir: WinddirFormat(currentConditions.winddir),
    //                 windname: WindNameFormat(currentConditions.windspeed),
    //                 description: days[0].description, //  jsonResponse.current.weather[0].description
    //                 uxindex: currentConditions.uvindex,
    //                 summary: weatherDesc[currentConditions.icon].text,
    //                 minIcon: weatherDesc[currentConditions.icon].minIcon,
    //                 maxIcon: weatherDesc[currentConditions.icon].maxIcon,
    //                 backgroundColor: weatherDesc[currentConditions.icon].backgroundColor
    //             })

    //             let hourWeather = [] as HOUR_WEATHER[]
    //             days[0].hours.map(({ icon, datetime, temp, feelslike, windspeed, winddir, precipprob }: CUSTOM_HOUR_WEATHER) => {
    //                 hourWeather.push({
    //                     minIcon: weatherDesc[icon].minIcon,
    //                     maxIcon: weatherDesc[icon].maxIcon,
    //                     hour: datetime.split(":")[0],
    //                     temp: FahrenheitToCelsius(temp),
    //                     feelslike: FahrenheitToCelsius(feelslike),
    //                     windspeed,
    //                     windname: WindNameFormat(windspeed),
    //                     winddir: WinddirFormat(winddir),
    //                     precipprob
    //                 })
    //             })
    //             setHourWeatherInfo(hourWeather)

    //             let weeklyWeatherList = [] as WEEKELY_WEATHER[]
    //             for (let i = 0; i <= 7; i++) {
    //                 weeklyWeatherList.push({
    //                     max: FahrenheitToCelsius(days[i].tempmax),
    //                     min: FahrenheitToCelsius(days[i].tempmin),
    //                     minIcon: weatherDesc[days[i].icon].minIcon,
    //                     maxIcon: weatherDesc[days[i].icon].maxIcon,
    //                     date: days[i].datetime.split("-")[2],
    //                     day: new Date(days[i].datetime).getDay(),
    //                     description: weatherDesc[days[i].icon].text
    //                 })
    //             }
    //             setWeeklyWeatherInfo(weeklyWeatherList)
    //         }

    //         xobj.send("")
    //     }
    // }

    return { CallCurrentWeather, CallTodayWeather, CallWeeklyWeather, CallHourlyWeather }
}
