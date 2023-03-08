import { StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: '#8A7455',
        borderRadius: 6,
        width: '100%',
        alignItems: 'center'
    },

    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: RFPercentage(2.3),
        paddingVertical: 7,
    },
});