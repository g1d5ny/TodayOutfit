import { useRecoilValue, useSetRecoilState } from "recoil"
import { currentWeatherInfoState, getStorage, hourWeatherInfoState, isTablet, myAddressListState, weather, weeklyWeatherInfoState } from "../store"
import { CURRENT, Choice, FORECAST_DAY, HOUR, HOUR_WEATHER, WEEKELY_WEATHER } from "../type"
import { getCurrentWeather, getDailyWeather } from "api/weather"
import { Alert } from "react-native"
import { TextAlarm } from "text/AlarmText"
import { fetchCurrentDesc } from "api/openai/index"
import { CostumePath } from "store/clothes"

export const useWeatherHook = () => {
    const myAddressList = useRecoilValue(myAddressListState)
    const setCurrentWeatherInfo = useSetRecoilState(currentWeatherInfoState)
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

    const CallDailyWeather = async () => {
        if (myAddressList) {
            const {
                coordinate: { longitude, latitude }
            } = myAddressList[0]

            getDailyWeather(longitude, latitude, 3).then(({ forecast: { forecastday } }) => {
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
                        }: HOUR) => {
                            if (count > 16) {
                                return
                            }
                            if (time_epoch * 1000 > Date.now()) {
                                hourlyWeather[count] = {
                                    hour: time.split(" ")[1].split(":")[0],
                                    minIcon: weather(code, Boolean(is_day))?.minIcon as JSX.Element,
                                    temp: Math.trunc(temp_c),
                                    uv,
                                    feelslike: parseInt(feelslike_c),
                                    windDir: wind_dir,
                                    windSpeed: wind_kph,
                                    precip_mm,
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
                        }: FORECAST_DAY,
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
                            willItRain: Boolean(daily_will_it_rain),
                            willItSnow: Boolean(daily_will_it_snow),
                            avgTemp: Math.trunc(avgtemp_c),
                            maxTemp: Math.trunc(maxtemp_c),
                            minTemp: Math.trunc(mintemp_c),
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

    const setCurrentWeather = async (current: CURRENT) => {
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

        fetchCurrentDesc(code, temp_c, feelslike_c, humidity, precip_mm, uv, wind_dir, wind_kph, is_day, gender).then(({ choices }: { choices: Choice[] }) => {
            const {
                message: { content }
            } = choices[0]

            let parsedData
            if (content.startsWith("```json") && content.endsWith("```")) {
                parsedData = JSON.parse(content.slice(7, -3).trim())
            } else {
                parsedData = JSON.parse(content)
            }

            const {
                costume: { top, topDesc, bottom, bottomDesc },
                desc
            } = parsedData

            parsedData.costume.top[0].path = CostumePath[top[0]?.en ?? "t_shirt"]
            parsedData.costume.bottom[0].path = CostumePath[bottom[0]?.en ?? "jeans"]

            if (isTablet) {
                parsedData.costume.top[1].path = CostumePath[top[1]?.en ?? "t_sirt"]
                parsedData.costume.bottom[1].path = CostumePath[bottom[1]?.en ?? "jeans"]
            }

            setCurrentWeatherInfo({
                code,
                temp: Math.trunc(temp_c),
                is_day: Boolean(is_day),
                maxIcon: weather(code, Boolean(is_day))?.maxIcon as JSX.Element,
                minIcon: weather(code, Boolean(is_day))?.minIcon as JSX.Element,
                backgroundColor: weather(code, Boolean(is_day))?.backgroundColor as string,
                desc,
                costume: { top, topDesc, bottom, bottomDesc }
            })
        })
    }

    return { CallCurrentWeather, CallDailyWeather }
}
