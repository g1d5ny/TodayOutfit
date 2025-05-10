import { ImageSourcePropType } from "react-native"
import { Clothes } from "type"

export const CommonTopClothes = [
    { ko: "가디건", en: Clothes.CARDIGAN },
    { ko: "코트", en: Clothes.COAT_GRAY },
    { ko: "코트", en: Clothes.COAT_BROWN },
    { ko: "항공 점퍼", en: Clothes.JACKET_BOMBER },
    { ko: "셔츠", en: Clothes.LONG_SLEEVE_SHIRTS },
    { ko: "티셔츠", en: Clothes.T_SHIRTS },
    { ko: "후드티", en: Clothes.HOODIE },
    { ko: "롱패딩", en: Clothes.PUFFER_LONG },
    { ko: "숏패딩", en: Clothes.PUFFER_SHORT },
    { ko: "니트/스웨터", en: Clothes.SWEATER },
    { ko: "반팔 셔츠", en: Clothes.SHORT_SLEEVE_SHIRTS_NAVY },
    { ko: "반팔 셔츠", en: Clothes.SHORT_SLEEVE_SHIRTS_GRAY }
] as const

export const GirlTopExtraClothes = [
    { ko: "블라우스", en: Clothes.BLOUSE },
    { ko: "후드 자켓", en: Clothes.HOODY_JACKET_SHERPA },
    { ko: "패딩 자켓", en: Clothes.JACKET_PUFFY },
    { ko: "니트 자켓", en: Clothes.JACKET_KNIT }
] as const

export const BoyTopExtraClothes = [{ ko: "청자켓", en: Clothes.JACKET_DENIM }] as const

export const GirlTopClothes = [...CommonTopClothes, ...GirlTopExtraClothes]
export const BoyTopClothes = [...CommonTopClothes, ...BoyTopExtraClothes] as const

export const CommonBottomClothes = [
    { ko: "긴 바지", en: Clothes.LONG_PANTS_JEAN_BLACK },
    { ko: "청바지", en: Clothes.LONG_PANTS_JEAN_DENIM },
    { ko: "반바지", en: Clothes.SHORT_PANTS }
] as const

export const GirlBottomExtraClothes = [
    { ko: "반팔 원피스", en: Clothes.SHORT_SLEEVE_DRESS },
    { ko: "긴팔 원피스", en: Clothes.LONG_SLEEVE_DRESS_BLUE },
    { ko: "긴팔 원피스", en: Clothes.LONG_SLEEVE_DRESS_NAVY },
    { ko: "롱 스커트", en: Clothes.LONG_SKIRT }
] as const
export const GirlBottomClothes = [...GirlBottomExtraClothes, ...CommonBottomClothes]
export const BoyBottomClothes = [...CommonBottomClothes]

type BoyTopClothesItem = (typeof BoyTopClothes)[number]
export type BoyTopClothesKeys = BoyTopClothesItem["en"]
type BoyBottomClothesItem = (typeof BoyBottomClothes)[number]
export type BoyBottomClothesKeys = BoyBottomClothesItem["en"]
type BoyClothesItem = BoyTopClothesItem | BoyBottomClothesItem
type BoyClothesKeys = BoyClothesItem["en"]
export const BoyClothesPath: { [key in BoyClothesKeys]: ImageSourcePropType } = {
    [Clothes.CARDIGAN]: require("asset/image/clothes/boy/image_cardigan.png"),
    [Clothes.COAT_GRAY]: require("asset/image/clothes/boy/image_coat_gray.png"),
    [Clothes.COAT_BROWN]: require("asset/image/clothes/boy/image_coat_brown.png"),
    [Clothes.JACKET_BOMBER]: require("asset/image/clothes/boy/image_jacket_bomber.png"),
    [Clothes.LONG_SLEEVE_SHIRTS]: require("asset/image/clothes/boy/image_long_sleeve_shirts.png"),
    [Clothes.T_SHIRTS]: require("asset/image/clothes/boy/image_t_shirts.png"),
    [Clothes.PUFFER_LONG]: require("asset/image/clothes/image_long_puffer.png"),
    [Clothes.PUFFER_SHORT]: require("asset/image/clothes/image_short_puffer.png"),
    [Clothes.SWEATER]: require("asset/image/clothes/image_sweater.png"),
    [Clothes.LONG_PANTS_JEAN_BLACK]: require("asset/image/clothes/image_long_pants_jean_black.png"),
    [Clothes.LONG_PANTS_JEAN_DENIM]: require("asset/image/clothes/image_long_pants_jean_denim.png"),
    [Clothes.SHORT_SLEEVE_SHIRTS_NAVY]: require("asset/image/clothes/boy/image_short_sleeve_shirts_navy.png"),
    [Clothes.SHORT_SLEEVE_SHIRTS_GRAY]: require("asset/image/clothes/boy/image_short_sleeve_shirts_gray.png"),
    [Clothes.JACKET_DENIM]: require("asset/image/clothes/boy/image_jacket_denim.png"),
    [Clothes.SHORT_PANTS]: require("asset/image/clothes/image_short_pants.png"),
    [Clothes.HOODIE]: require("asset/image/clothes/boy/image_hoodie.png")
}

