import { useQuery } from "@tanstack/react-query"
import { generateOutfitImage } from "api/openai"
import { useRecoilValue } from "recoil"
import { currentWeatherInfoState } from "store"

export const useWeatherOutfitHook = () => {
    const currentWeather = useRecoilValue(currentWeatherInfoState)

    const { data, isLoading, error } = useQuery({
        queryKey: [currentWeather.costume.top, currentWeather.costume.bottom],
        queryFn: async () => {
            const data = await generateOutfitImage(currentWeather.costume.top, currentWeather.costume.bottom)
            if (data.data[0].url) {
                return data.data[0].url
            }
        },
        enabled: !!currentWeather.costume,
        staleTime: 1000 * 60 * 60, // 1시간
        throwOnError: true
    })

    return { data, isLoading }
}
