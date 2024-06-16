import { ImageSourcePropType } from "react-native"

export const Outer = [
    { ko: "가디건", en: "cardigan" },
    { ko: "자켓", en: "jacket" },
    { ko: "코트", en: "coat" },
    { ko: "얇은 점퍼", en: "thin_jumper" },
    { ko: "두꺼운 점퍼", en: "thick_jumper" },
    { ko: "패딩", en: "padding" }
]

export const Top = [
    { ko: "티셔츠", en: "t_shirt" },
    { ko: "니트/스웨터", en: "knit_sweater" },
    { ko: "셔츠/남방", en: "shirt" },
    { ko: "맨투맨", en: "man_to_man" },
    { ko: "기모 없는 후드티", en: "hoodie_without_brushed" },
    { ko: "기모 후드티", en: "brushed_hoodie" },
    { ko: "블라우스", en: "blouse" },
    { ko: "민소매/나시", en: "sleeveless" }
]

export const OnePice = [
    { ko: "롱원피스", en: "long_onpiece" },
    { ko: "미니원피스", en: "mini_onpiece" },
    { ko: "투피스", en: "twopiece" }
]

export const Pants = [
    { ko: "면바지", en: "cotton_pants" },
    { ko: "청바지", en: "jeans" },
    { ko: "슬렉스", en: "slacks" },
    { ko: "데님", en: "denim" },
    { ko: "반바지", en: "shorts" }
]

export const Skirt = [
    { ko: "미니 스커트", en: "mini_skirt" },
    { ko: "롱 스커트", en: "long_skirt" }
]

export const WinterCostume = [
    { ko: "목도리/장갑", en: "scarf_gloves" },
    { ko: "히트텍/내복", en: "underwear" }
]

export const WinterWomanCostume = [
    { ko: "기모 스타킹", en: "brushed_stockings" },
    { ko: "일반 스타킹", en: "stockings" },
    { ko: "살색 스타킹", en: "flesh_colored_stockings" },
    { ko: "레깅스", en: "leggings" }
]

export const CostumePath: { [key: string]: ImageSourcePropType } = {
    cardigan: require("asset/icon/clothes/icon_clothes_cardigan.png"),
    jacket: require("asset/icon/clothes/icon_clothes_jacket.png"),
    coat: require("asset/icon/clothes/icon_clothes_coat.png"),
    thin_jumper: require("asset/icon/clothes/icon_clothes_thin_jumper.png"),
    thick_jumper: require("asset/icon/clothes/icon_clothes_thick_jumper.png"),
    padding: require("asset/icon/clothes/icon_clothes_padding.png"),
    t_shirt: require("asset/icon/clothes/icon_clothes_t_shirt.png"),
    knit_sweater: require("asset/icon/clothes/icon_clothes_knit_sweater.png"),
    shirt: require("asset/icon/clothes/icon_clothes_shirt.png"),
    man_to_man: require("asset/icon/clothes/icon_clothes_man_to_man.png"),
    hoodie_without_brushed: require("asset/icon/clothes/icon_clothes_hoodie_without_brushed.png"),
    brushed_hoodie: require("asset/icon/clothes/icon_clothes_brushed_hoodie.jpeg"),
    blouse: require("asset/icon/clothes/icon_clothes_blouse.png"),
    sleeveless: require("asset/icon/clothes/icon_clothes_sleeveless.png"),
    long_onepice: require("asset/icon/clothes/icon_clothes_long_onepiece.png"),
    mini_onepice: require("asset/icon/clothes/icon_clothes_mini_onepiece.png"),
    twopiece: require("asset/icon/clothes/icon_clothes_twopiece.jpeg"),
    cotton_pants: require("asset/icon/clothes/icon_clothes_cotton_pants.jpeg"),
    jeans: require("asset/icon/clothes/icon_clothes_jeans.png"),
    slacks: require("asset/icon/clothes/icon_clothes_slacks.png"),
    denim: require("asset/icon/clothes/icon_clothes_denim.jpeg"),
    shorts: require("asset/icon/clothes/icon_clothes_shorts.png"),
    mini_skirt: require("asset/icon/clothes/icon_clothes_mini_skirt.png"),
    long_skirt: require("asset/icon/clothes/icon_clothes_long_skirt.png"),
    scarf_gloves: require("asset/icon/clothes/icon_clothes_scarf_gloves.png"),
    underwear: require("asset/icon/clothes/icon_clothes_underwear.png"),
    brushed_stockings: require("asset/icon/clothes/icon_clothes_brushed_stockings.png"),
    stockings: require("asset/icon/clothes/icon_clothes_stockings.png"),
    flesh_colored_stockings: require("asset/icon/clothes/icon_clothes_flesh_colored_stockings.jpeg"),
    leggings: require("asset/icon/clothes/icon_clothes_leggings.png")
}

// export const CharacterCostumePath: { [key: string]: ImageSourcePropType } = {
//     cardigan: require("asset/icon/clothes/icon_clothes_cardigan.png"),
//     jacket: require("asset/icon/clothes/icon_clothes_jacket.png"),
//     coat: require("asset/icon/clothes/icon_clothes_coat.png"),
//     thin_jumper: require("asset/icon/clothes/icon_clothes_thin_jumper.png"),
//     thick_jumper: require("asset/icon/clothes/icon_clothes_thick_jumper.png"),
//     padding: require("asset/icon/clothes/icon_clothes_padding.png"),
//     t_shirt: require("asset/icon/clothes/icon_clothes_t_shirt.png"),
//     knit_sweater: require("asset/icon/clothes/icon_clothes_knit_sweater.png"),
//     shirt: require("asset/icon/clothes/icon_clothes_shirt.png"),
//     man_to_man: require("asset/icon/clothes/icon_clothes_man_to_man.png"),
//     hoodie_without_brushed: require("asset/icon/clothes/icon_clothes_hoodie_without_brushed.png"),
//     brushed_hoodie: require("asset/icon/clothes/icon_clothes_brushed_hoodie.jpeg"),
//     blouse: require("asset/icon/clothes/icon_clothes_blouse.png"),
//     sleeveless: require("asset/icon/clothes/icon_clothes_sleeveless.png"),
//     long_onepice: require("asset/icon/clothes/icon_clothes_long_onepiece.png"),
//     mini_onepice: require("asset/icon/clothes/icon_clothes_mini_onepiece.png"),
//     twopiece: require("asset/icon/clothes/icon_clothes_twopiece.jpeg"),
//     cotton_pants: require("asset/icon/clothes/icon_clothes_cotton_pants.jpeg"),
//     jeans: require("asset/icon/clothes/icon_clothes_jeans.png"),
//     slacks: require("asset/icon/clothes/icon_clothes_slacks.png"),
//     denim: require("asset/icon/clothes/icon_clothes_denim.jpeg"),
//     shorts: require("asset/icon/clothes/icon_clothes_shorts.png"),
//     mini_skirt: require("asset/icon/clothes/icon_clothes_mini_skirt.png"),
//     long_skirt: require("asset/icon/clothes/icon_clothes_long_skirt.png"),
//     scarf_gloves: require("asset/icon/clothes/icon_clothes_scarf_gloves.png"),
//     underwear: require("asset/icon/clothes/icon_clothes_underwear.png"),
//     brushed_stockings: require("asset/icon/clothes/icon_clothes_brushed_stockings.png"),
//     stockings: require("asset/icon/clothes/icon_clothes_stockings.png"),
//     flesh_colored_stockings: require("asset/icon/clothes/icon_clothes_flesh_colored_stockings.jpeg"),
//     leggings: require("asset/icon/clothes/icon_clothes_leggings.png")
// }
