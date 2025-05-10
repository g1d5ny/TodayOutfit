import { useQuery } from "@tanstack/react-query"
import { searchAddressApi } from "api/address"
import { Alert } from "react-native"
import { useRecoilValue } from "recoil"
import { TextAlarm } from "text/AlarmText"
import { inputAddressState, queryClient } from "../store"

export const searchAddressQuery = () => {
    const { value, isEditing } = useRecoilValue(inputAddressState)
    const onSubmitEditing = !!value && !isEditing

    const { data, isLoading, error } = useQuery({
        queryKey: [value],
        queryFn: async () => {
            const data = await searchAddressApi(encodeURIComponent(value))
            const {
                errorType,
                meta: { total_count },
                documents
            } = data

            if (!!errorType || total_count === 0 || documents.length === 0) {
                Alert.alert(TextAlarm.error_400)
                throw new Error("No results found.")
            }
            return documents
        },
        enabled: onSubmitEditing && !queryClient.getQueryData([value])
    })

    return { data, isLoading, error }
}
