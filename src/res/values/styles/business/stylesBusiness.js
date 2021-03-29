import { StyleSheet } from "react-native";
import { getFontScale } from "react-native/Libraries/Utilities/PixelRatio";
import Sizes from '../../Sizes'

export default stylesBusiness = StyleSheet.create({
    // Card: {
    //     backgroundColor: 'blue',
    // },
    gauge: {
        position: 'absolute',
        width: 100,
        height: 160,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
        alignItems: 'center',

    },
    title: {
        paddingLeft: Sizes.h16,
        paddingBottom: Sizes.h16 / 2,
        paddingTop: Sizes.h16,
        fontSize: Sizes.h16,
    },
    chart: {
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        paddingVertical: Sizes.h24
    },

    thisYear: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: Sizes.h14,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5'
    },
    imgThisYear: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtThisYear: {
        paddingLeft: Sizes.s10
    },
    lastYear: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: Sizes.h14,
        borderRadius: 9,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5'
    },
    imgLastYear: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtLastYear: {
        paddingLeft: Sizes.s10
    },
    income: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        // marginTop: Sizes.h16 / 2
    },
    joined: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    txtSeeAll: {
        paddingRight: Sizes.h18,
        paddingBottom: Sizes.h16 / 2,
        paddingTop: Sizes.h24,
        fontSize: Sizes.h14,
        color: 'blue'
    },
    prjJoined: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        alignItems: 'center',
        padding: Sizes.h24,
        justifyContent: 'space-between',
    },
    imgJoined: {
        width: Sizes.s160,
        height: Sizes.h100 + 50
    },

    imgJoined2: { 
        width: Sizes.s2, 
        height: Sizes.h28
    },
    txtJoined: {
        position: 'absolute',
        alignItems: 'center',
        fontSize: Sizes.h48,
        color: 'white',
        backgroundColor: 'transparent',
        paddingHorizontal: Sizes.h46,
        paddingVertical: Sizes.h46, 
    },
    revenueAndThisYear: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: Sizes.h14,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5'
    },
    revenueAndLastYear: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: Sizes.h14,
        borderRadius: 9,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5'
    },
});
