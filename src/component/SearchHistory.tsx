import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import History from "asset/icon/icon_history_record.svg"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "style/CommonStyle"
import { isTablet, myAddressListState } from "store"
import { useRecoilValue } from "recoil"

export const SearchHistory = () => {
    const myAddressList = useRecoilValue(myAddressListState)

    const Component = ({ location }: { location: string }) => {
        return (
            <TouchableOpacity style={styles.item}>
                <Text style={(isTablet ? TabletFont.detail_2 : MobileFont.detail_3, { color: CommonColor.basic_gray_dark })}>{location}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[CommonStyle.row, styles.flex]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.history}>
                    <History />
                </View>
                {myAddressList.map(({ location }, index) => {
                    if (index === 0) {
                        return
                    }
                    return <Component key={index} location={location} />
                })}
                {myAddressList.map(({ location }, index) => {
                    return <Component key={index} location={location} />
                })}
                {myAddressList.map(({ location }, index) => {
                    return <Component key={index} location={location} />
                })}
                {myAddressList.map(({ location }, index) => {
                    return <Component key={index} location={location} />
                })}
                {myAddressList.map(({ location }, index) => {
                    return <Component key={index} location={location} />
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: CommonColor.basic_gray_light,
        borderRadius: 4,
        marginRight: 8
    },
    history: {
        marginRight: 14
    },
    flex: {
        width: "100%",
        marginTop: 12,
        marginBottom: 18
    }
})
