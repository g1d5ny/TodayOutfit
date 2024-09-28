import { DetailComponent } from "./DetailComponent"
import { UVInfo } from "text/DetailInfoText"

export const UVScreen = () => {
    return <DetailComponent title={UVInfo.title} content={UVInfo.content} step={UVInfo.step} />
}
