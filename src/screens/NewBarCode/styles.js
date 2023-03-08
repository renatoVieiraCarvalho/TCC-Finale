import { StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#53428A',
        justifyContent: 'space-between',
        paddingVertical: '8%',
    },

    header:{
        alignItems: 'center'
    },
    
    textHeader: {
        fontWeight: 'bold',
        fontSize: RFPercentage(4.9),
        color: '#FFFAFA',
    },

    footer: {
        alignItems: 'center'
    },

    button: {
        alignItems: 'center',
        backgroundColor: '#D68517',
        width: '20%',
        borderRadius: 12,
        paddingVertical: 2
    },
});