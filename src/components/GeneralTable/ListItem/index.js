import React , { useRef, useState } from 'react';

import styles from './styles';
import { View, Text, Modal} from 'react-native';

import  Feather  from '@expo/vector-icons/Feather';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFPercentage } from "react-native-responsive-fontsize";

import { ModalDeleter } from '../../Modals/ModalDeleter';
import { ModalUpdate } from '../../Modals/ModalUpdate';


export function ListItem({ID, Description, SelectedCategory, SelectedStatus, Amount, HandleType, propUpdate, SelectedPayment, HandleDate, HandleDatePay}){

    const swipeableRef = useRef(null);
    const [modalDeleter, setModalDeleter] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const LeftSwipe = () => {
        return(
            <>
            <View style={{marginRight: 20, justifyContent: 'center'}}>
                <Feather name='trash-2' size={RFPercentage(4.2)} color={'#8A7455'}/>
            </View>
            <Modal
            transparent={true}
            animationType='slide' 
            visible={modalDeleter}
            >
               <ModalDeleter
               propUpdate={propUpdate}
               closeModal={handleCloseDeleter}
               PropDescription={Description}
               PropID={ID}
               /> 
            </Modal>
            </>
        );
    };

    const RightSwipe = () => {
        return(
            <>
            <View style={{marginLeft: 20, justifyContent: 'center'}}>
                <Feather name='edit' size={RFPercentage(4.2)} color={'#578A49'}/>
            </View>
            <Modal
            transparent={true}
            animationType='slide' 
            visible={modalEdit}
            >
               <ModalUpdate
               propUpdate={propUpdate}
               closeModal={handleCloseEdit}
               propID={ID}
               propDescription={Description}
               propSelectedCategory={SelectedCategory}
               propSelectedPayment={SelectedPayment}
               propDate={HandleDate}
               propSelectedStatus={SelectedStatus}
               propDatePay={HandleDatePay}
               propAmount={Amount}
               propHandleType={HandleType}
               /> 
            </Modal>
            </>
        );
    };

    function handleCloseDeleter(){
        setModalDeleter(false);
        swipeableRef.current.close();
    }

    function handleOpenDeleter(){
        setModalDeleter(true);
    }

    function handleCloseEdit(){
        setModalEdit(false);
        swipeableRef.current.close();
    }

    function handleOpenEdit(){
        setModalEdit(true);
    }

    function handleNegative(){
        if( HandleType === 'pagar'){
            return(
                <View style={{width: '22%'}}>
                    <Text style={styles.itemTextNeg}>{(Amount*(-1)).toFixed(2).replace('.',',')}</Text>                        
                </View>
            );
        }else{
            return(
                <View style={{width: '22%'}}>
                    <Text style={styles.itemTextPos}>{Amount.toFixed(2).replace('.',',')}</Text>                        
                </View>
            );
        }
    }
    
    return(
        <GestureHandlerRootView>
            <Swipeable
            ref={swipeableRef}
            renderLeftActions={LeftSwipe}
            renderRightActions={RightSwipe}
            onSwipeableLeftOpen={handleOpenDeleter}
            onSwipeableRightOpen={handleOpenEdit}
            >           
                <View style={styles.container}>                   
                    <View style={{width: '39%'}}>
                        <Text style={{paddingLeft: 15, fontSize: RFPercentage(2.1), paddingVertical: 7}}>{Description}</Text>
                    </View>
                    <View style={{borderRightWidth: 1, height: '100%'}}/>
                    <View style={{width: '21%'}}>
                        <Text style={styles.itemText}>{SelectedCategory}</Text>
                    </View>
                    <View style={{borderRightWidth: 1, height: '100%'}}/>
                    <View style={{width: '18%'}}>
                        <Text style={styles.itemText}>{SelectedStatus}</Text>
                    </View>
                    <View style={{borderRightWidth: 1,borderColor: 'black', height: '100%'}}/>
                    {handleNegative()}
                </View>
            </Swipeable>            
        </GestureHandlerRootView>
    );
}