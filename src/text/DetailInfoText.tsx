import FeelsLike10 from "asset/icon/feels_like/icon_feels_like_10.svg"
import FeelsLike8 from "asset/icon/feels_like/icon_feels_like_8.svg"
import FeelsLike6 from "asset/icon/feels_like/icon_feels_like_6.svg"
import FeelsLike4 from "asset/icon/feels_like/icon_feels_like_4.svg"
import FeelsLike2 from "asset/icon/feels_like/icon_feels_like_2.svg"
import UV1 from "asset/icon/uv_index/icon_uv_index_1.svg"
import UV2 from "../asset/icon/uv_index/icon_uv_index_2.svg"
import UV3 from "../asset/icon/uv_index/icon_uv_index_3.svg"
import UV4 from "../asset/icon/uv_index/icon_uv_index_4.svg"
import UV5 from "../asset/icon/uv_index/icon_uv_index_5.svg"
import Humidity0 from "asset/icon/humidity/icon_humidity_0.svg"
import Humidity1 from "asset/icon/humidity/icon_humidity_1.svg"
import Humidity3 from "asset/icon/humidity/icon_humidity_3.svg"
import Humidity5 from "asset/icon/humidity/icon_humidity_5.svg"
import Humidity6 from "asset/icon/humidity/icon_humidity_6.svg"
import Snowfall1 from "asset/icon/snow_fall/icon_snow_fall_1.svg"
import Snowfall2 from "asset/icon/snow_fall/icon_snow_fall_2.svg"
import Snowfall3 from "asset/icon/snow_fall/icon_snow_fall_3.svg"
import Snowfall4 from "asset/icon/snow_fall/icon_snow_fall_4.svg"
import WindSpeed1 from "asset/icon/wind_speed/icon_wind_speed_1.svg"
import WindSpeed2 from "asset/icon/wind_speed/icon_wind_speed_2.svg"
import WindSpeed3 from "asset/icon/wind_speed/icon_wind_speed_3.svg"
import WindSpeed4 from "asset/icon/wind_speed/icon_wind_speed_4.svg"
import WindSpeed5 from "asset/icon/wind_speed/icon_wind_speed_5.svg"
import WindSpeed6 from "asset/icon/wind_speed/icon_wind_speed_6.svg"
import WindSpeed7 from "asset/icon/wind_speed/icon_wind_speed_7.svg"
import WindSpeed8 from "asset/icon/wind_speed/icon_wind_speed_8.svg"
import WindSpeed9 from "asset/icon/wind_speed/icon_wind_speed_9.svg"
import WindSpeed10 from "asset/icon/wind_speed/icon_wind_speed_10.svg"

export const UV = [
    {
        text: "위험",
        content: "피부 화상을 입을 수 있어 가능한 실내에 머물러야합니다.",
        desc: ["햇볕에 노출 시 수십 분 이내에도 피부 화상을 입을 수 있어 가장 위험합니다.", "가능한 실내에 머물러야 합니다.", "외출 시 긴 소매 옷, 선글라스 이용을 권장합니다."],
        icon: <UV5 />,
        range: "11~"
    },
    {
        text: "매우 높음",
        content: "자외선 차단제를 정기적으로 발라야 합니다.",
        desc: [
            "햇볕에 노출 시 수십 분 이내에도 피부 화상을 입을 수 있어 매우 위험합니다.",
            "오전 10시부터 오후 3시까지 외출을 피하고 실내나 그늘에 머물러야 합니다.",
            "외출 시 긴소매 옷, 선글라스 착용을 권장합니다."
        ],
        icon: <UV4 />,
        range: "8~10"
    },
    {
        text: "높음",
        content: "자외선 차단제를 정기적으로 발라야 합니다.",
        desc: ["햇볕에 노출 시 1~2시간 이내에도 피부 화상을 입을 수 있어 가장 위험합니다.", "한낮에는 그늘에 머무르는 것을 권장 합니다."],
        icon: <UV3 />,
        range: "6~7"
    },
    {
        text: "보통",
        content: "자외선 차단제를 바르는 것을 권장합니다.",
        desc: ["2~3시간 햇볕에 노출 시에  피부 화상을 입을 수 있습니다."],
        icon: <UV2 />,
        range: "3~5"
    },
    {
        text: "낮음",
        content: "햇볕 노출에 대한 보호조치가 필요하지 않은 정도의 낮은 수준입니다.",
        desc: ["햇볕 노출에 대한 보호조치가 필요하지 않습니다.", "그러나 햇볕에 민감한 피부를 가진 사람은 자외선 차단제를 발라야 합니다."],
        icon: <UV1 />,
        range: "~2"
    }
]

