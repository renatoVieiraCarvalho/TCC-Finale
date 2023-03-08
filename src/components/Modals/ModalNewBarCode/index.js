import React, { useState }from 'react';

import styles from './styles';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import CurrencyInput  from 'react-native-currency-input';
import Toast from 'react-native-toast-message';
import { RFPercentage } from "react-native-responsive-fontsize";

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
    name: 'mainDB.db',
    location: 'default'
},
() =>{ },
error =>{console.log(error)}
);

export function ModalNewBarCode({ handleClose, dataBarCode, handleGoBack }){
    
    const [ description, setDescription] = useState('');
    const [ selectedCategory, setSelectedCategory] = useState('');
    const [ selectedPayment, setSelectedPayment] = useState('Pix');
    const [ selectedStatus, setSelectedStatus] = useState('Pago');
    const [ handleDate, setHandleDate ] = useState (new Date());
    const [ showDatePicker, setShowDatePicker ] = useState(false);
    const [ handleDatePay, setHandleDatePay ] = useState (new Date());
    const [ showDatePicker2, setShowDatePicker2 ] = useState(false);
    const [ amount, setAmount] = useState(0);
    const handleType = "pagar";

    useFocusEffect(
        React.useCallback(()=>{
            let auxAmount1 = parseInt(dataBarCode[0]);
            auxAmount1 = auxAmount1 +1
            let auxAmount2 = dataBarCode.slice(1,auxAmount1);
            setAmount(auxAmount2);
            
            let auxDesc1 = dataBarCode.indexOf("BR59") + 4;
            let auxDesc2 = auxDesc1+2;
            let auxDesc3 = dataBarCode.slice(auxDesc1,auxDesc2);
            let auxDesc4 = parseInt(auxDesc2) + parseInt(auxDesc3);
            let auxDesc5 = dataBarCode.slice(auxDesc2,auxDesc4);
            let auxDescription = "Pix para " + auxDesc5;
            setDescription(auxDescription);           
      },[]))
        
    const setData = async () => {
        try {
            await db.transaction(async (tx) => {                    
                await tx.executeSql(
                    "INSERT INTO Bills (Description, Amount, HandleDate, HandleDatePay, HandleType, SelectedCategory, SelectedPayment, SelectedStatus) VALUES (?,?,?,?,?,?,?,?)",
                    [description, amount, moment(handleDate).format('MM/DD/YY'), moment(handleDatePay).format('MM/DD/YY'), handleType, selectedCategory, selectedPayment, selectedStatus]
                );
            })         
        } catch (error) {
            console.log("error");
        }finally{
            Toast.show({
                type: 'success',
                text1: 'Cadastrado com sucesso!',
            });
            handleClose();
            handleGoBack();
        }      
    }

    const getDatePicker1 = () => {

        let datePicker = <DateTimePicker 
                onChange={(_, date) => {setHandleDate(date); setShowDatePicker(false); }}
                value={handleDate}
                />

        const dateString = moment(handleDate).format('DD/MM/YY');

        if(Platform.OS === 'android') {
            datePicker = (
                <View style={{flexDirection: 'row'}}>                   
                    <TouchableOpacity style={[styles.input,{ width: '35%'}]} onPress={() => setShowDatePicker(true)}>
                        <View>
                            <Text style={{fontSize: RFPercentage(2.1), textAlign: 'center'}}>{dateString}</Text>   
                        </View>           
                    </TouchableOpacity>                    
                    {showDatePicker && datePicker}
               </View>
            )
        }
        return datePicker;
    }

    const getDatePicker2 = () => {

        let datePicker2 = <DateTimePicker 
                onChange={(_, date) => {setHandleDatePay(date); setShowDatePicker2(false); }}
                value={handleDatePay}
                />

        const dateString2 = moment(handleDatePay).format('DD/MM/YY');

        if(Platform.OS === 'android') {
            datePicker2 = (
                <>                   
                    <TouchableOpacity style={[styles.input,{ width: '100%'}]} onPress={() => setShowDatePicker2(true)}>
                        <View>
                            <Text style={{fontSize: RFPercentage(2.1), textAlign: 'center'}}>{dateString2}</Text>   
                        </View>           
                    </TouchableOpacity>                    
                    {showDatePicker2 && datePicker2}
               </>
            )
        }
        return datePicker2;
    }

    function handleDatePayment(){
        if( selectedStatus ==  "Pago" ){
            return(
                <>
                    <Text style={styles.textForm}>Data pagto</Text>
                    {getDatePicker2()}
                </>
            );
        }else{
            return(
                <View/>
            );
        }
    }

    function ValidateForm(){
        let handleAutText = ""
        let error = false;

        if(description == "" || description.trim() == ""){
            handleAutText = handleAutText + "\nDescrição "            
            error = true;
        }
        if( selectedCategory == ""){ 
            handleAutText = handleAutText + "\nCategoria "
            error = true;
        }
        if( selectedPayment == ""){
            handleAutText = handleAutText + "\nForma pgt "
            error = true;
        }
        if( selectedStatus == ""){
            handleAutText = handleAutText + "\nStatus "
            error = true;
        }
        if(amount == 0){
           handleAutText = handleAutText + "\nValor "
            error = true;
        }      
        if(error == true){
            Alert.alert("Atenção Confira os campos:", handleAutText)
        }
        return !error;
    }

    function handleNewBill() {

        if(ValidateForm()){
            setData();          
        }
    }

    return(
        <LinearGradient 
        colors={['transparent','transparent', '#493687', '#3d2c73']}
        style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Conta a pagar</Text>               
                </View>
                <View style={styles.form}>
                    <View style={{marginBottom: '8%'}}>
                        <Text style={styles.textForm}>Descrição</Text>
                        <TextInput style={styles.inputText}
                        value={description}
                        onChangeText={setDescription}
                        />
                    </View>
                    <View style={{marginBottom: '8%'}}>
                        <Text style={styles.textForm}>Categoria</Text>
                        <View style={[styles.input,{ width: '50%'}]}>
                            <Picker
                            selectedValue={selectedCategory}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedCategory(itemValue)
                            }>
                                <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Selecionar" value="" enabled={false}/>
                                <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Casa" value="Casa" />
                                <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Estudos" value="Estudos" />
                                <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Lazer" value="Lazer" />
                                <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Mercado" value="Mercado" />
                                <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Veículo" value="Veículo" />
                                <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Outros" value="Outros" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{marginBottom: '8%'}}>
                        <Text style={styles.textForm}>Forma pagamento</Text>
                        <View style={[styles.input,{ width: '50%'}]}>
                            <Picker
                            selectedValue={selectedPayment}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedPayment(itemValue)
                            }>
                                <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Selecionar" value="" enabled={false}/>
                                <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Dinheiro" value="Dinheiro" />
                                <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Cartão crédito" value="Cartão crédito" />
                                <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Cartão débito" value="Cartão débito" />
                                <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Pix" value="Pix" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{marginBottom: '8%'}}>
                        <Text style={styles.textForm}>Data cadastro</Text>
                        {getDatePicker1()} 
                    </View>
                    <View style={styles.formRow}>
                        <View style={{width: '50%'}}>
                            <Text style={styles.textForm}>Status</Text>
                            <View style={[styles.input]}>
                                <Picker
                                selectedValue={selectedStatus}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedStatus(itemValue)
                                }>  
                                    <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Selecionar" value="" enabled={false}/>
                                    <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="A Pagar" value="Pagar"/>
                                    <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Pago" value="Pago"/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{width: '35%'}}>
                            {handleDatePayment()}
                        </View>
                    </View>
                    <View style={{marginBottom: '8%'}}>
                        <Text style={styles.textForm}>Valor</Text>
                        <CurrencyInput   
                        style={[styles.inputText, {width: '50%'}]}
                        value={amount}
                        onChangeValue={setAmount}
                        delimiter="."
                        separator=","
                        precision={2}
                        minValue={0}
                        />
                    </View>                    
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button}
                    onPress={handleClose}
                    >
                        <Feather name='x' size={RFPercentage(4.1)} color='#FFFAFA'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                    onPress={handleNewBill}
                    >
                        <Feather name='check' size={RFPercentage(4.1)} color='#FFFAFA'/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}