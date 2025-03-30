import { OPEN_AI_BASE_URL, OPEN_AI_KEY } from "@env"
import axios from "axios"
import { getStorage, isTablet, Weather } from "store"
import { GENDER } from "type"

// 상의는 ${JSON.stringify(Outer)}, ${JSON.stringify(Top)},(사용자가 여자면) ${JSON.stringify(OnePice)}
// 하의는 ${JSON.stringify(Pants)}, (사용자가 여자면) ${JSON.stringify(Skirt)} 이 중에서 선택해주세요.

// 출력 형식: {"costume": { "top":${JSON.stringify(Outer)}, ${JSON.stringify(Top)}, ${JSON.stringify(OnePice)} 중에 태블릿이면 2개 아니면 1개, "topDesc": "형용사로 끝나는 상의 설명", "bottom": ${JSON.stringify(Pants)}, ${JSON.stringify(
//     Skirt
// )} 중에 태블릿이면 2개 아니면 1개, "bottomDesc": "형용사로 끝나는 하의 설명" }, "desc": 한 줄 조언}

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
    사용자 성별: ${gender} ("W"면 여자, "M"이면 남자)
    현재 날짜: ${new Date()} (계절 참고용)
    태블릿 여부: ${isTablet}

    이 데이터를 기반으로 현재 날씨에 맞게 사용자가 취해야할 액션 한 줄과, 사용자에게 현재 입어야할 의상 추천을 해주세요. 언어는 한국어로 출력해주세요.

    사용자가 입어야 할 의상은 상의, 하의이며 형용사로 끝나는 각각의 설명이 필요합니다.
    
    출력 형식: {"costume": { "top": ["상의명", "상의명"], "topDesc": "상의 설명 형용사로 끝나게", "bottom": ["하의명", "하의명"], "bottomDesc": "하의 설명 형용사로 끝나게" }, "desc": 한 줄 조언}
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

export const generateOutfitImage = async (top: string[], bottom: string[]) => {
    const gender = await getStorage("gender")
    const prompt = `성별이 ${gender}인 사람이 입을 ${top[0]}, ${bottom[0]} 세트와 ${top[1]}, ${bottom[1]} 세트를 각각 입은 캐릭터를 사람에 가깝게 3D로 그려주세요. 캐릭터는 2명만 있어야하며 얼굴의 눈코입을 다 그려주고, 전신이 있어야합니다. 배경은 흰색, 외부 요소는 어떤 것도 없이 그려주세요.`
    const resp = await axios.post(OPEN_AI_BASE_URL + "v1/images/generations", { model: "dall-e-3", prompt, n: 1, size: "1024x1024" }, { headers: { Authorization: `Bearer ${OPEN_AI_KEY}`, "Content-Type": "application/json" } })
    return resp.data
}

export const generateBackgroundImage = async () => {
    const prompt = `이 데이터를 요청한 현재 시간대와 맞는 배경을 3d로 그려주세요.`
    const resp = await axios.post(OPEN_AI_BASE_URL + "v1/images/generations", { model: "dall-e-3", prompt, n: 1, size: "1024x1024" }, { headers: { Authorization: `Bearer ${OPEN_AI_KEY}`, "Content-Type": "application/json" } })
    return resp.data.error
        ? "https://oaidalleapiprodscus.blob.core.windows.net/private/org-H9yGHWPf8O8ermk1fk4TFIsW/user-5OpSNHTz04EPSlqUTE9Y6ZtO/img-eMDJXrkAgShtpiJsKfUVXjXC.png?st=2025-03-30T07%3A12%3A44Z&se=2025-03-30T09%3A12%3A44Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-30T01%3A31%3A44Z&ske=2025-03-31T01%3A31%3A44Z&sks=b&skv=2024-08-04&sig=1VylIHOnhoUZzHbY9CuDgiei6qiNBY6/9jesRGWaNOc%3D"
        : resp.data
}
