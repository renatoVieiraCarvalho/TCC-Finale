import { StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

export default StyleSheet.create({
    container: {
        backgroundColor: '#FFFAFA',
        borderRadius: 6,
        flexDirection: 'row',
        width: '100%',
        marginBottom: 5,
        alignItems: 'center'
    },

    itemText: {
        textAlign: 'center',
        fontSize: RFPercentage(2.1),
        paddingVertical: 7,
    },

    itemTextPos: {
        textAlign: 'center',
        fontSize: RFPercentage(2.1),
        paddingVertical: 7,
        color: "#578A49"
    },

    itemTextNeg: {
        textAlign: 'center',
        fontSize: RFPercentage(2.1),
        paddingVertical: 7,
        color: "#D68517"
    }
});