import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import History from "asset/icon/icon_history_record.svg"
import { CommonColor, CommonStyle, FontStyle } from "style/CommonStyle"
import { inputAddressState, isTablet, myAddressListState } from "store"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { useUserLocationHook } from "hook/useUserLocationHook"
import { MY_ADDRSS } from "type"
import { navigationRef } from "navigation/RootNavigation"

const HISTORY_AREA = 20
export const SearchHistory = () => {
    const myAddressList = useRecoilValue(myAddressListState)
    const setInputAddress = useSetRecoilState(inputAddressState)
    const { addUserAddress } = useUserLocationHook()

    const Component = ({ item }: { item: MY_ADDRSS }) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    addUserAddress(item)
                    setInputAddress({ value: "", isEditing: false })
                    navigationRef.current?.navigate("LocationNavigator", { screen: "LocationScreen" })
                }}
            >
                <Text style={[isTablet ? FontStyle.label1.regular : FontStyle.label2.regular, { color: CommonColor.basic_gray_dark }]}>{item.location}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[myAddressList.length >= 2 && styles.flex]}>
            <View style={CommonStyle.row}>
                {myAddressList.length >= 2 && (
                    <View style={styles.history}>
                        <History />
                    </View>
                )}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.itemContainer}>
                    {myAddressList.map((item, index) => {
                        if (index === 0) {
                            return
                        }
                        return <Component key={index} item={item} />
                    })}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        gap: 8,
        paddingRight: CommonStyle.padding.paddingHorizontal + HISTORY_AREA
    },
    item: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: CommonColor.basic_gray_light,
        borderRadius: 4
    },
    history: {
        marginRight: 10
    },
    flex: {
        width: "100%",
        marginTop: isTablet ? 12 : 8,
        marginLeft: CommonStyle.padding.paddingHorizontal
    }
})