type GirlTopClothesItem = (typeof GirlTopClothes)[number]
export type GirlTopClothesKeys = GirlTopClothesItem["en"]
type GirlBottomClothesItem = (typeof GirlBottomClothes)[number]
export type GirlBottomClothesKeys = GirlBottomClothesItem["en"]
type GirlClothesItem = GirlTopClothesItem | GirlBottomClothesItem
type GirlClothesKeys = GirlClothesItem["en"]
export const GirlClothesPath: { [key in GirlClothesKeys]: ImageSourcePropType } = {
    [Clothes.CARDIGAN]: require("asset/image/clothes/girl/image_cardigan.png"),
    [Clothes.COAT_GRAY]: require("asset/image/clothes/girl/image_coat_gray.png"),
    [Clothes.COAT_BROWN]: require("asset/image/clothes/girl/image_coat_brown.png"),
    [Clothes.JACKET_BOMBER]: require("asset/image/clothes/girl/image_jacket_bomber.png"),
    [Clothes.LONG_SLEEVE_SHIRTS]: require("asset/image/clothes/girl/image_long_sleeve_shirts.png"),
    [Clothes.T_SHIRTS]: require("asset/image/clothes/girl/image_t_shrits.png"),
    [Clothes.PUFFER_LONG]: require("asset/image/clothes/image_long_puffer.png"),
    [Clothes.PUFFER_SHORT]: require("asset/image/clothes/image_short_puffer.png"),
    [Clothes.SWEATER]: require("asset/image/clothes/image_sweater.png"),
    [Clothes.LONG_PANTS_JEAN_BLACK]: require("asset/image/clothes/image_long_pants_jean_black.png"),
    [Clothes.LONG_PANTS_JEAN_DENIM]: require("asset/image/clothes/image_long_pants_jean_denim.png"),
    [Clothes.SHORT_SLEEVE_SHIRTS_NAVY]: require("asset/image/clothes/girl/image_short_sleeve_shirts_gray.png"), // TODO
    [Clothes.SHORT_SLEEVE_SHIRTS_GRAY]: require("asset/image/clothes/girl/image_short_sleeve_shirts_gray.png"),
    [Clothes.BLOUSE]: require("asset/image/clothes/girl/image_blouse.png"),
    [Clothes.HOODY_JACKET_SHERPA]: require("asset/image/clothes/girl/image_hoody_jacket_sherpa.png"),
    [Clothes.JACKET_PUFFY]: require("asset/image/clothes/girl/image_puffer_jacket_beige.png"),
    [Clothes.JACKET_KNIT]: require("asset/image/clothes/girl/image_jacket_knit.png"),
    [Clothes.SHORT_SLEEVE_DRESS]: require("asset/image/clothes/girl/image_short_sleeve_dress.png"),
    [Clothes.LONG_SLEEVE_DRESS_BLUE]: require("asset/image/clothes/girl/image_long_sleeve_dress_blue.png"),
    [Clothes.LONG_SLEEVE_DRESS_NAVY]: require("asset/image/clothes/girl/image_long_sleeve_dress_navy.png"),
    [Clothes.SHORT_PANTS]: require("asset/image/clothes/image_short_pants.png"),
    [Clothes.HOODIE]: require("asset/image/clothes/girl/image_hoodie.png"),
    [Clothes.LONG_SKIRT]: require("asset/image/clothes/girl/image_long_sleeve_dress_navy.png")
}

