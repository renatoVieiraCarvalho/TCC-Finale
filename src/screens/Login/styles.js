import { StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

export default StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#53428A',
        justifyContent: 'center',
        paddingHorizontal: '7%'    
    },
    
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%'
    },

    form: {
        justifyContent: 'space-between',
        height: '25%'
    },

    inputText: {
        justifyContent: 'center',
        backgroundColor: '#8A7455',
        height: 40,
        fontSize: RFPercentage(2.1),
        paddingHorizontal: '3%',
        borderRadius: 12
    },

    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%'
    },

    textCenter:{
        fontWeight: 'bold',
        fontSize: RFPercentage(2.2),
        color: '#FFFAFA',
        textAlign: 'center'
    },

    centerRow: {    
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
  
    button: {
        alignItems: 'center',
        backgroundColor: '#D68517',
        width: '20%',
        borderRadius: 12,
        paddingVertical: 5
    },
});