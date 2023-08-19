import { Image, ImageBackground, View } from "react-native"
import { isTablet, myAddressListState } from "../../store"
import { useWeatherHook } from "../../hook/useWeatherHook"
import { useRecoilValueLoadable } from "recoil"
import Loader from "../../component/lottie/Loader"
import { useEffect } from "react"

export default () => {
    const { state } = useRecoilValueLoadable(myAddressListState)
    const { CallAllWeather } = useWeatherHook()

    useEffect(() => {
        CallAllWeather()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {state === "loading" ? (
                <Loader />
            ) : (
                <ImageBackground source={require("../../asset/image/image_background.png")} resizeMode='cover' style={{ flex: 1, paddingHorizontal: isTablet ? 32 : 16 }}>
                    <View style={{ flex: 1, justifyContent: "flex-end" }}>
                        <Image source={require("../../asset/image/image_girl.png")} style={{ width: isTablet ? 286 : 186, height: isTablet ? 720 : 470 }} />
                    </View>
                </ImageBackground>
            )}
        </View>
    )
}
