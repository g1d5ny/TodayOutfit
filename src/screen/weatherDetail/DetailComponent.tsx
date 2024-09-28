import { StyleSheet, Text, View } from "react-native"
import { CommonColor, CommonStyle, FontStyle } from "../../style/CommonStyle"
import { isTablet } from "../../store"
import { SnowFallInfo } from "text/DetailInfoText"

interface IProps {
    title: string
    content: string
    unit?: string
    step: { icon: JSX.Element; text: string; content?: string; range: string; desc: string[] }[]
}
export const DetailComponent = ({ title, content, step, unit }: IProps) => {
    const isSnowFallComponent = title === SnowFallInfo.title

    return (
        <View style={styles.container}>
            <Text style={[CommonStyle.title, FontStyle.body1.bold]}>
                {title}
                {isSnowFallComponent && "이"}란?
            </Text>
            <Text style={[styles.content, FontStyle.label1.reading_regular]}>{content}</Text>
            <View style={CommonStyle.weatherInfoSplit} />
            <View style={[CommonStyle.row, CommonStyle.spread]}>
                <Text style={[CommonStyle.infoTitle, FontStyle.body1.bold]}>{title} 단계</Text>
                {unit && <Text style={[FontStyle.label2.regular, { color: CommonColor.main_blue }]}>단위: {unit}</Text>}
            </View>
            <View style={[CommonStyle.row, styles.interval, isTablet ? { gap: 22 } : { width: "100%" }]}>
                {step.map(({ icon, text }, index) => {
                    return (
                        <View key={index} style={[CommonStyle.center, { width: isSnowFallComponent ? 80 : undefined }]}>
                            {icon}
                            <Text style={[styles.iconText, FontStyle.label1.bold]}>{text}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={styles.stepGap}>
                {step.map(({ text, range, desc }, index) => {
                    return (
                        <View key={index} style={styles.step}>
                            <View style={{ width: isSnowFallComponent ? 64 : 52 }}>
                                <Text style={FontStyle.label1.bold}>{text.replace(",", ",\t")}</Text>
                                <Text style={[FontStyle.label2.regular, styles.range]}>{range}</Text>
                            </View>
                            <View style={CommonStyle.flex}>
                                {desc.map((item, index) => (
                                    <View key={index} style={styles.wrap}>
                                        <Text style={FontStyle.label1.reading_regular}>· </Text>
                                        <Text style={[FontStyle.label1.reading_regular, styles.flex]}>{item}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stepGap: {
        gap: 26
    },
    vertical: {
        marginTop: 24
    },
    range: {
        marginTop: 5,
        color: CommonColor.main_blue
    },
    wrap: {
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap"
    },
    step: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 17
    },
    iconText: {
        marginTop: 8
    },
    interval: {
        alignSelf: "center",
        marginVertical: 24,
        justifyContent: "space-between"
    },
    content: {
        marginTop: 8
    },
    container: {
        paddingBottom: 32
    },
    flex: {
        flex: 1
    }
})
