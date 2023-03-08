import React, {useState} from 'react';

import styles from './styles';
import { View, Text, TouchableOpacity, Modal} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { RFPercentage } from "react-native-responsive-fontsize";
import Toast from 'react-native-toast-message';

import { ModalPieChart } from '../../components/Modals/ModalPieChart';
import { ModalBarChart } from '../../components/Modals/ModalBarChart';

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
    name: 'mainDB.db',
    location: 'default'
},
() =>{ },
error =>{console.log(error)}
);

export function Charts(){
    const [handleModPie, setHandleModPie] = useState(false);
    const [handleModBar, setHandleModBar] = useState(false);
    const [ selectedType, setSelectedType] = useState('');
    const [ handleDate, setHandleDate ] = useState (new Date());
    const [ showDatePicker, setShowDatePicker ] = useState(false);
    const [ handleDateFinal, setHandleDateFinal ] = useState (new Date());
    const [ showDatePicker2, setShowDatePicker2 ] = useState(false);
    const [ handleDate2, setHandleDate2 ] = useState (new Date());
    const [ showDatePicker3, setShowDatePicker3 ] = useState(false);
    const [ handleDateFinal2, setHandleDateFinal2 ] = useState (new Date());
    const [ showDatePicker4, setShowDatePicker4 ] = useState(false);
    const [ data, setData] = useState([]);

    function CloseModPie(){
        setHandleModPie(false);
    }

    function CloseModBar(){
        setHandleModBar(false);
    }

    const getDatePicker1 = () => {

        let datePicker = <DateTimePicker 
                onChange={(_, date) => {setHandleDate(date); setShowDatePicker(false); }}
                value={handleDate}
                />

        const dateString = moment(handleDate).format('DD/MM/YY')

        if(Platform.OS === 'android') {
            datePicker = (
                <View style={{flexDirection: 'row'}}>                   
                    <TouchableOpacity style={[styles.input,{ width: '100%'}]} onPress={() => setShowDatePicker(true)}>
                        <View>
                            <Text style={{fontSize: RFPercentage(2.3), textAlign: 'center'}}>{dateString}</Text>   
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
                onChange={(_, date) => {setHandleDateFinal(date); setShowDatePicker2(false); }}
                value={handleDateFinal}
                />

        const dateString2 = moment(handleDateFinal).format('DD/MM/YY')

        if(Platform.OS === 'android') {
            datePicker2 = (
                <>                   
                    <TouchableOpacity style={[styles.input,{ width: '100%'}]} onPress={() => setShowDatePicker2(true)}>
                        <View>
                            <Text style={{fontSize: RFPercentage(2.3), textAlign: 'center'}}>{dateString2}</Text>   
                        </View>           
                    </TouchableOpacity>                    
                    {showDatePicker2 && datePicker2}
               </>
            )
        }
        return datePicker2;
    }

    const getDatePicker3 = () => {

        let datePicker3 = <DateTimePicker 
                onChange={(_, date) => {setHandleDate2(date); setShowDatePicker3(false); }}
                value={handleDate2}
                />

        const dateString3 = moment(handleDate2).format('DD/MM/YY')

        if(Platform.OS === 'android') {
            datePicker3 = (
                <>                   
                    <TouchableOpacity style={[styles.input,{ width: '100%'}]} onPress={() => setShowDatePicker3(true)}>
                        <View>
                            <Text style={{fontSize: RFPercentage(2.3), textAlign: 'center'}}>{dateString3}</Text>   
                        </View>           
                    </TouchableOpacity>                    
                    {showDatePicker3 && datePicker3}
               </>
            )
        }
        return datePicker3;
    }

    const getDatePicker4 = () => {

        let datePicker4 = <DateTimePicker 
                onChange={(_, date) => {setHandleDateFinal2(date); setShowDatePicker4(false); }}
                value={handleDateFinal2}
                />

        const dateString4 = moment(handleDateFinal2).format('DD/MM/YY')

        if(Platform.OS === 'android') {
            datePicker4 = (
                <>                   
                    <TouchableOpacity style={[styles.input,{ width: '100%'}]} onPress={() => setShowDatePicker4(true)}>
                        <View>
                            <Text style={{fontSize: RFPercentage(2.3), textAlign: 'center'}}>{dateString4}</Text>   
                        </View>           
                    </TouchableOpacity>                    
                    {showDatePicker4 && datePicker4}
               </>
            )
        }
        return datePicker4;
    }

    async function getDataPie (){
        
              await db.transaction( (tx) => {
                   tx.executeSql(
                      "SELECT ID, SUM(Amount) as Amount,SelectedCategory FROM Bills WHERE (SelectedStatus=?) AND HandleDatePay BETWEEN ?  AND ? GROUP BY SelectedCategory",
                      [selectedType,moment(handleDate).format('MM/DD/YY'), moment(handleDateFinal).format('MM/DD/YY')],
                      (tx, results) => {
                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i){
                          temp.push(results.rows.item(i));
                        }
    
                        if( temp.length === 0 ){
                          setData([]);
                          Toast.show({
                            type: 'info',
                            text1: 'Nenhum resultado encontrado!',
                          });
                          return
                        }else{
                            setData(temp);
                            
                            return setHandleModPie(true);
                        }

                      }
                  )
              })

    }

    async function getDataBar (){
    await db.transaction( (tx) => {
            tx.executeSql(
            "SELECT ID, SUM(Amount) as Amount, SelectedStatus FROM Bills WHERE (SelectedStatus='Pago' OR SelectedStatus='Recebido') AND HandleDatePay BETWEEN ?  AND ? GROUP BY SelectedStatus",
            [moment(handleDate2).format('MM/DD/YY'), moment(handleDateFinal2).format('MM/DD/YY')],
            (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
                //console.log(temp)


                if( temp.length == 0 ){
                setData([]);
                Toast.show({
                    type: 'info',
                    text1: 'Nenhum resultado encontrado!',
                    });
                    return
                }else{
                    setData(temp);
                    return setHandleModBar(true);
                }
            }
        )
        
    })
    }

    const handleDataPie = async () => {
    if( selectedType === "" ){
        Toast.show({
            type: 'info',
            text1: 'Selecione um tipo de conta!',
        });
        return
    }
    await getDataPie();       
    }

    const handleDataBar = async () => {
    await getDataBar();
    
    }
  
    return(
        <LinearGradient
        colors={['transparent','transparent', '#493687', '#3d2c73']} 
        style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Gráficos</Text>
            </View>
            <View>
                <View style={{marginBottom: '5%', alignItems: 'center', borderWidth: 2, borderColor: '#FFFAFA', marginHorizontal: '15%', paddingVertical: '2%', borderRadius: 12}}>
                    <Text style={[styles.textButton]}>Gerar gráfico de</Text>
                    <Text style={[styles.textButton,{marginBottom: '2%'}]}>Tipo de conta</Text>
                    <View style={[styles.input,{ width: '80%',marginBottom: 10}]}>
                        <Picker
                        selectedValue={selectedType}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedType(itemValue)
                        }>
                            <Picker.Item style={{fontSize: RFPercentage(2.3)}} label="Selecionar" value="" enabled={false}/>
                            <Picker.Item style={{fontSize: RFPercentage(2.3)}} label="Pago" value="Pago" />
                            <Picker.Item style={{fontSize: RFPercentage(2.3)}} label="Recebido" value="Recebido" />
                        </Picker>
                </View>
                <View>
            <Text style={[styles.textButton, {textAlign: 'center', marginBottom: '2%',marginTop: '2%'}]}>Selecione um período:</Text>
            <View style={{marginBottom: '5%'}}>
                <View style={[styles.footerRow,{marginBottom: 15}]}>
                    <Text style={[styles.textButton, {marginRight: '5%'}]}>De</Text>
                    <View style={{width: '70%'}}>
                        {getDatePicker1()}
                    </View>
                </View>
                <View style={styles.footerRow}>
                    <Text style={[styles.textButton, {marginRight: '4.5%'}]}>Até</Text>
                    <View style={{width: '70%'}}>
                        {getDatePicker2()}
                    </View>
                </View>                  
            </View>
            </View>
                <TouchableOpacity style={styles.button}
                onPress={() => handleDataPie()}
                >
                    <Feather name='pie-chart' size={RFPercentage(4.5)} color='#FFFAFA'/>
                </TouchableOpacity>
            </View>
            <View style={{marginBottom: '2%', alignItems: 'center', borderWidth: 2, borderColor: '#FFFAFA', marginHorizontal: '15%', paddingVertical: '2%', borderRadius: 12}}>
                <Text style={[styles.textButton]}>Gerar gráfico de</Text>
                <Text style={[styles.textButton,{marginBottom: '3%'}]}>Pagos e Recebidos</Text>
                <View>
            <Text style={[styles.textButton, {textAlign: 'center', marginBottom: '2%'}]}>Selecione um período:</Text>
            <View style={{marginBottom: '5%'}}>
                <View style={[styles.footerRow,{marginBottom: 15}]}>
                    <Text style={[styles.textButton, {marginRight: '5%'}]}>De</Text>
                    <View style={{width: '70%'}}>
                        {getDatePicker3()}
                    </View>
                </View>
                <View style={styles.footerRow}>
                    <Text style={[styles.textButton, {marginRight: '4.5%'}]}>Até</Text>
                    <View style={{width: '70%'}}>
                        {getDatePicker4()}
                    </View>
                </View>                  
            </View>
            </View>
                <TouchableOpacity style={styles.button}
                onPress={() => handleDataBar()}
                >
                    <Feather name='bar-chart-2' size={RFPercentage(4.5)} color='#FFFAFA'/>
                </TouchableOpacity>
            </View>
            </View>
            <Modal
            animationType='slide' 
            visible={handleModPie}
            >
                <ModalPieChart
                handleClose={CloseModPie}
                dataChart={data}
            /> 
            </Modal>
            <Modal
            animationType='slide' 
            visible={handleModBar}
            >
                <ModalBarChart
                handleClose={CloseModBar}
                dataChart={data}
            /> 
            </Modal>
        </LinearGradient>
    );
}