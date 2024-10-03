import { Alert } from "react-native"
import { TextAlarm } from "../text/AlarmText"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { inputAddressState, resultAdressListState } from "../store"
import { coordinateToAddressApi, searchAddressApi } from "api/address"

export const useAddressHook = () => {
    const setResultAddress = useSetRecoilState(resultAdressListState)
    const { value } = useRecoilValue(inputAddressState)

    const searchAddress = async () => {
        return searchAddressApi(encodeURIComponent(value))
            .then(({ errorType, meta: { total_count }, documents }) => {
                if (!!errorType || total_count === 0) {
                    setResultAddress(["NOT_FOUND"])
                    return
                }
                setResultAddress(documents)
            })
            .catch(({ message }) => {
                Alert.alert(TextAlarm.error_0, message)
                console.error(message)
            })
    }

    const addressToCoordinate = async (address: string) => {
        return searchAddressApi(address)
            .then(data => {
                return data
            })
            .catch(({ message }) => {
                Alert.alert(TextAlarm.error_0, message)
                console.error("server error", message)
            })
    }

    const coordinateToAddress = async (lng: number, lat: number) => {
        return coordinateToAddressApi(lng, lat)
            .then(data => {
                return data
            })
            .catch(({ message }) => {
                Alert.alert(TextAlarm.error_0, message)
                console.error(message)
            })
    }

    return { searchAddress, addressToCoordinate, coordinateToAddress }
}
