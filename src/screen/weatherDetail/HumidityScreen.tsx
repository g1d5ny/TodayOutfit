import { DetailComponent } from "./DetailComponent"
import { HumidityInfo } from "text/DetailInfoText"

export const HumidityScreen = () => {
    return <DetailComponent title={HumidityInfo.title} content={HumidityInfo.content} step={HumidityInfo.step} unit={HumidityInfo.unit} />
}