export const BoyCharacterCostumePath: { [key in BoyClothesKeys]?: ImageSourcePropType } = {
    // 코트
    [Clothes.COAT_BROWN]: require("asset/image/character/boy/image_coat.png"),
    [Clothes.COAT_GRAY]: require("asset/image/character/boy/image_coat.png"),
    // 자켓
    [Clothes.JACKET_BOMBER]: require("asset/image/character/boy/image_jacket.png"),
    [Clothes.JACKET_DENIM]: require("asset/image/character/boy/image_jacket.png"),
    // 셔츠
    [Clothes.LONG_SLEEVE_SHIRTS]: require("asset/image/character/boy/image_long_sleeve_shirts.png"),
    [Clothes.SHORT_SLEEVE_SHIRTS_GRAY]: require("asset/image/character/boy/image_short_sleeve_shirts.png"),
    [Clothes.SHORT_SLEEVE_SHIRTS_NAVY]: require("asset/image/character/boy/image_short_sleeve_shirts.png"),
    // 패딩
    [Clothes.PUFFER_LONG]: require("asset/image/character/boy/image_short_puffer.png"),
    [Clothes.PUFFER_SHORT]: require("asset/image/character/boy/image_short_puffer.png"),
    // 바지
    [Clothes.SHORT_PANTS]: require("asset/image/character/boy/image_shorts.png"),
    [Clothes.LONG_PANTS_JEAN_BLACK]: require("asset/image/character/boy/image_long_sleeve_shirts.png"),
    // 니트/스웨터
    [Clothes.SWEATER]: require("asset/image/character/boy/image_sweater.png")
}

export const GirlCharacterCostumePath: { [key in GirlClothesKeys]?: ImageSourcePropType } = {
    // 블라우스
    [Clothes.BLOUSE]: require("asset/image/character/girl/image_blouse.png"),
    // 코트
    [Clothes.COAT_BROWN]: require("asset/image/character/girl/image_coat.png"),
    [Clothes.COAT_GRAY]: require("asset/image/character/girl/image_coat.png"),
    // 자켓
    [Clothes.JACKET_BOMBER]: require("asset/image/character/girl/image_jacket.png"),
    [Clothes.JACKET_PUFFY]: require("asset/image/character/girl/image_jacket.png"),
    [Clothes.JACKET_KNIT]: require("asset/image/character/girl/image_jacket.png"),
    // 치마
    [Clothes.LONG_SKIRT]: require("asset/image/character/girl/image_long_skirt.png"),
    [Clothes.SHORT_SLEEVE_DRESS]: require("asset/image/character/girl/image_long_sleeve_dress.png"),
    [Clothes.LONG_SLEEVE_DRESS_BLUE]: require("asset/image/character/girl/image_blouse.png"),
    [Clothes.LONG_SLEEVE_DRESS_NAVY]: require("asset/image/character/girl/image_blouse.png"),
    // 셔츠
    [Clothes.LONG_SLEEVE_SHIRTS]: require("asset/image/character/girl/image_long_sleeve_shirts.png"),
    [Clothes.SHORT_SLEEVE_SHIRTS_GRAY]: require("asset/image/character/girl/image_short_sleeve_shirts.png"),
    [Clothes.SHORT_SLEEVE_SHIRTS_NAVY]: require("asset/image/character/girl/image_short_sleeve_shirts.png"),
    // 패딩
    [Clothes.PUFFER_LONG]: require("asset/image/character/girl/image_short_puffer.png"),
    [Clothes.PUFFER_SHORT]: require("asset/image/character/girl/image_short_puffer.png"),
    // 바지
    [Clothes.SHORT_PANTS]: require("asset/image/character/girl/image_shorts.png"),
    [Clothes.LONG_PANTS_JEAN_BLACK]: require("asset/image/character/girl/image_long_sleeve_shirts.png"),
    // 니트/스웨터
    [Clothes.SWEATER]: require("asset/image/character/girl/image_sweater.png")
}
