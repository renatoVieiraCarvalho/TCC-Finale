import { StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

export default StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#53428A',
        justifyContent: 'space-between',
        paddingVertical: '12%',    
    },

    header:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '3%'
    },
    
    headerText:{
        flexDirection: 'row',
        alignItems: 'baseline'
    },

    textHello: {
        fontSize: RFPercentage(3.9),
        color: '#FFFAFA'
    },

    textUser: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: RFPercentage(5.2),
        color: '#FFFAFA'
    },

    buttonLogout: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D68517',
        borderRadius: 100,
        height: 50,
        width: 50,
    },

    text: {
        fontSize: RFPercentage(3),
        color: '#FFFAFA',
        marginLeft: '3%'
    },

    amountField: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#578A49'
    },

    textAmount: {
        fontSize: RFPercentage(9),
        color: '#90D67C'
    },

    textSign: {
        fontSize: RFPercentage(3.6),
        color: '#90D67C',
        marginLeft: 15,
    },
    
    buttonField: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '5%',
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D68517',
        borderRadius: 12,
        height: 45,
        width: 45,
        marginLeft: '3%',
    },
});

