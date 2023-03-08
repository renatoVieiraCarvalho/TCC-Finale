import { StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

export default StyleSheet.create({
   
    container: {
        flex: 1,
        backgroundColor: '#53428A',
        justifyContent: 'center',
        paddingHorizontal: '7%',   
    },
    
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20%'
    },

    textHeader:{
        fontWeight: 'bold',
        fontSize: RFPercentage(4.9),
        color: '#FFFAFA',
        textAlign: 'center',
    },

    form: {
        justifyContent: 'space-between',
        height: '20%'
    },

    inputText: {
        justifyContent: 'center',
        backgroundColor: '#8A7455',
        height: 40,
        fontSize: RFPercentage(2.3),
        paddingHorizontal: '3%',
        borderRadius: 3
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: '20%'
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D68517',
        borderRadius: 12,
        height: 35,
        width: '30%'
    },
});