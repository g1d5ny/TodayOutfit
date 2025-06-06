import { OPEN_AI_BASE_URL, OPEN_AI_KEY } from "@env"
import axios from "axios"
import { isTablet, Weather } from "store"
import { BoyTopClothes, CommonBottomClothes, GirlBottomClothes, GirlTopClothes } from "store/clothes"
import { GENDER } from "type"

export const currentDescApi = async (code: Weather, temp: number, feels_like: number, humidity: number, rain: number, uv: number, wind_deg: string, wind_speed: number, is_day: number, gender: GENDER) => {
    const prompt = `현재 날씨 정보는 다음과 같습니다.
    기후 코드: ${code}
    현재 온도: ${temp}°C
    체감 온도: ${feels_like}°C
    습도: ${humidity}%
    비: ${rain} mm
    자외선 지수: ${uv}
    풍향: ${wind_deg}°
    풍속: ${wind_speed} k/s
    낮 여부: ${Boolean(is_day)}
    사용자 성별: ${gender}
    태블릿 여부: ${isTablet}

    이 데이터를 기반으로 현재 날씨에 맞게 사용자가 취해야할 액션 한 줄과, 사용자에게 현재 입어야할 의상 추천을 해주세요.

    출력 형식: {"costume": { "top":사용자 성별이 W인 경우 ${JSON.stringify(GirlTopClothes)}, 사용자 성별이 M인 경우 ${JSON.stringify(BoyTopClothes)} 중에 태블릿이면 2개 아니면 1개, "topDesc": "2어절의 상의 설명. 형용사로 끝나는", 
    "bottom":사용자 성별이 W인 경우 ${JSON.stringify(GirlBottomClothes)}, 사용자 성별이 M인 경우 ${JSON.stringify(
        CommonBottomClothes
    )} 중에 태블릿이면 2개 아니면 1개, "bottomDesc": "2어절의 하의 설명. 형용사로 끝나는" }, "desc": 이모지 섞어서 한 줄 조언}
    `

    const resp = await axios.post(OPEN_AI_BASE_URL + "v1/chat/completions", { model: "gpt-4o", messages: [{ role: "user", content: prompt }] }, { headers: { Authorization: `Bearer ${OPEN_AI_KEY}`, "Content-Type": "application/json" } })
    return resp.data
}

export const fetchVectorStores = async () => {
    const resp = await axios.get(OPEN_AI_BASE_URL + "v1/files", {
        headers: { Authorization: `Bearer ${OPEN_AI_KEY}`, "Content-Type": "application/json" }
    })
    return resp.data
}
