import { StyleSheet, Text, View } from "react-native"
import { CommonStyle, MobileFont, TabletFont } from "../../style/CommonStyle"
import { isTablet } from "../../store"
import UV1 from "asset/icon/uv_index/icon_uv_index_1.svg"

export const UVScreen = () => {
    return (
        <View style={CommonStyle.flex}>
            <Text style={[styles.title, isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>UV 지수란?</Text>
            <Text style={[styles.content, isTablet ? TabletFont.weather_info_page_text : MobileFont.weather_info_page_text]}>
                UV 지수(Ultraviolet Index)는 피부 손상 가능성을 나타내는 지표로 일광화상을 유발하는 자외선 복사 강도의 국제 표준 측정 값입니다. 태양고도가 최대인 남중시각(南中時刻)때 지표에 도달하는 자외선 B 영역의 복사량을 지수식으로
                환산한 것이며 10등급으로 구분됩니다.
            </Text>
            <Text style={[styles.title, isTablet ? TabletFont.heading_2 : MobileFont.body_1]}>UV 지수 단계</Text>
            <UV1 />
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        marginTop: 8
    },
    title: {
        marginTop: 32
    }
})
