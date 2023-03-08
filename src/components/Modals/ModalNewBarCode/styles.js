import { StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#53428A',
        justifyContent: 'space-between',
        paddingTop: '12%',
        paddingBottom: '2%'
    },

    header:{
        alignItems: 'center',
        marginBottom: '6%'
    },
    
    textHeader: {
        fontWeight: 'bold',
        fontSize: RFPercentage(4.9),
        color: '#FFFAFA',
    },

    form: {
        flex: 1,
        marginHorizontal: '3%',
        justifyContent: 'space-evenly',
        marginBottom: '7%'
    },

    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '6%',
    },

    textForm: {
        color: '#FFFAFA',
        fontWeight: 'bold',
        fontSize: RFPercentage(2.3),
        marginLeft: '2%'
    },

    input: {
        justifyContent: 'center',
        backgroundColor: '#8A7455', 
        height: 35,
        borderRadius: 12
    },

    inputText: {
        justifyContent: 'center',
        backgroundColor: '#8A7455',
        height: 35,
        fontSize: RFPercentage(2.1),
        paddingHorizontal: '3%',
        borderRadius: 12
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    button: {
        alignItems: 'center',
        backgroundColor: '#D68517',
        width: '20%',
        borderRadius: 12,
        paddingVertical: 2
    },
});