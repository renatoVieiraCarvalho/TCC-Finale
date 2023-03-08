import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Modal } from 'react-native';
import styles from './styles';

import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { RFPercentage } from "react-native-responsive-fontsize";

import { GridList } from '../../components/GeneralTable/GridList'
import { ModalNew } from '../../components/Modals/ModalNew';

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
    name: 'mainDB.db',
    location: 'default'
},
() =>{ },
error =>{console.log(error)}
);

export function Payable() {
  const [ bills, setBills ] = useState([])
  const [handleModalNew, setHandleModalNew] = useState(false);
  const [ handleCategory , setHandleCategory] = useState('Todas');
  const [ handleDate, setHandleDate ] = useState(new Date);
  const [ showDatePicker, setShowDatePicker ] = useState(false);

  const getDatePicker = () => {

    let datePicker = <DateTimePicker 
            onChange={(_, date) => {setHandleDate(date); setShowDatePicker(false); }}
            value={handleDate}
            />

    const dateString = moment(handleDate).format('DD/MM/YY')

    if(Platform.OS === 'android') {
      datePicker = (
        <View style={{flexDirection: 'row'}}>                   
            <TouchableOpacity style={[styles.input, { paddingHorizontal: '10%', alignItems: 'center'}]} onPress={() => setShowDatePicker(true)}>
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

  function CloseModalNew(){
    setHandleModalNew(false);
  }

  const getData = () => {
    
    try {
      if(handleCategory === 'Todas'){
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM Bills WHERE (SelectedStatus='Pago' OR SelectedStatus='Pagar') AND HandleDate=? ",
                [moment(handleDate).format('MM/DD/YY')],
                (tx, results) => {
                  var temp = [];
                  for (let i = 0; i < results.rows.length; ++i)
                    temp.push(results.rows.item(i));
                  
                  const dataCount = temp.length;

                  if( dataCount == 0 ){
                    Toast.show({
                      type: 'info',
                      text1: 'Nenhum resultado encontrado!',
                    });
                    setBills([]);
                    return
                  }
                  setBills(temp);
                }
            )
        })
      }else{
        db.transaction((tx) => {
          tx.executeSql(
              "SELECT * FROM Bills WHERE (SelectedStatus='Pago' OR SelectedStatus='Pagar') AND (HandleDate=?) AND (SelectedCategory=?) ",
              [moment(handleDate).format('MM/DD/YY'),handleCategory],
              (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));
                
                
                const dataCount = temp.length

                if( dataCount == 0 ){
                  Toast.show({
                    type: 'info',
                    text1: 'Nenhum resultado encontrado!',
                  });
                  setBills([]);
                  return
                }
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
        <Text style={styles.textHeader}>Contas a pagar</Text>
        <TouchableOpacity style={styles.button}
        onPress={ () => setHandleModalNew(true) }
        >
          <Feather name='plus' size={RFPercentage(4.2)} color='#FFFAFA'/>
        </TouchableOpacity>     
      </View>
      <GridList handleData={bills}
      propUpdate={getData}
      />
      <View style={styles.footer}>
        <View style={styles.buttonField}>
            <Text style={[styles.textButton, {marginRight: '3%'}]}>Categoria</Text>
            <View style={[styles.input, {width: '40%'}]}>
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
        <View style={styles.footerRow}>         
          <View style={styles.buttonField}>
            <Text style={[styles.textButton, {marginRight: '20%'}]}>Data</Text>
            {getDatePicker()}
          </View>
          <TouchableOpacity style={styles.button}
          onPress={getData}
          >
            <Feather name='search' size={RFPercentage(4.2)} color='#FFFAFA'/>
          </TouchableOpacity>
        </View>  
      </View>
      <Modal
      animationType='slide' 
      visible={handleModalNew}
      >
        <ModalNew
        type={'pagar'}
        handleClose={CloseModalNew}
        propUpdate={getData}
        /> 
      </Modal>
    </LinearGradient>
  );
}