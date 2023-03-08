import { StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#53428A',
        justifyContent: 'space-between',
        paddingTop: '10%',
        paddingBottom: '5%',
        alignItems: 'center'
    },

    header:{
        marginBottom: '8%'
    },

    subtitleItem: {        
        marginRight: "3%", 
        height: RFPercentage(4), 
        width: RFPercentage(4),
        borderRadius: 10,
    },
    
    textHeader: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: RFPercentage(4),
        color: '#FFFAFA',
    },

    subtitleField: {
        alignItems: 'center', 
        justifyContent: 'center'
    },

    textSubtitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: RFPercentage(2.7),
        color: '#FFFAFA',
    },

    footerRow: {
        marginTop: '5%',
        alignItems: 'center'
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D68517',
        height: 35,
        paddingHorizontal: '10%',
        borderRadius: 12,
        paddingVertical: 2
    }
});