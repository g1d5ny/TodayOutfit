import { Alert } from "react-native"
import { TextAlarm } from "../text/AlarmText"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { inputAddressState } from "../store"
import { searchAddressApi } from "api/address"
import { useQuery } from "@tanstack/react-query"

export const useAddressHook = () => {
    const { value } = useRecoilValue(inputAddressState)

    const fetchAddressData = () => {
        const { data, isLoading, error } = useQuery({
            queryKey: ["errorType", "meta", "documents"],
            queryFn: async () => {
                const response = await searchAddressApi(encodeURIComponent(value))
                return response.data
            }
        })

        return { data, isLoading, error }
    }

    return { fetchAddressData }
}