export const UVInfo = {
    title: "UV 지수",
    content:
        "UV 지수(Ultraviolet Index)는 피부 손상 가능성을 나타내는 지표로 일광화상을 유발하는 자외선 복사 강도의 국제 표준 측정값입니다. 태양고도가 최대인 남중시각(南中時刻) 때 지표에 도달하는 자외선 B 영역의 복사량을 지수식으로 환산한 것이며 10등급으로 구분됩니다.",
    step: UV,
    footer: "자외선 지수는 WHO, WMO등 국제기구에서 제안하는 “Global Solar UV Index”의 가이드 라인과 질병관리청의 건강 위해 정보, 기상청 날씨누리 생활기상정보를 활용 했음을 안내해 드립니다."
}

export const FeelsLike = [
    {
        text: "위험",
        desc: ["폭염경보 수준의 체감 온도로 가능한 실내에 머물러야 합니다.", "직사광선을 오래 받으면 열사병, 일사병과 같은 온열질환이 발생할 가능성이 높습니다."],
        icon: <FeelsLike10 />,
        range: "~100"
    },
    {
        text: "높음",
        desc: ["최대 폭염 주의보 수준의 체감온도로 외출을 피하는 것을 권장합니다.", "장기 외부 활동시 일사병이나 탈수가 일어날 수 있으니 주의해야 합니다."],
        icon: <FeelsLike8 />,
        range: "~80"
    },
    {
        text: "보통",
        desc: ["평균 기온에 해당하는 체감온도 입니다.", "사람의 체질에 따라 다르게 느낄 수 있습니다."],
        icon: <FeelsLike6 />,
        range: "~60"
    },
    {
        text: "낮음",
        desc: ["추위가 느껴지는 정도로 옷을 따뜻하게 입는 것을 권장합니다."],
        icon: <FeelsLike4 />,
        range: "~40"
    },
    {
        text: "매우 낮음",
        desc: ["노출된 피부에 매우 찬 기운이 느껴지는 정도로 활동시 저체온증 위험이 있습니다."],
        icon: <FeelsLike2 />,
        range: "~20"
    }
]

export const FeelsLikeInfo = {
    title: "체감온도",
    content:
        "체감 온도는 인체가 느끼는 더위나 추위를 수량적으로 나타낸 것으로 온도, 습도, 풍속, 일사량, 복사량 등을 바탕으로 계산됩니다. 오늘모입지에서는 여름철에는 일 최고 기온을 바탕으로 불쾌지수를, 겨울철에는 일 최저 기온을 바탕으로 체감온도 지수를 활용하고 있습니다.",
    step: FeelsLike,
    footer: "체감온도는 기상청의 기상자료개방포털의 정보를 활용했음을 안내해 드립니다.",
    unit: "%"
}

export const Humidity = [
    {
        text: "매우 높음",
        desc: ["세균과 곰팡이 증식을 촉진해 특정 병원균에 관한 질병 확산율이 높아집니다", "호흡기 환자에게 치명적일 수 있습니다."],
        icon: <Humidity6 width={48} height={48} />,
        range: "~100"
    },
    {
        text: "높음",
        desc: ["약간 습함을 느끼는 정도로 실내에서 습도 조절기를 통한 조정이 필요한 상황입니다."],
        icon: <Humidity5 width={48} height={48} />,
        range: "~80"
    },
    {
        text: "쾌적",
        desc: ["쾌적한 상태인 최적의 습도 단계입니다.", "그러나 사람에 따라 다른 기상 상태의 영향으로 쾌적함을 느끼지 않을 수 있습니다."],
        icon: <Humidity3 width={48} height={48} />,
        range: "~60"
    },
    {
        text: "건조",
        desc: ["다소 건조함을 느낄 수 있습니다.", "유아에게 코 막힘 현상이 발생할 수 있습니다.", "정전기가 발생하기 쉽습니다."],
        icon: <Humidity1 width={48} height={48} />,
        range: "~30"
    },
    {
        text: "매우 건조",
        desc: ["알레르기 반응을 악화시킬 수 있습니다.", "호흡기 문제를 유발할 수 있습니다.", "목재를 수축시키고 정전기가 자주 발생합니다."],
        icon: <Humidity0 width={48} height={48} />,
        range: "~20"
    }
]

