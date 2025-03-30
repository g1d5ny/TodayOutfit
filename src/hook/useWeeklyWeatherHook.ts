import { useQuery } from "@tanstack/react-query"
import { getDailyWeatherApi } from "api/weather"
import { Alert } from "react-native"
import { useRecoilValue } from "recoil"
import { myAddressListState, weather } from "store"
import { TextAlarm } from "text/AlarmText"
import { FORECAST_DAY, HOUR, HOUR_WEATHER, WEEKELY_WEATHER } from "type"

export const useWeeklyWeatherHook = () => {
    const myAddressList = useRecoilValue(myAddressListState)

    const {
        coordinate: { longitude, latitude }
    } = myAddressList[0]

    const { data, isLoading, error } = useQuery({
        queryKey: [longitude, latitude, 3],
        queryFn: async () => {
            const data = await getDailyWeatherApi(longitude, latitude, 3)
            const {
                forecast: { forecastday }
            } = data

            if (!data || !forecastday) {
                Alert.alert(TextAlarm.error_0)
                return { hourlyWeather: [], weeklyWeather: [] }
            }

            const hourlyWeather = [] as HOUR_WEATHER[]

            let count = 0
            for (let i = 0; i < forecastday.length; i++) {
                forecastday[i].hour.map(({ condition: { code }, time_epoch, is_day, time, temp_c, uv, feelslike_c, wind_dir, wind_kph, precip_mm, humidity, will_it_rain, will_it_snow, chance_of_rain, chance_of_snow }: HOUR) => {
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
                })
            }

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

            return { hourlyWeather, weeklyWeather }
        },
        enabled: !!myAddressList,
        staleTime: 1000 * 60 * 60, // 1시간
        throwOnError: true
    })

    return { data, isLoading, error }
}
