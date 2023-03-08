import { StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

export default StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#53428A',
        justifyContent: 'space-between',
        paddingTop: '12%',
        paddingHorizontal: '1%'    
    },

    header:{
        alignItems: 'center',
        marginBottom: '2%'       
    },
    
    textHeader:{
        fontWeight: 'bold',
        fontSize: RFPercentage(4.9),
        color: '#FFFAFA',
        textAlign: 'center',
    },

    footer: {    
        marginTop: 5,
        marginBottom: '4%'
    },

    footerTotal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#8A7455',
        borderRadius: 12,
        width: '100%',
        marginBottom: '3%',
    },

    totalField: {
        backgroundColor: '#FFFAFA',
        width: '40%',
        borderRadius: 12,
        paddingVertical: 7,
        marginLeft: '3%'
    },

    textTotal:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: RFPercentage(2.3),
    },

    textButton: {
        fontSize: RFPercentage(2.3),
        color: '#FFFAFA',
    },

    footerRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '3%' 
    },

    textInput: {
        fontSize: RFPercentage(2.1),
    },

    buttonField: {
        flexDirection: 'row',
        alignItems: 'center',
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
        borderRadius: 12,
        height: 35,
        width: 60,
        paddingVertical: 2
    },
});

