import { ImageSourcePropType } from "react-native"
import { Clothes } from "type"

export const Outer = [
    { ko: "가디건", en: Clothes.CARDIGAN },
    { ko: "자켓", en: Clothes.JACKET },
    { ko: "코트", en: Clothes.COAT },
    { ko: "얇은 점퍼", en: Clothes.THIN_JUMPER },
    { ko: "두꺼운 점퍼", en: Clothes.THICK_JUMPER },
    { ko: "패딩", en: Clothes.PADDING }
]

export const Top = [
    { ko: "티셔츠", en: Clothes.T_SHIRTS },
    { ko: "니트/스웨터", en: Clothes.KNIT_SWEATER },
    { ko: "긴팔 셔츠", en: Clothes.SHIRTS },
    { ko: "반팔 셔츠", en: Clothes.POLO_SHIRTS },
    { ko: "맨투맨", en: Clothes.MAN_TO_MAN },
    { ko: "기모 없는 후드티", en: Clothes.HOODIE_WITHOUT_BRUSHED },
    { ko: "기모 후드티", en: Clothes.BRUSHED_HOODIE },
    { ko: "블라우스", en: Clothes.BLOUSE },
    { ko: "민소매/나시", en: Clothes.SLEEVELESS }
]

export const OnePice = [
    { ko: "롱원피스", en: Clothes.LONG_ONEPIECE },
    { ko: "미니원피스", en: Clothes.MINI_ONEPIECE },
    { ko: "투피스", en: Clothes.TWOPIECE }
]

export const Pants = [
    { ko: "면바지", en: Clothes.COTTON_PANTS },
    { ko: "청바지", en: Clothes.JEANS },
    { ko: "슬렉스", en: Clothes.SLACKS },
    { ko: "데님", en: Clothes.DENIM },
    { ko: "반바지", en: Clothes.SHIRTS }
]

export const Skirt = [
    { ko: "미니 스커트", en: Clothes.MINI_SKIRT },
    { ko: "롱 스커트", en: Clothes.LONG_SKIRT }
]

export const CostumePath: { [key in Clothes]: ImageSourcePropType } = {
    [Clothes.CARDIGAN]: require("asset/icon/clothes/icon_clothes_cardigan.png"),
    [Clothes.JACKET]: require("asset/icon/clothes/icon_clothes_jacket.png"),
    [Clothes.COAT]: require("asset/icon/clothes/icon_clothes_coat.png"),
    [Clothes.THIN_JUMPER]: require("asset/icon/clothes/icon_clothes_thin_jumper.png"),
    [Clothes.THICK_JUMPER]: require("asset/icon/clothes/icon_clothes_thick_jumper.png"),
    [Clothes.PADDING]: require("asset/icon/clothes/icon_clothes_padding.png"),
    [Clothes.POLO_SHIRTS]: require("asset/icon/clothes/icon_clothes_shirts.png"),
    [Clothes.SHIRTS]: require("asset/icon/clothes/icon_clothes_shirts.png"),
    [Clothes.T_SHIRTS]: require("asset/icon/clothes/icon_clothes_t_shirts.png"),
    [Clothes.KNIT_SWEATER]: require("asset/icon/clothes/icon_clothes_knit_sweater.png"),
    [Clothes.MAN_TO_MAN]: require("asset/icon/clothes/icon_clothes_man_to_man.png"),
    [Clothes.HOODIE_WITHOUT_BRUSHED]: require("asset/icon/clothes/icon_clothes_hoodie_without_brushed.png"),
    [Clothes.BRUSHED_HOODIE]: require("asset/icon/clothes/icon_clothes_brushed_hoodie.jpeg"),
    [Clothes.BLOUSE]: require("asset/icon/clothes/icon_clothes_blouse.png"),
    [Clothes.SLEEVELESS]: require("asset/icon/clothes/icon_clothes_sleeveless.png"),
    [Clothes.LONG_ONEPIECE]: require("asset/icon/clothes/icon_clothes_long_onepiece.png"),
    [Clothes.MINI_ONEPIECE]: require("asset/icon/clothes/icon_clothes_mini_onepiece.png"),
    [Clothes.TWOPIECE]: require("asset/icon/clothes/icon_clothes_twopiece.jpeg"),
    [Clothes.COTTON_PANTS]: require("asset/icon/clothes/icon_clothes_cotton_pants.jpeg"),
    [Clothes.JEANS]: require("asset/icon/clothes/icon_clothes_jeans.png"),
    [Clothes.SLACKS]: require("asset/icon/clothes/icon_clothes_slacks.png"),
    [Clothes.DENIM]: require("asset/icon/clothes/icon_clothes_denim.jpeg"),
    [Clothes.SHORTS]: require("asset/icon/clothes/icon_clothes_shorts.png"),
    [Clothes.MINI_SKIRT]: require("asset/icon/clothes/icon_clothes_mini_skirt.png"),
    [Clothes.LONG_SKIRT]: require("asset/icon/clothes/icon_clothes_long_skirt.png")
}

