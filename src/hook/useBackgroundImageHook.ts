import { useQuery } from "@tanstack/react-query"
import { generateBackgroundImage } from "api/openai"
import { useRecoilValue } from "recoil"
import { currentWeatherInfoState } from "store"

export const useBackgroundImageHook = () => {
    const currentWeather = useRecoilValue(currentWeatherInfoState)

    const { data, isLoading, error } = useQuery({
        queryKey: [currentWeather?.is_day],
        queryFn: async () => {
            const data = await generateBackgroundImage()
            if (data.data[0].url) {
                return data.data[0].url
            }
        },
        enabled: currentWeather?.is_day,
        staleTime: 1000 * 60 * 60, // 1시간
        throwOnError: true
    })

    return { data, isLoading, error }
}
