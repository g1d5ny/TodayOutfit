import { DetailComponent } from "./DetailComponent"
import { SnowFallInfo } from "text/DetailInfoText"

export const SnowFallScreen = () => {
    return <DetailComponent title={SnowFallInfo.title} content={SnowFallInfo.content} unit={SnowFallInfo.unit} step={SnowFallInfo.step} />
}
