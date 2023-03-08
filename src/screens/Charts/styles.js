import { StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#53428A',
        justifyContent: 'center',
        paddingTop: '8%'
    },

    header:{
        alignItems: 'center',
        marginBottom: '2%'
    },
    
    textHeader: {
        fontWeight: 'bold',
        fontSize: RFPercentage(4.9),
        color: '#FFFAFA',
    },

    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    textButton: {
        fontSize: RFPercentage(2.7),
        color: '#FFFAFA',
        textAlign: 'center'
    },

    input: {
        justifyContent: 'center',
        backgroundColor: '#8A7455',
        borderRadius: 12,
        height: 35,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D68517',
        width: '77%',
        borderRadius: 12,
        paddingVertical: '3%'
    },
});