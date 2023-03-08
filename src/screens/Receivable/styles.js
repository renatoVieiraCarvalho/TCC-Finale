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
        marginBottom: '4%'       
    },
    
    textHeader:{
        fontWeight: 'bold',
        fontSize: RFPercentage(4.9),
        color: '#FFFAFA',
        marginBottom: '4%'
    },

    footer: {    
        marginVertical: '4%',
    },

    textButton: {
        fontSize: RFPercentage(2.3),
        color: '#FFFAFA',
    },

    footerRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '4%' 
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

