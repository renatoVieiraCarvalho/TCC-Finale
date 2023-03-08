import React, { useState } from 'react';

import { Text, TouchableOpacity, View, Modal } from 'react-native';
import styles from './styles';

import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { RFPercentage } from "react-native-responsive-fontsize";


import { ModalNew } from '../../components/Modals/ModalNew';

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
    name: 'mainDB.db',
    location: 'default'
},
() =>{ },
error =>{console.log(error)}
);


export function Dashboard() {

  const navigation = useNavigation();
  const [handleType, setHandleType] = useState('');
  const [handleModalNew, setHandleModalNew] = useState(false);
  const [total, setTotal] = useState(false);

  useFocusEffect(
    React.useCallback(()=>{
    const subscribe = db.transaction((tx) => {
      tx.executeSql(
        "SELECT Amount, SelectedStatus FROM Bills WHERE SelectedStatus='Pago' OR SelectedStatus='Recebido'",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
            //console.log(temp)
          let dataTotal = 0;

          temp.map(item =>{
            if( item.SelectedStatus === 'Pago' ){
              dataTotal = (item.Amount *(-1) ) + dataTotal;
            }else{
              dataTotal = item.Amount + dataTotal;
            }
          })
            
            setTotal(dataTotal.toFixed(2).replace('.',','))
          }
      )
    })

    return () => subscribe;
  },[]))

  const getData = () => {
    
    db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM Bills WHERE SelectedStatus='Pago' OR SelectedStatus='Recebido'",
      [],
      (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
          //console.log(temp)
        let dataTotal = 0;

        temp.map(item =>{
          if( item.SelectedStatus === 'Pago' ){
            dataTotal = (item.Amount *(-1) ) + dataTotal;
          }else{
            dataTotal = item.Amount + dataTotal;
          }
        })

          setTotal(dataTotal.toFixed(2).replace('.',','))
      }
    )})
  }


  function CloseModalNew(){
    setHandleModalNew(false);
  }
 
  return (
    <LinearGradient 
    colors={['transparent','transparent', '#493687', '#3d2c73']}
    style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.textHello}>Olá,</Text>
          <Text style={styles.textUser}>Usuário</Text>
        </View>
        <TouchableOpacity style={styles.buttonLogout}>
          <Feather name='log-out' size={RFPercentage(3.2)} color='#FFFAFA'/>
        </TouchableOpacity>        
      </View>
      <View>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>Seu saldo atual</Text>
        <View style={styles.amountField}>
          <Text style={styles.textAmount}>{total}</Text>
          <Text style={styles.textSign}>R$</Text>
        </View>
      </View>
      <View>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>Cadastro rápido</Text>
        <View style={[styles.buttonField, {marginBottom: '10%', marginTop: '8%'}]}>
          <TouchableOpacity style={styles.button}
          onPress={() => {setHandleModalNew(true); setHandleType('receber')}}
          >
            <Feather name='plus' size={RFPercentage(4.1)} color='#FFFAFA'/>
          </TouchableOpacity>
          <Text style={styles.text}>Entrada</Text>
        </View>
        <View style={styles.buttonField}>
          <TouchableOpacity style={styles.button}
          onPress={() => {setHandleModalNew(true); setHandleType('pagar')}}
          >
            <Feather name='minus' size={RFPercentage(4.1)} color='#FFFAFA'/>
          </TouchableOpacity >
          <Text style={styles.text}>Saída</Text>
        </View>
        <View style={styles.buttonField}>
          <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('NewBarCode')}
          >
            <Feather name='camera' size={RFPercentage(4.1)} color='#FFFAFA'/>
          </TouchableOpacity >
          <Text style={styles.text}>Saída QrCode</Text>
        </View>
      </View>
      <Modal
      animationType='slide' 
      visible={handleModalNew}
      >
        <ModalNew
        type={handleType}
        handleClose={CloseModalNew}
        propUpdate={getData}
        /> 
      </Modal>
    </LinearGradient>
  );
}