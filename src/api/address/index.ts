import axios from "axios"

export const getAddressLocation = async (lng: number, lat: number) => {
    const resp = await axios.get("https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" + lng + "&y=" + lat + "&input_coord=WGS84")
    return resp.data
}
