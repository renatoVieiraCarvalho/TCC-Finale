import React from 'react';

import styles from './styles';
import { View, Text, TouchableOpacity} from 'react-native';

import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";


export function ModalViewer({closeModal,propDescription,propSelectedCategory,propSelectedPayment,propDate,propSelectedStatus,propDatePay,propAmount,propHandleType }){

    const description = propDescription;
    const selectedCategory = propSelectedCategory;
    const selectedPayment = propSelectedPayment;
    const selectedStatus = propSelectedStatus;
    const handleDate = (new Date(propDate));
    const handleDatePay = (new Date(propDatePay));
    const amount = propAmount.toFixed(2).replace('.',',');
     
    return(
        <LinearGradient 
        colors={['transparent','transparent', '#493687', '#3d2c73']}
        style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Visualizando</Text>
                <Text style={styles.textHeader}>Conta a {propHandleType}</Text>
            </View>
            <View style={styles.form}>
                <View>
                    <Text style={styles.textForm}>Descrição</Text>
                    <View style={styles.input}>
                        <Text style={styles.inputText}>{description}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.textForm}>Categoria</Text>
                    <View style={[styles.input,{ width: '50%'}]}>
                        <Text style={styles.inputText}>{selectedCategory}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.textForm}>Forma pagamento</Text>
                    <View style={[styles.input,{ width: '50%'}]}>
                        <Text style={styles.inputText}>{selectedPayment}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.textForm}>Data cadastro</Text>
                    <View style={{width: '35%'}}>                                      
                        <View style={[styles.input, {alignItems: 'center'}]}>
                            <Text style={styles.inputText}>{ moment(handleDate).format('DD/MM/YY')}</Text>   
                        </View>                           
                    </View> 
                </View>
                <View style={styles.formRow}>
                    <View style={{width: '50%'}}>
                        <Text style={styles.textForm}>Status</Text>
                        <View style={[styles.input]}>
                            <Text style={styles.inputText}>{selectedStatus}</Text>
                        </View>
                    </View>
                    <View style={{width: '35%'}}>
                        <Text style={styles.textForm}>Data pagto</Text>
                        <View style={[styles.input, {alignItems: 'center'}]}>
                            <Text style={styles.inputText}>{ moment(handleDatePay).format('DD/MM/YY')}</Text>   
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.textForm}>Valor</Text>
                    <View style={[styles.input, {width: '50%'}]}>
                        <Text  style={styles.inputText}>{amount}</Text>
                    </View>
                </View>                  
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button}
                onPress={closeModal}
                >
                    <Feather name='arrow-left' size={RFPercentage(4.1)} color='#FFFAFA'/>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}