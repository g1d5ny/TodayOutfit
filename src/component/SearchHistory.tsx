import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import History from "asset/icon/icon_history_record.svg"
import { CommonColor, CommonStyle, MobileFont, TabletFont } from "style/CommonStyle"
import { inputAddressState, isTablet, myAddressListState, resultAdressListState } from "store"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { useUserLocationHook } from "hook/useUserLocationHook"
import { MY_ADDRSS } from "type"

export const SearchHistory = () => {
    const myAddressList = useRecoilValue(myAddressListState)
    const setResultAddress = useSetRecoilState(resultAdressListState)
    const setInputAddress = useSetRecoilState(inputAddressState)
    const { addUserAddress } = useUserLocationHook()

    const Component = ({ item }: { item: MY_ADDRSS }) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    addUserAddress(item)
                    setResultAddress([])
                    setInputAddress("")
                }}
            >
                <Text style={(isTablet ? TabletFont.detail_2 : MobileFont.detail_3, { color: CommonColor.basic_gray_dark })}>{item.location}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[CommonStyle.row, myAddressList.length >= 2 && styles.flex]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {myAddressList.length >= 2 && (
                    <View style={styles.history}>
                        <History />
                    </View>
                )}
                {myAddressList.map((item, index) => {
                    if (index === 0) {
                        return
                    }
                    return <Component key={index} item={item} />
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
