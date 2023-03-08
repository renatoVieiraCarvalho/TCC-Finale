import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { RFPercentage } from "react-native-responsive-fontsize";

import { GridList } from '../../components/MovementTable/GridList'

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
    name: 'mainDB.db',
    location: 'default'
},
() =>{ },
error =>{console.log(error)}
);

export function Movement() {

  const [ bills, setBills ] = useState([])
  const [ total , setTotal] = useState(0)
  const [ handleCategory , setHandleCategory] = useState('Todas');
  const [ selectedPayment, setSelectedPayment] = useState('Todas');
  const [ handleDate, setHandleDate ] = useState(new Date);
  const [ handleDateFinal, setHandleDateFinal ] = useState(new Date);
  const [ showDatePicker, setShowDatePicker ] = useState(false);
  const [ showDatePicker2, setShowDatePicker2 ] = useState(false);
  
  useFocusEffect(
    React.useCallback(()=>{
      let auxTotal = 0;
      setTotal(auxTotal.toFixed(2).replace('.',','))
      setBills([]);
  },[]))

  const getDatePicker = () => {

    let datePicker = <DateTimePicker 
            onChange={(_, date) => {setHandleDate(date); setShowDatePicker(false); }}
            value={handleDate}
            />

    const dateString = moment(handleDate).format('DD/MM/YY')

    if(Platform.OS === 'android') {
      datePicker = (
        <View style={{flexDirection: 'row'}}>                   
          <TouchableOpacity style={[styles.input, {width: '100%', alignItems: 'center'}]} onPress={() => setShowDatePicker(true)}>
            <View>
              <Text style={{fontSize: RFPercentage(2.1)}}>{dateString}</Text>   
            </View>           
          </TouchableOpacity>                    
          {showDatePicker && datePicker}
        </View>
      )
    }
    return datePicker;
}

  const getDatePicker2 = () => {

    let datePicker = <DateTimePicker 
            onChange={(_, date) => {setHandleDateFinal(date); setShowDatePicker2(false); }}
            value={handleDateFinal}
            />

    const dateString = moment(handleDateFinal).format('DD/MM/YY')

    if(Platform.OS === 'android') {
      datePicker = (
        <View style={{flexDirection: 'row'}}>                   
          <TouchableOpacity style={[styles.input, {width: '100%', alignItems: 'center'}]} onPress={() => setShowDatePicker2(true)}>
            <View>
              <Text style={{fontSize: RFPercentage(2.1)}}>{dateString}</Text>   
            </View>           
          </TouchableOpacity>                    
            {showDatePicker2 && datePicker}
        </View>
      )
    }
    return datePicker;
}

  const getData = () => {
    
    try {
        if(handleCategory === 'Todas' && selectedPayment === 'Todas'){
          db.transaction((tx) => {
              tx.executeSql(
                  "SELECT * FROM Bills WHERE (SelectedStatus='Pago' OR SelectedStatus='Recebido') AND HandleDatePay BETWEEN ?  AND ? ",
                  [moment(handleDate).format('MM/DD/YY'), moment(handleDateFinal).format('MM/DD/YY')],
                  (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                      temp.push(results.rows.item(i));

                    let dataTotal = 0;

                    temp.map(item =>{
                      if( item.SelectedStatus === 'Pago' ){
                        dataTotal = (item.Amount *(-1) ) + dataTotal;
                      }else{
                        dataTotal = item.Amount + dataTotal;
                      }

                    })

                    if( temp.length == 0 ){
                      Toast.show({
                        type: 'info',
                        text1: 'Nenhum resultado encontrado!',
                      });
                      setBills([]);
                      setTotal(dataTotal.toFixed(2).replace('.',','));
                      return
                    }
                    
                    setTotal(dataTotal.toFixed(2).replace('.',','))
                    setBills(temp);
                  }
              )
          })
        }else if(handleCategory !== 'Todas' && selectedPayment === 'Todas'){
          db.transaction((tx) => {
            tx.executeSql(
              "SELECT * FROM Bills WHERE (SelectedStatus='Pago' OR SelectedStatus='Recebido') AND (HandleDatePay BETWEEN ?  AND ?) AND (SelectedCategory=?) ",
              [moment(handleDate).format('MM/DD/YY'), moment(handleDateFinal).format('MM/DD/YY'),handleCategory],
              (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));

                let dataTotal = 0;

                temp.map(item =>{
                  if( item.SelectedStatus === 'Pago' ){
                    dataTotal = (item.Amount *(-1) ) + dataTotal;
                  }else{
                    dataTotal = item.Amount + dataTotal;
                  }
                })

                if( temp.length == 0 ){
                  Toast.show({
                    type: 'info',
                    text1: 'Nenhum resultado encontrado!',
                  });
                  setBills([]);
                  setTotal(dataTotal.toFixed(2).replace('.',','));
                  return
                }

                setTotal(dataTotal.toFixed(2).replace('.',','))
                setBills(temp);
              }
            )
        })
        }else if(handleCategory === 'Todas' && selectedPayment !== 'Todas'){
          db.transaction((tx) => {
            tx.executeSql(
              "SELECT * FROM Bills WHERE (SelectedStatus='Pago' OR SelectedStatus='Recebido') AND (HandleDatePay BETWEEN ?  AND ?) AND (SelectedPayment=?) ",
              [moment(handleDate).format('MM/DD/YY'), moment(handleDateFinal).format('MM/DD/YY'),selectedPayment],
              (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));

                let dataTotal = 0;

                temp.map(item =>{
                  if( item.SelectedStatus === 'Pago' ){
                    dataTotal = (item.Amount *(-1) ) + dataTotal;
                  }else{
                    dataTotal = item.Amount + dataTotal;
                  }

                })

                if( temp.length == 0 ){
                  Toast.show({
                    type: 'info',
                    text1: 'Nenhum resultado encontrado!',
                  });
                  setBills([]);
                  setTotal(dataTotal.toFixed(2).replace('.',','));
                  return
                }

                setTotal(dataTotal.toFixed(2).replace('.',','))
                setBills(temp);
              }
            )
        })
        }else if(handleCategory !== 'Todas' && selectedPayment !== 'Todas'){
          db.transaction((tx) => {
            tx.executeSql(
              "SELECT * FROM Bills WHERE (SelectedStatus='Pago' OR SelectedStatus='Recebido') AND (HandleDatePay BETWEEN ?  AND ?) AND (SelectedPayment=?) AND (SelectedCategory=?) ",
              [moment(handleDate).format('MM/DD/YY'), moment(handleDateFinal).format('MM/DD/YY'),selectedPayment,handleCategory],
              (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));

                let dataTotal = 0;

                temp.map(item =>{
                  if( item.SelectedStatus === 'Pago' ){
                    dataTotal = (item.Amount *(-1) ) + dataTotal;
                  }else{
                    dataTotal = item.Amount + dataTotal;
                  }

                })


                if( temp.length == 0 ){
                  Toast.show({
                    type: 'info',
                    text1: 'Nenhum resultado encontrado!',
                  });
                  setBills([]);
                  setTotal(dataTotal.toFixed(2).replace('.',','));
                  return
                }

                setTotal(dataTotal.toFixed(2).replace('.',','))
                setBills(temp);
              }
            )
        })}       
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <LinearGradient 
    colors={['transparent','transparent', '#493687', '#3d2c73']} 
    style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Movimentação</Text>
        <Text style={styles.textHeader}>Financeira</Text>    
      </View>

      <GridList
      handleData={bills} 
      />

      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <Text style={styles.textTotal}>Total R$</Text>
          <View style={styles.totalField}>
            <Text style={styles.textTotal}>{total}</Text>                
          </View>
        </View>
        <View style={styles.buttonField}>
          <Text style={[styles.textButton, {marginRight: '9%'}]}>Categoria</Text>
          <View style={[styles.input, {width: '50%'}]}>
                <Picker
                selectedValue={handleCategory}
                onValueChange={(itemValue, itemIndex) =>
                  setHandleCategory(itemValue)
                }>  
                    <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Todas" value="Todas" />
                    <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Casa" value="Casa" />
                    <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Estudos" value="Estudos" />
                    <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Lazer" value="Lazer" />
                    <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Mercado" value="Mercado" />
                    <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Veículo" value="Veiculo" />
                    <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Outros" value="Outros" />
                </Picker>
          </View>
        </View>
        <View style={[styles.buttonField,{marginTop: '3%'}]}>
          <Text style={[styles.textButton, {marginRight: '3%'}]}>Forma pagto</Text>
          <View style={[styles.input, {width: '50%'}]}>
                <Picker
                selectedValue={selectedPayment}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedPayment(itemValue)
                }>  
                  <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Todas" value="Todas"/>
                  <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Dinheiro" value="Dinheiro" />
                  <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Cartão crédito" value="Cartão crédito" />
                  <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Cartão débito" value="Cartão débito" />
                  <Picker.Item style={{fontSize: RFPercentage(2.1)}} label="Pix" value="Pix" />
                </Picker>
          </View>
        </View>
        
        <View style={styles.footerRow}>         
          <>
            <Text style={styles.textButton}>Data</Text>
            <View style={{width: '25%'}}>
            {getDatePicker()}
            </View>
            <Text style={styles.textButton}>Até</Text>
            <View style={{width: '25%'}}>
            {getDatePicker2()}
            </View>
          </>
          <TouchableOpacity style={styles.button}
          onPress={() =>  getData()}
          >
            <Feather name='search' size={RFPercentage(4.2)} color='#FFFAFA'/>
          </TouchableOpacity>
        </View>
        
      </View>

    </LinearGradient>
  );
}