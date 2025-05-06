import { useQuery } from "@tanstack/react-query"
import { currentDescApi } from "api/openai"
import { getCurrentWeatherApi } from "api/weather"
import { Alert } from "react-native"
import { useRecoilValue } from "recoil"
import { getStorage, isTablet, myAddressListState, weather } from "store"
import { BoyCharacterCostumePath, BoyClothesPath, GirlCharacterCostumePath, GirlClothesPath } from "store/clothes"
import { TextAlarm } from "text/AlarmText"
import { Clothes } from "type"

export const fetchCurrentWeatherQuery = () => {
    const myAddressList = useRecoilValue(myAddressListState)

    const {
        coordinate: { longitude, latitude }
    } = myAddressList[0]

    const { data, isLoading, error } = useQuery({
        queryKey: [longitude, latitude],
        queryFn: async () => {
            const data = await getCurrentWeatherApi(longitude, latitude)
            const { current } = data

            if (!data || !current) {
                Alert.alert(TextAlarm.error_0)
                throw new Error("No results found.")
            }

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
            const descData = await currentDescApi(code, temp_c, feelslike_c, humidity, precip_mm, uv, wind_dir, wind_kph, is_day, gender)
            const { choices } = descData

            if (!choices) {
                Alert.alert(TextAlarm.error_0)
                throw new Error("No results found.")
            }

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

            if (gender === "W") {
                parsedData.costume.top[0].path = GirlClothesPath[top[0]?.en as Clothes] // ?? TODO 체감온도 맞춰서 추천
                parsedData.costume.bottom[0].path = GirlClothesPath[bottom[0]?.en as Clothes] // ?? TODO 체감온도 맞춰서 추천
                if (isTablet) {
                    if (parsedData.costume.top[1]) {
                        parsedData.costume.top[1].path = GirlClothesPath[top[1]?.en as Clothes] // ?? TODO 체감온도 맞춰서 추천
                    }
                    if (parsedData.costume.bottom[1]) {
                        parsedData.costume.bottom[1].path = GirlClothesPath[bottom[1]?.en as Clothes] // ?? TODO 체감온도 맞춰서 추천
                    }
                    parsedData.character = GirlCharacterCostumePath[top[0]?.en as Clothes] ?? GirlCharacterCostumePath[top[1]?.en as Clothes] ?? GirlCharacterCostumePath[bottom[0]?.en as Clothes] ?? GirlCharacterCostumePath[bottom[1]?.en as Clothes] // ?? TODO 체감온도 맞춰서 추천
                }
            } else {
                parsedData.costume.top[0].path = BoyClothesPath[top[0]?.en as Clothes] // ?? TODO 체감온도 맞춰서 추천
                parsedData.costume.bottom[0].path = BoyClothesPath[bottom[0]?.en as Clothes] // ?? TODO 체감온도 맞춰서 추천
                if (isTablet) {
                    if (parsedData.costume.top[1]) {
                        parsedData.costume.top[1].path = BoyClothesPath[top[1]?.en as Clothes] // ?? TODO 체감온도 맞춰서 추천
                    }
                    if (parsedData.costume.bottom[1]) {
                        parsedData.costume.bottom[1].path = BoyClothesPath[bottom[1]?.en as Clothes] // ?? TODO 체감온도 맞춰서 추천
                    }
                    parsedData.character = BoyCharacterCostumePath[top[0]?.en as Clothes] ?? BoyCharacterCostumePath[top[1]?.en as Clothes] ?? BoyCharacterCostumePath[bottom[0]?.en as Clothes] ?? BoyCharacterCostumePath[bottom[1]?.en as Clothes] // ?? TODO 체감온도 맞춰서 추천
                }
            }

            return {
                code,
                temp: Math.trunc(temp_c),
                is_day: Boolean(is_day),
                maxIcon: weather(code, Boolean(is_day))?.maxIcon as JSX.Element,
                minIcon: weather(code, Boolean(is_day))?.minIcon as JSX.Element,
                backgroundColor: weather(code, Boolean(is_day))?.backgroundColor as string,
                desc,
                character: parsedData.character,
                costume: { top, topDesc, bottom, bottomDesc }
            }
        },
        enabled: !!myAddressList,
        staleTime: 1000 * 60 * 60, // 1시간
        throwOnError: true
    })

    return { data, isLoading, error }
}