export const HumidityInfo = {
    title: "습도",
    content:
        "습도란 공기 중에 포함되어 있는 수증기의 비율을 의미하며 오늘모입지에서 제공되는 습도 정보는 노점 온도를 활용한 상대습도를 의미합니다. 기온의 영향으로 계절에 따라 쾌적함을 느끼는 상대습도가 달라지며 여름철엔 50~60%, 겨울철엔 40~50%, 봄과 가을에는 50% 정도가 이상적인 상대습도입니다.",
    step: Humidity,
    footer: "적정 상대 습도의 경우 한국표준과학연구원의 자료와 기상청의 날씨배움터 정보를 활용했음을 안내 해드립니다.",
    unit: "%, C"
}

export const SnowFall = [
    {
        text: "대설경보",
        desc: [
            "눈을 밟으면 신발이 완전히 빠지는 상태로 외출을 삼가야 합니다.",
            "대설은 짧은 시간에 급격히 눈이 쌓이게 되므로 눈사태, 교통 혼잡, 쌓인 눈에 의해 시설물 붕괴 등의 피해에 주의해야 합니다.",
            "제설 작업이 늦어지는 산간지역의 경우 한파와 이동에 각별히 주의해야 합니다.",
            "비상 상황 가족이나 이웃과 함께 대피요령을 숙지하고 및 비상용품을 구비 해둬야 합니다."
        ],
        icon: <Snowfall4 width={50} />,
        range: "20~"
    },
    {
        text: "대설주의보",
        desc: [
            "눈을 밟으면 신발이 묻히는 상태입니다.",
            "대설은 짧은 시간에 급격히 눈이 쌓이게 되므로 눈사태, 교통 혼잡, 쌓인 눈에 의해 시설물 붕괴 등의 피해에 주의해야 합니다.",
            "보행자의 경우 외출을 자제하며 바닥 면이 넓은 운동화나 등산화 착용을 권장합니다.",
            "차량 운전자의 경우 차량 고립이 주의하며 서행운전 및 되도록 대중교통 이용을 권장합니다."
        ],
        icon: <Snowfall3 width={50} />,
        range: "5~19"
    },
    {
        text: "강설주의보",
        desc: [
            "적은 양의 눈이나 비와 함께 내리는 진눈깨비, 우박과 같이 뭉쳐서 내리는 싸락눈 등이 해당될 수 있습니다.",
            "제설이 원활한 적은 양의 눈으로 예상되나, 교통 혼잡이 있을 수 있으니 주의해야 합니다."
        ],
        icon: <Snowfall2 width={50} />,
        range: "1~4"
    },
    {
        text: "가루눈, 자국눈",
        desc: [
            "발자국이 겨우 날 정도로의 적은 양의 자국눈이나 비와 함께 내리는 진눈깨비, 우박과 같이 뭉쳐서 내리는 싸락눈 등이 해당될 수 있습니다.",
            "쌓이지 않는 정도의 적설량이지만 보행에 주의해야 합니다."
        ],
        icon: <Snowfall1 width={50} />,
        range: "~1"
    }
]

export const SnowFallInfo = {
    title: "적설량",
    content:
        "지면에 쌓인 눈의 깊이를 cm로 나타낸 값으로 오늘모입지에서 제공하는 대설 및 적설 정보는 외부 활동에 지장을 줄 수 있는 기상특보를 기초해 제공됩니다. 싸락눈과 진눈깨비와 같은 비와 눈이 섞여 내리는 기상 상태도 포함합니다.",
    step: SnowFall,
    footer: "적설량의 단계 기준의 경우 기상청 날씨누리의 대설 특보, ‘대설 판단 가이던스'를 활용했음을 알려드립니다.",
    unit: "cm"
}

