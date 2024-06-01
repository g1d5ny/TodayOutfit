import { useRecoilValue, useSetRecoilState } from "recoil"
import { currentWeatherInfoState, getStorage, hourWeatherInfoState, myAddressListState, todayWeatherInfoState, weather, weeklyWeatherInfoState } from "../store"
import { CURRENT_WEATHER, HOUR_WEATHER, WEEKELY_WEATHER } from "../type"
import { getCurrentWeather, getDailyWeather } from "api/weather"
import { Alert } from "react-native"
import { TextAlarm } from "text/AlarmText"
import { fetchCurrentDesc } from "api/openai/index"

export const useWeatherHook = () => {
    const myAddressList = useRecoilValue(myAddressListState)
    const setCurrentWeatherInfo = useSetRecoilState(currentWeatherInfoState)
    const setTodayWeatherInfo = useSetRecoilState(todayWeatherInfoState)
    const setHourWeatherInfo = useSetRecoilState(hourWeatherInfoState)
    const setWeeklyWeatherInfo = useSetRecoilState(weeklyWeatherInfoState)

    const CallCurrentWeather = async () => {
        if (myAddressList) {
            const {
                coordinate: { longitude, latitude }
            } = myAddressList[0]

            getCurrentWeather(longitude, latitude)
                .then(({ current }) => {
                    setCurrentWeather(current)
                })
                .catch(rej => {
                    Alert.alert(TextAlarm.error_0, rej)
                    console.error(rej)
                })
        }
    }

    const CallTodayWeather = async () => {
        if (myAddressList) {
            const {
                coordinate: { longitude, latitude }
            } = myAddressList[0]

            getDailyWeather(longitude, latitude, 1).then(({ forecast: { forecastday } }) => {
                const {
                    date_epoch,
                    astro: { sunrise, sunset },
                    day: {
                        maxtemp_c,
                        mintemp_c,
                        avgtemp_c,
                        uv,
                        maxwind_kph,
                        daily_chance_of_rain,
                        daily_chance_of_snow,
                        daily_will_it_rain,
                        daily_will_it_snow,
                        condition: { code }
                    }
                } = forecastday[0]

                setTodayWeatherInfo({
                    code,
                    sunrise,
                    sunset,
                    text: weather(code, true)?.text as string,
                    uv,
                    maxWindSpeed: maxwind_kph,
                    willItRain: daily_will_it_rain,
                    willItSnow: daily_will_it_snow,
                    rainPercentage: daily_chance_of_rain,
                    snowPercentage: daily_chance_of_snow,
                    datetimeEpoch: date_epoch,
                    avgTemp: parseInt(avgtemp_c),
                    maxTemp: parseInt(maxtemp_c),
                    minTemp: parseInt(mintemp_c),
                    minIcon: weather(code, true)?.minIcon as JSX.Element,
                    maxIcon: weather(code, true)?.maxIcon as JSX.Element,
                    backgroundColor: weather(code, true)?.backgroundColor as string
                })
            })
        }
    }

    const CallWeeklyWeather = async () => {
        if (myAddressList) {
            const {
                coordinate: { longitude, latitude }
            } = myAddressList[0]

            getDailyWeather(longitude, latitude, 3).then(({ forecast: { forecastday } }) => {
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
                                condition: { text, code },
                                uv,
                                maxwind_kph,
                                daily_chance_of_rain,
                                daily_chance_of_snow,
                                daily_will_it_rain,
                                daily_will_it_snow
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
                            uv,
                            maxWindSpeed: maxwind_kph,
                            rainPercentage: daily_chance_of_rain,
                            snowPercentage: daily_chance_of_snow,
                            willItRain: daily_will_it_rain,
                            willItSnow: daily_will_it_snow,
                            avgTemp: parseInt(avgtemp_c),
                            maxTemp: parseInt(maxtemp_c),
                            minTemp: parseInt(mintemp_c),
                            maxIcon: weather(code, true)?.maxIcon as JSX.Element,
                            minIcon: weather(code, true)?.minIcon as JSX.Element,
                            backgroundColor: weather(code, true)?.backgroundColor as string
                        }
                    }
                )
                setWeeklyWeatherInfo(weeklyWeather)
            })
        }
    }

    const CallHourlyWeather = async () => {
        if (myAddressList) {
            const {
                coordinate: { longitude, latitude }
            } = myAddressList[0]

            getDailyWeather(longitude, latitude, 2).then(({ forecast: { forecastday } }) => {
                const hourlyWeather = [] as HOUR_WEATHER[]

                let count = 0
                for (let i = 0; i < forecastday.length; i++) {
                    forecastday[i].hour.map(
                        ({
                            condition: { code },
                            time_epoch,
                            is_day,
                            time,
                            temp_c,
                            uv,
                            feelslike_c,
                            wind_dir,
                            wind_kph,
                            precip_mm,
                            humidity,
                            will_it_rain,
                            will_it_snow,
                            chance_of_rain,
                            chance_of_snow
                        }: any) => {
                            if (count > 16) {
                                return
                            }
                            if (time_epoch * 1000 > Date.now()) {
                                hourlyWeather[count] = {
                                    hour: time.split(" ")[1].split(":")[0],
                                    minIcon: weather(code, is_day)?.minIcon as JSX.Element,
                                    temp: parseInt(temp_c),
                                    uv: parseInt(uv),
                                    feelslike: parseInt(feelslike_c),
                                    windDir: wind_dir,
                                    windSpeed: parseInt(wind_kph),
                                    precip_mm: parseInt(precip_mm),
                                    humidity: parseInt(humidity),
                                    willItRain: will_it_rain,
                                    willItSnow: will_it_snow,
                                    rainPercentage: chance_of_rain,
                                    snowPercentage: chance_of_snow
                                }
                                count++
                            }
                        }
                    )
                }

                setHourWeatherInfo(hourlyWeather)
            })
        }
    }

    const setCurrentWeather = async (current: any) => {
        const {
            temp_c,
            is_day,
            precip_mm,
            humidity,
            feelslike_c,
            uv,
            wind_dir,
            wind_kph,
            condition: { code }
        } = current

        const gender = await getStorage("gender")

        fetchCurrentDesc(code, temp_c, feelslike_c, humidity, precip_mm, uv, wind_dir, wind_kph, is_day, gender).then(({ choices }: any) => {
            const {
                message: { content }
            } = choices[0]

            const parsedData = JSON.parse(content)
            const {
                costume: { top, topDesc, bottom, bottomDesc },
                desc
            } = parsedData

            setCurrentWeatherInfo({
                code,
                temp: parseInt(temp_c),
                is_day,
                maxIcon: weather(code, is_day)?.maxIcon as JSX.Element,
                minIcon: weather(code, is_day)?.minIcon as JSX.Element,
                backgroundColor: weather(code, is_day)?.backgroundColor as string,
                desc,
                costume: { top, topDesc, bottom, bottomDesc }
            })
        })
    }

    return { CallCurrentWeather, CallTodayWeather, CallWeeklyWeather, CallHourlyWeather }
}
