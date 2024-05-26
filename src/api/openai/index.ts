import { OPEN_AI_BASE_URL, OPEN_AI_KEY } from "asset/key"
import axios from "axios"

export const openAi = async (code: string, temp: number, feels_like: number, humidity: number, rain: number, uv: number, wind_deg: string, wind_speed: number) => {
    const prompt = `현재 날씨 정보는 다음과 같습니다.
    기후 코드: ${code}
    현재 온도: ${temp}°C
    체감 온도: ${feels_like}°C
    습도: ${humidity}%
    비: ${rain} mm
    자외선 지수: ${uv}
    풍향: ${wind_deg}°
    풍속: ${wind_speed} m/s
    이 날씨에 대해 현재 날씨의 설명과 유저의 액션에 대해 한 줄로 조언을 작성해 주세요. 반드시 한 줄로 작성하세요.`
    const resp = await axios.post(
        OPEN_AI_BASE_URL + "v1/chat/completions",
        { model: "gpt-3.5-turbo", messages: [{ role: "user", content: prompt }] },
        { headers: { Authorization: `Bearer ${OPEN_AI_KEY}`, "Content-Type": "application/json" } }
    )

    return resp.data
}