export const WindSpeed = (width?: number) => [
    {
        text: "고요",
        content: "바람이 불지 않는 고요한 상태가 예상됩니다.",
        desc: "연기가 수직으로 올라가는 정도로 바람이 없는 수준",
        icon: <WindSpeed1 width={width} />,
        range: "0~0.02"
    },
    {
        text: "실바람",
        content: "풍향은 연기가 날리는 것으로 알 수 있으나, 풍향계가 움직이지 않는 정도",
        desc: "풍향은 연기가 날리는 것으로 알 수 있으나, 풍향계가 움직이지 않는 정도",
        icon: <WindSpeed2 width={width} />,
        range: "0.3~1.5"
    },
    {
        text: "남실바람",
        content: "가벼운 바람이 얼굴에 느껴지며 나뭇잎이 흔들리는 정도",
        desc: "가벼운 바람이 얼굴에 느껴지며 나뭇잎이 흔들리는 정도",
        icon: <WindSpeed3 width={width} />,
        range: "1.6~3.3"
    },
    {
        text: "산들바람",
        content: "나뭇잎과 가는 가지가 끊임없이 흔들리고 깃발이 가볍게 날리는 정도",
        desc: "나뭇잎과 가는 가지가 끊임없이 흔들리고 깃발이 가볍게 날리는 정도",
        icon: <WindSpeed4 width={width} />,
        range: "3.4~5.4"
    },
    {
        text: "건들바람",
        content: "나무 가지가 흔들리는 정도의 중간바람이 예상됩니다.",
        desc: "먼지가 일고 종잇조각이 날리며 작은 가지가 흔들리는 정도",
        icon: <WindSpeed5 width={width} />,
        range: "5.5~7.9"
    },
    {
        text: "흔들바람",
        content: "작은 나무가 흔들리는 정도의 중간바람이 예상됩니다.",
        desc: "잎이 무성한 작은 나무 전체가 흔들리고 호수에 물결이 일어나는 정도",
        icon: <WindSpeed6 width={width} />,
        range: "8.0~10.7"
    },
    {
        text: "된바람",
        content: "우산을 들기가 곤란한 정도의 강한바람이 예상됩니다.",
        desc: "큰 나뭇가지가 흔들리고 전선이 울리며 우산을 들기가 곤란한 정도",
        icon: <WindSpeed7 width={width} />,
        range: "10.8~13.8"
    },
    {
        text: "센바람",
        content: "바람을 마주해 걷기 힘든 강한바람이 예상됩니다.",
        desc: "나무 전체가 흔들려 바람을 마주하여 걷기 힘들 정도",
        icon: <WindSpeed8 width={width} />,
        range: "13.9~17.1"
    },
    {
        text: "큰바람",
        content: "나무가지가 꺾이는 아주 큰 바람이 예상됩니다.",
        desc: "작은 나뭇가지가 꺾이며, 바람을 마주하여 걷기 힘들 정도",
        icon: <WindSpeed9 width={width} />,
        range: "17.2~20.7"
    },
    {
        text: "큰센바람",
        content: "가옥에 손해가 있을 정도의태풍급 바람이 예상됩니다.",
        desc: "가옥에 다소 손해가 있을 정도로 굴뚝이 넘어지고 기와가 벗겨짐",
        icon: <WindSpeed10 width={width} />,
        range: "20.8~"
    }
]

export const WindSpeedInfo = {
    title: "풍속",
    content:
        "풍속은 단위 시간당 이동하는 공기의 속도를 말합니다. 오늘모입지에서는 풍속을 m/s 단위 기준으로 보퍼트 풍력 계급표에 기초해 구분하였으며 강풍 경보를 미만으로 일상생활에서의 육상 상태를 안내하고 있습니다.",
    step: WindSpeed(),
    footer: "풍속 계급표는 보퍼트 풍력 계급(Beaufort wind force scale)의 육상 상태 계급표와, 기상청의 기상자료개방포털을 참고했음을 안내해드립니다.",
    unit: "m/s"
}

export const WindDirectionInfo = {
    title: "풍향",
    content: "풍향은 바람이 불어오는 방향을 의미하며 오늘모입지에서는 8방위 각도를 활용해 풍향을 나타냅니다.",
    footer: "풍향 정보는 기상청 날씨누리 생활 기상정보와 ‘Visual Crossing Weather’의 날씨 데이터를 활용 했음을 안내해 드립니다."
}

export const RainPercentageInfo = {
    title: "강수 확률",
    content:
        "강수란 수증기가 응축하여 땅에 내리는 모든 것을 뜻하는 기상학 용어로 비와 눈뿐만 아니라 우박도 강수에 포함됩니다. 강수확률은 ‘조건과 비슷한 상태의 대기를 가졌을 때, 100번 중 비가 몇 번 왔는지’를 의미하며 다시 말해 특정 시간 내에 강수예보 지역의 임의 지점에서 측정 강수가 있음을 확률적으로 정의하여 나타낸 값을 의미합니다.",
    footer: "강수 확률은 기상청 날씨누리 생활 기상정보와 ‘Visual Crossing Weather’의 날씨 정보를 활용 했음을 안내해 드립니다."
}
