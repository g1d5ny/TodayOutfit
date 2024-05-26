import { OPEN_AI_BASE_URL, OPEN_AI_KEY } from "asset/key"
import axios from "axios"
import { EtcCostume, EtcWomanCostume, OnePice, Outer, Pants, Skirt, Top, currentDate } from "store"
import { GENDER } from "type"

export const fetchCurrentDesc = async (
    code: string,
    temp: number,
    feels_like: number,
    humidity: number,
    rain: number,
    uv: number,
    wind_deg: string,
    wind_speed: number,
    is_day: boolean,
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
    풍속: ${wind_speed} m/s
    낮 여부: ${Boolean(is_day)}

    이 데이터를 기반으로 현재 날씨에 맞게 사용자가 취해야할 액션과, 사용자에게 현재 입어야할 의상 추천을 해주세요. 사용자 성별은 ${gender}가 "W"면 여자, "M"이면 남자입니다.

    사용자가 취해야할 액션은 반드시 현재 날씨에 취해야할 액션만 있어야하며 한 줄로 작성하고, 현재 날짜는 ${new Date()}이므로 계절을 참고하여 작성해주세요.

    사용자가 입어야 할 의상은 상의, 간단한 상의 설명, 하의, 간단한 하의 설명 입니다.

    간단한 상/하의 설명 조건 : "~한"으로 문장 구조를 이뤄야 함.

    한 줄 조언에는 절대 의상 관련한 얘기가 없어야 하며 언어는 한국어로 출력해주세요.

    출력 형식: {"costume": { "top": "상의", "topDesc": "간단한 상의 설명", "bottom": "하의", "bottomDesc": "간단한 하의 설명" }, "desc": 한 줄 조언}
    `

    const resp = await axios.post(
        OPEN_AI_BASE_URL + "v1/chat/completions",
        { model: "gpt-3.5-turbo", messages: [{ role: "user", content: prompt }] },
        { headers: { Authorization: `Bearer ${OPEN_AI_KEY}`, "Content-Type": "application/json" } }
    )

    return resp.data
}
