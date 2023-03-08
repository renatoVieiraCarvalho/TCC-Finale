import React, {useState} from 'react';

import styles from './styles';
import { View, Text, TouchableOpacity, Modal} from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

import Scanner from '../../components/BarCode/Scanner';
import { ModalNewBarCode } from '../../components/Modals/ModalNewBarCode';

export function NewBarCode(){
    const navigation = useNavigation();
    const [handleModBarCode, setHandleModBarCode] = useState(false);
    const [dataBarCode, setDataBarCode] = useState('');

    function CloseModBarCode(){
        setHandleModBarCode(false);
    }
    
    const onCodeScanned = (type, data) => {
        let auxData1 = data.indexOf("86540") + 5;
        let auxData2 = data.indexOf("SAO PAULO");
        let auxData3 = data.slice(auxData1,auxData2)
        setDataBarCode(auxData3)
        setHandleModBarCode(true);
    };

    const handleGoBack = () => {
        navigation.goBack();
    }
     
    return(
        <LinearGradient
        colors={['transparent','transparent', '#493687', '#3d2c73']} 
        style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Ler QrCode</Text>
            </View>
            <Scanner 
            onCodeScanned={onCodeScanned}
            />
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button}
                onPress={() => handleGoBack()}
                >
                    <Feather name='arrow-left' size={30} color='#FFFAFA'/>
                </TouchableOpacity>
            </View>
            <Modal
            animationType='slide' 
            visible={handleModBarCode}
            >
                <ModalNewBarCode
                handleClose={CloseModBarCode}
                dataBarCode={dataBarCode}
                handleGoBack={handleGoBack}
            /> 
            </Modal>
        </LinearGradient>
    );
}