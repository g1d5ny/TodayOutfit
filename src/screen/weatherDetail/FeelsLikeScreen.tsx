import { DetailComponent } from "./DetailComponent"
import { FeelsLikeInfo } from "text/DetailInfoText"

export const FeelsLikeScreen = () => {
    return <DetailComponent title={FeelsLikeInfo.title} content={FeelsLikeInfo.content} unit={FeelsLikeInfo.unit} step={FeelsLikeInfo.step} />
}
