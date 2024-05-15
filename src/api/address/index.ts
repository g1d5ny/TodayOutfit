import { KAKAO_ADDRESS_BASE_URL, KAKAO_ADDRESS_KEY, KAKAO_COORDINATE_BASE_URL } from "asset/key"
import axios from "axios"

export const searchAddressApi = async (address: string) => {
    const resp = await axios.get(KAKAO_ADDRESS_BASE_URL(address), {
        headers: { Authorization: `KakaoAK ${KAKAO_ADDRESS_KEY}` }
    })

    return resp.data
}

export const coordinateToAddressApi = async (lng: number, lat: number) => {
    const resp = await axios.get(KAKAO_COORDINATE_BASE_URL(lng, lat), {
        headers: {
            Authorization: `KakaoAK ${KAKAO_ADDRESS_KEY}`,
            "Content-type": "application/json"
        }
    })
    return resp.data
}
