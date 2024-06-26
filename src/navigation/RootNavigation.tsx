import { NavigationContainerRef } from "@react-navigation/native"
import { RefObject, createRef } from "react"

export const navigationRef: RefObject<NavigationContainerRef<any>> = createRef()

export function navigate(name: string, params?: any) {
    navigationRef.current?.navigate(name, params)
}