export const BoyCharacterCostumePath: { [key in Clothes]?: ImageSourcePropType } = {
    // [Clothes.CARDIGAN]: require("asset/icon/clothes/icon_clothes_cardigan.png"),
    // [Clothes.JACKET]: require("asset/icon/clothes/icon_clothes_jacket.png"),
    // [Clothes.COAT]: require("asset/icon/clothes/icon_clothes_coat.png"),
    // [Clothes.THIN_JUMPER]: require("asset/icon/clothes/icon_clothes_thin_jumper.png"),
    // [Clothes.THICK_JUMPER]: require("asset/icon/clothes/icon_clothes_thick_jumper.png"),
    [Clothes.PADDING]: require("asset/image/character/image_puffer_boy.png"),
    [Clothes.SHIRTS]: require("asset/image/character/image_shirts_boy.png"),
    [Clothes.POLO_SHIRTS]: require("asset/image/character/image_poloshirts_boy.png"),
    // [Clothes.T_SHIRTS]: require("asset/icon/clothes/icon_clothes_t_shirts.png"),
    [Clothes.KNIT_SWEATER]: require("asset/image/character/image_sweater_boy.png")
    // [Clothes.MAN_TO_MAN]: require("asset/icon/clothes/icon_clothes_man_to_man.png"),
    // [Clothes.HOODIE_WITHOUT_BRUSHED]: require("asset/icon/clothes/icon_clothes_hoodie_without_brushed.png"),
    // [Clothes.BRUSHED_HOODIE]: require("asset/icon/clothes/icon_clothes_brushed_hoodie.jpeg"),
    // [Clothes.BLOUSE]: require("asset/icon/clothes/icon_clothes_blouse.png"),
    // [Clothes.SLEEVELESS]: require("asset/icon/clothes/icon_clothes_sleeveless.png"),
    // [Clothes.LONG_ONEPIECE]: require("asset/icon/clothes/icon_clothes_long_onepiece.png"),
    // [Clothes.MINI_ONEPIECE]: require("asset/icon/clothes/icon_clothes_mini_onepiece.png"),
    // [Clothes.TWOPIECE]: require("asset/icon/clothes/icon_clothes_twopiece.jpeg"),
    // [Clothes.COTTON_PANTS]: require("asset/icon/clothes/icon_clothes_cotton_pants.jpeg"),
    // [Clothes.JEANS]: require("asset/icon/clothes/icon_clothes_jeans.png"),
    // [Clothes.SLACKS]: require("asset/icon/clothes/icon_clothes_slacks.png"),
    // [Clothes.DENIM]: require("asset/icon/clothes/icon_clothes_denim.jpeg"),
    // [Clothes.SHORTS]: require("asset/icon/clothes/icon_clothes_shorts.png"),
    // [Clothes.MINI_SKIRT]: require("asset/icon/clothes/icon_clothes_mini_skirt.png"),
    // [Clothes.LONG_SKIRT]: require("asset/icon/clothes/icon_clothes_long_skirt.png")
}

export const GirlCharacterCostumePath: { [key in Clothes]?: ImageSourcePropType } = {
    // [Clothes.CARDIGAN]: require("asset/icon/clothes/icon_clothes_cardigan.png"),
    // [Clothes.JACKET]: require("asset/icon/clothes/icon_clothes_jacket.png"),
    [Clothes.COAT]: require("asset/image/character/image_coat_girl.png"),
    // [Clothes.THIN_JUMPER]: require("asset/icon/clothes/icon_clothes_thin_jumper.png"),
    // [Clothes.THICK_JUMPER]: require("asset/icon/clothes/icon_clothes_thick_jumper.png"),
    [Clothes.PADDING]: require("asset/image/character/image_puffer_girl.png"),
    [Clothes.SHIRTS]: require("asset/image/character/image_shirts_girl.png"),
    [Clothes.POLO_SHIRTS]: require("asset/image/character/image_poloshirts_girl.png"),
    // [Clothes.T_SHIRTS]: require("asset/icon/clothes/icon_clothes_t_shirts.png"),
    [Clothes.KNIT_SWEATER]: require("asset/image/character/image_sweater_girl.png")
    // [Clothes.MAN_TO_MAN]: require("asset/icon/clothes/icon_clothes_man_to_man.png"),
    // [Clothes.HOODIE_WITHOUT_BRUSHED]: require("asset/icon/clothes/icon_clothes_hoodie_without_brushed.png"),
    // [Clothes.BRUSHED_HOODIE]: require("asset/icon/clothes/icon_clothes_brushed_hoodie.jpeg"),
    // [Clothes.BLOUSE]: require("asset/icon/clothes/icon_clothes_blouse.png"),
    // [Clothes.SLEEVELESS]: require("asset/icon/clothes/icon_clothes_sleeveless.png"),
    // [Clothes.LONG_ONEPIECE]: require("asset/icon/clothes/icon_clothes_long_onepiece.png"),
    // [Clothes.MINI_ONEPIECE]: require("asset/icon/clothes/icon_clothes_mini_onepiece.png"),
    // [Clothes.TWOPIECE]: require("asset/icon/clothes/icon_clothes_twopiece.jpeg"),
    // [Clothes.COTTON_PANTS]: require("asset/icon/clothes/icon_clothes_cotton_pants.jpeg"),
    // [Clothes.JEANS]: require("asset/icon/clothes/icon_clothes_jeans.png"),
    // [Clothes.SLACKS]: require("asset/icon/clothes/icon_clothes_slacks.png"),
    // [Clothes.DENIM]: require("asset/icon/clothes/icon_clothes_denim.jpeg"),
    // [Clothes.SHORTS]: require("asset/icon/clothes/icon_clothes_shorts.png"),
    // [Clothes.MINI_SKIRT]: require("asset/icon/clothes/icon_clothes_mini_skirt.png"),
    // [Clothes.LONG_SKIRT]: require("asset/icon/clothes/icon_clothes_long_skirt.png")
}
