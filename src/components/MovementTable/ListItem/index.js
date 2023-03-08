import React, { useState } from 'react';

import styles from './styles';
import { View, Text, Modal, TouchableOpacity} from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

import { ModalViewer } from '../../Modals/ModalViewer';


export function ListItem({ Description, SelectedCategory, SelectedStatus, Amount, HandleType, SelectedPayment, HandleDate, HandleDatePay}){

    const [modalViewer, setModalViewer] = useState(false);

    function handleNegative(){
        if( HandleType === 'pagar'){
            return(
                <View style={{width: '21%'}}>
                    <Text style={styles.itemTextNeg}>{(Amount*(-1)).toFixed(2).replace('.',',')}</Text>                        
                </View>
            );
        }else{
            return(
                <View style={{width: '21%'}}>
                    <Text style={styles.itemTextPos}>{Amount.toFixed(2).replace('.',',')}</Text>                        
                </View>
            );
        }
    }

    function handleCloseViewer(){
        setModalViewer(false);
    }

    function handleOpenViewer(){
        setModalViewer(true);
    }

    return(
        <>         
            <TouchableOpacity style={styles.container}
            onPress={handleOpenViewer}
            >                   
                <View style={{width: '39%'}}>
                    <Text style={{paddingLeft: 15, fontSize: RFPercentage(2.1), paddingVertical: 7}}>{Description}</Text>
                </View>
                <View style={{borderRightWidth: 1, height: '100%'}}/>
                <View style={{width: '21%'}}>
                    <Text style={styles.itemText}>{SelectedCategory}</Text>
                </View>
                <View style={{borderRightWidth: 1, height: '100%'}}/>
                <View style={{width: '18%'}}>
                    <Text style={styles.itemText}>{SelectedPayment}</Text>
                </View>
                <View style={{borderRightWidth: 1, height: '100%'}}/>
                {handleNegative()}
            </TouchableOpacity>
            <Modal
            transparent={true}
            animationType='slide' 
            visible={modalViewer}
            >
                <ModalViewer
                closeModal={handleCloseViewer}
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
}