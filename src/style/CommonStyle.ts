import { Dimensions, PixelRatio, Platform, StyleSheet } from "react-native"
import { isTablet } from "store"

const { width, height } = Dimensions.get("window")
export const screenWidth = width
export const screenHeight = height

export const CommonColor = {
    // main color
    main_blue: "#308AF2",
    sub_blue: "#517EFF",
    sub_yellow: "#F3FC6A",
    opacity_blue: "#F6F7FF",
    opacity_blue_calendar: "#EFF2FF",
    main_black: "#010101",
    main_white: "#FFFFFF",
    // basic color
    basic_gray_light: "#F6F6F9",
    basic_gray_medium: "#D0D2D5",
    basic_gray_dark: "#596168",
    // etc
    etc_red: "#F03B4C",
    etc_calendar_red: "#F37B47",
    time_current_day: "#FFC554",
    time_current_night: "#FAF0B6",
    // label
    label_background_red: "#FFF1F1",
    label_text_red: "#FF5959",
    label_background_blue: "#F0F6FF",
    label_text_blue: "#4165FF",
    label_background_orange: "#FFF4EE",
    label_text_orange: "#FF824D",
    label_background_purple: "#F4F4FF",
    label_text_purple: "#5959FF",
    // profile background color
    profile_background_red: "#FFE9ED",
    profile_background_green: "#EDFFD6",
    profile_background_yellow: "#FFF8DD",
    profile_background_blue: "#E9F1FF",
    profile_background_purple: "#F0E4FF",
    // weather card background color
    weather_card_background_yellow: "#FFFAE2",
    weather_card_background_sky: "#F1FCFF",
    weather_card_background_blue: "#D4EBFF",
    weather_card_background_green: "#EFF5F5",
    weather_card_background_opacity_purple: "#F1F3FF",
    weather_card_background_purple: "#E4E6F2"
}

export const getDpi = () => {
    return PixelRatio.get() * 160
}

export const dp = (px: number) => {
    return px / PixelRatio.get()
}

export const pt = (px: number) => {
    return (px * 72) / getDpi()
}

export const TabletFont = StyleSheet.create({
    title_on_boarding: {
        fontSize: 28,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.56) : dp(-0.56),
        lineHeight: 38
    },
    heading_1: {
        fontSize: 20,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.36) : dp(-0.36),
        lineHeight: 24
    },
    heading_2: {
        fontSize: 18,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.36) : dp(-0.36),
        lineHeight: 22
    },
    main_page_forecast_text: {
        fontSize: 35,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? dp(-1) : dp(-1),
        lineHeight: 45
    },
    temperature: {
        fontSize: 90,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: 0,
        lineHeight: 107
    },
    body_1: {
        fontSize: 16,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.32) : dp(-0.32),
        lineHeight: 22
    },
    body_2: {
        fontSize: 16,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: Platform.OS === "ios" ? pt(-0.32) : dp(-0.32),
        lineHeight: 20
    },
    detail_1: {
        fontSize: 14,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.14) : dp(-0.14),
        lineHeight: 20
    },
    detail_2: {
        fontSize: 14,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: Platform.OS === "ios" ? pt(-0.14) : dp(-0.14),
        lineHeight: 18
    },
    detail_3: {
        fontSize: 12,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: Platform.OS === "ios" ? pt(-0.12) : dp(-0.12),
        lineHeight: 14
    },
    detail_4: {
        fontSize: 12,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.12) : dp(-0.12),
        lineHeight: 14
    },
    modal_text_2: {
        fontSize: 10,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: Platform.OS === "ios" ? pt(-0.12) : dp(-0.12),
        lineHeight: 16
    },
    button_1: {
        fontSize: 20,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.36) : dp(-0.36),
        lineHeight: 24
    },
    button_2: {
        fontSize: 20,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: Platform.OS === "ios" ? pt(-0.36) : dp(-0.36),
        lineHeight: 24
    },
    weather_info_main_text: {
        fontSize: 14,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: Platform.OS === "ios" ? pt(-0.24) : dp(-0.24),
        lineHeight: 21
    },
    mobile_title: {
        fontSize: 20,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.36) : dp(-0.36),
        lineHeight: 26
    }
})

export const MobileFont = StyleSheet.create({
    title_on_boarding: {
        fontSize: 24,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.48) : dp(-0.48),
        lineHeight: 32
    },
    body_1: {
        fontSize: 16,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.32) : dp(-0.32),
        lineHeight: 20
    },
    body_2: {
        fontSize: 16,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: Platform.OS === "ios" ? pt(-0.32) : dp(-0.32),
        lineHeight: 20
    },
    heading_1: {
        fontSize: 20,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.36) : dp(-0.36),
        lineHeight: 24
    },
    heading_2: {
        fontSize: 18,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.36) : dp(-0.36),
        lineHeight: 22
    },
    main_page_forecast_text: {
        fontSize: 24,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.48) : dp(-0.48),
        lineHeight: 32
    },
    temperature: {
        fontSize: 55,
        color: CommonColor.main_white,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? dp(-1) : dp(-1),
        lineHeight: 79
    },
    detail_1: {
        fontSize: 14,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.14) : dp(-0.14),
        lineHeight: 20
    },
    detail_2: {
        fontSize: 14,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: Platform.OS === "ios" ? pt(-0.14) : dp(-0.14),
        lineHeight: 18
    },
    detail_3: {
        fontSize: 12,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: Platform.OS === "ios" ? pt(-0.12) : dp(-0.12),
        lineHeight: 14
    },
    detail_4: {
        fontSize: 12,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.12) : dp(-0.12),
        lineHeight: 14
    },
    mobile_title: {
        fontSize: 24,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.48) : dp(-0.48),
        lineHeight: 32
    },
    modal_text_2: {
        fontSize: 10,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: Platform.OS === "ios" ? pt(-0.12) : dp(-0.12),
        lineHeight: 16
    },
    button_1: {
        fontSize: 20,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: Platform.OS === "ios" ? pt(-0.36) : dp(-0.36),
        lineHeight: 24
    },
    button_2: {
        fontSize: 18,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: Platform.OS === "ios" ? pt(-0.36) : dp(-0.36),
        lineHeight: 22
    },
    weather_info_main_text: {
        fontSize: 14,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: Platform.OS === "ios" ? pt(-0.24) : dp(-0.24),
        lineHeight: 21
    }
})

export const ShadowStyle = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.68,
    elevation: 11
}

export const TextShadowStyle = {
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowRadius: 8
}

export const CommonStyle = StyleSheet.create({
    spread: {
        justifyContent: "space-between"
    },
    title: {
        marginTop: 32
        // justifyContent: "space-between"
    },
    infoTitle: {
        marginTop: 26,
        justifyContent: "space-between"
    },
    padding: {
        paddingHorizontal: isTablet ? 32 : 16
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderColor: CommonColor.basic_gray_light
    },
    center: {
        alignItems: "center",
        justifyContent: "center"
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    flex: {
        flex: 1,
        backgroundColor: "#fff"
    }
})
