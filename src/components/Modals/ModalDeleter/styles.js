import { StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

export default StyleSheet.create({
    centralizer: {
        flex: 1,
    },

    container: {
        backgroundColor: '#A8A8A8',
        borderWidth: 3,
    },

    header:{
        paddingVertical: '15%',
        borderBottomWidth: 3,
    },
    
    text: {
        textAlign: 'center',
        fontSize: RFPercentage(3),
    },

    textObj: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: RFPercentage(3.5),
    },

    buttonField: {
        flexDirection: 'row',  
    },

    button: {
        flex: 1, 
    },

    textButton: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: RFPercentage(5),
    },

    separator: {
        borderLeftWidth: 3
    }
});