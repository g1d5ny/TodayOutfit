import { OPEN_AI_BASE_URL, OPEN_AI_KEY } from "@env"
import axios from "axios"
import { Weather } from "store"
import { GENDER } from "type"

export const fetchCurrentDesc = async (
    code: Weather,
    temp: number,
    feels_like: number,
    humidity: number,
    rain: number,
    uv: number,
    wind_deg: string,
    wind_speed: number,
    is_day: number,
    gender: GENDER
) => {
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
    사용자 성별: ${gender} ("W"면 여자, "M"이면 남자)
    현재 날짜: ${new Date()} (계절 참고용)

    이 데이터를 기반으로 현재 날씨에 맞게 사용자가 취해야할 액션 한 줄과, 사용자에게 현재 입어야할 의상 추천을 해주세요. 언어는 한국어로 출력해주세요.

    사용자가 입어야 할 의상은 상의, 하의, 형용사로 끝나는 간단한 상,하의 설명 입니다.
    
    출력 형식: {"costume": { "top": "상의", "topDesc": "간단한 상의 설명", "bottom": "하의", "bottomDesc": "간단한 하의 설명" }, "desc": 한 줄 조언}
    `

    const resp = await axios.post(
        OPEN_AI_BASE_URL + "v1/chat/completions",
        { model: "gpt-3.5-turbo", messages: [{ role: "user", content: prompt }] },
        { headers: { Authorization: `Bearer ${OPEN_AI_KEY}`, "Content-Type": "application/json" } }
    )

    return resp.data
}
