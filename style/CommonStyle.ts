import { PixelRatio, StyleSheet } from "react-native"

export const CommonColor = {
    // main color
    main_blue: "#4165FF",
    sub_blue: "#517EFF",
    opacity_blue: "#F6F7FF",
    opacity_blue_calendar: "#EFF2FF",
    main_black: "#010101",
    main_white: "#FFFFFF",
    // basic color
    basic_gray_light: "#F6F6F9",
    basic_gray_medium: "#DADCE0",
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

// dp(123) converts 123px (px as in your mockup design) to dp.
export const dp = (px: number) => {
    return px / PixelRatio.get()
}

export const TabletFont = StyleSheet.create({
    bold_on_boarding: {
        fontSize: 28,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.56),
        lineHeight: 38
    },
    body_on_boarding: {
        fontSize: 20,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.4),
        lineHeight: 20
    },
    title_on_boarding: {
        fontSize: 18,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.36),
        lineHeight: 20
    },
    header: {
        fontSize: 20,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.4),
        lineHeight: 24
    },
    heading: {
        fontSize: 24,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.48),
        lineHeight: 30
    },
    temperature: {
        fontSize: 35,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.1),
        lineHeight: 42
    },
    temperature_2: {
        fontSize: 33,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.1),
        lineHeight: 38
    },
    body_1: {
        fontSize: 16,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.32),
        lineHeight: 22
    },
    body_2: {
        fontSize: 18,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.36),
        lineHeight: 22
    },
    detail_1: {
        fontSize: 16,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.32),
        lineHeight: 20
    },
    detail_2: {
        fontSize: 16,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.32),
        lineHeight: 16
    },
    detail_3: {
        fontSize: 12,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.12),
        lineHeight: 14
    },
    button_1: {
        fontSize: 18,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.36),
        lineHeight: 22
    },
    button_2: {
        fontSize: 18,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.36),
        lineHeight: 22
    }
})

export const MobileFont = StyleSheet.create({
    bold_on_boarding: {
        fontSize: 24,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.48),
        lineHeight: 32
    },
    body_2: {
        fontSize: 16,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.32),
        lineHeight: 22
    },
    heading: {
        fontSize: 18,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.36),
        lineHeight: 24
    },
    main_text: {
        fontSize: 26,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.52),
        lineHeight: 36
    },
    temperature: {
        fontSize: 35,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.1),
        lineHeight: 42
    },
    temperature2: {
        fontSize: 66,
        color: CommonColor.main_white,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.1),
        lineHeight: 79
    },
    detail_1: {
        fontSize: 14,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.14),
        lineHeight: 20
    },
    detail_2: {
        fontSize: 14,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.14),
        lineHeight: 20
    },
    detail_3: {
        fontSize: 12,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.12),
        lineHeight: 14
    },
    modal_text_1: {
        fontSize: 20,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.4),
        lineHeight: 28
    },
    button_1: {
        fontSize: 18,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.36),
        lineHeight: 22
    },
    detail_4: {
        fontSize: 12,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.12),
        lineHeight: 14
    },
    button_2: {
        fontSize: 18,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.14),
        lineHeight: 20
    },
    modal_text_2: {
        fontSize: 10,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-Regular",
        letterSpacing: dp(-0.12),
        lineHeight: 16
    },
    body_1: {
        fontSize: 18,
        color: CommonColor.main_black,
        fontFamily: "Pretendard-SemiBold",
        letterSpacing: dp(-0.36),
        lineHeight: 22
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
