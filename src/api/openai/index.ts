import { OPEN_AI_BASE_URL, OPEN_AI_KEY } from "@env"
import axios from "axios"
import { isTablet, Weather } from "store"
import { OnePice, Outer, Pants, Skirt, Top } from "store/clothes"
import { GENDER } from "type"

export const currentDescApi = async (
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
    태블릿 여부: ${isTablet}

    이 데이터를 기반으로 현재 날씨에 맞게 사용자가 취해야할 액션 한 줄과, 사용자에게 현재 입어야할 의상 추천을 해주세요. 언어는 한국어로 출력해주세요.

    사용자가 입어야 할 의상은 상의, 하의이며 형용사로 끝나는 각각의 설명이 필요합니다.

    상의는 ${JSON.stringify(Outer)}, ${JSON.stringify(Top)},(사용자가 여자면) ${JSON.stringify(OnePice)}
    하의는 ${JSON.stringify(Pants)}, (사용자가 여자면) ${JSON.stringify(Skirt)} 이 중에서 선택해주세요.

    출력 형식: {"costume": { "top":${JSON.stringify(Outer)}, ${JSON.stringify(Top)}, ${JSON.stringify(
        OnePice
    )} 중에 태블릿이면 2개 아니면 1개, "topDesc": "형용사로 끝나는 상의 설명", "bottom": ${JSON.stringify(Pants)}, ${JSON.stringify(
        Skirt
    )} 중에 태블릿이면 2개 아니면 1개, "bottomDesc": "형용사로 끝나는 하의 설명" }, "desc": 한 줄 조언}
    `

    const resp = await axios.post(
        OPEN_AI_BASE_URL + "v1/chat/completions",
        { model: "gpt-4o", messages: [{ role: "user", content: prompt }] },
        { headers: { Authorization: `Bearer ${OPEN_AI_KEY}`, "Content-Type": "application/json" } }
    )

    return resp.data
}

export const fetchVectorStores = async () => {
    const resp = await axios.get(OPEN_AI_BASE_URL + "v1/files", {
        headers: { Authorization: `Bearer ${OPEN_AI_KEY}`, "Content-Type": "application/json" }
    })
    return resp.data
}
