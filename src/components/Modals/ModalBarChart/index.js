import React from 'react'

import { View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';

import { BarChart } from 'react-native-svg-charts'
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export function ModalBarChart({handleClose, dataChart}){

    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
    
    const data = dataChart.map((item) =>({
        amount: item.Amount,
        status: item.SelectedStatus,
        svg: { fill: randomColor() },
        key: item.ID,
        })
    )

    const handleSubtitle = () => {
        return data.map((item) =>{
            return(
                <View key={item.key} style={{flexDirection: "row", marginBottom: '1%', justifyContent: 'flex-start'}}>
                    <View style={[styles.subtitleItem, {backgroundColor: item.svg.fill}]}/>
                    <Text style={styles.textSubtitle}>{item.status}: R${item.amount.toFixed(2).replace('.',',')}</Text>
                </View>
                );
        })                   
    }

    return (
        <LinearGradient
        colors={['transparent','transparent', '#493687', '#3d2c73']} 
        style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.textHeader}>Relatório de</Text>
                <Text style={styles.textHeader}>Pagos e Recebidos</Text>
            </View>
            <BarChart style={{ height: "50%", width: '90%',paddingHorizontal: '10%',borderBottomWidth: 5, borderColor: '#FFFAFA'}} 
            data={data} 
            yAccessor={({ item }) => item.amount}
            yMin={0}
            />       
            <View style={{alignItems: 'center', marginTop: '5%'}}>
                <View>
                    {handleSubtitle()}
                </View>
            </View>
            <View style={styles.footerRow}>
                <TouchableOpacity style={styles.button}
                onPress={handleClose}
                >
                    <Feather name='arrow-left' size={RFPercentage(3.5)} color='#FFFAFA'/>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}