import React from 'react'

import { View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';

import { PieChart } from 'react-native-svg-charts'
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export function ModalPieChart({handleClose, dataChart}){

    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

    const data = dataChart.map((item) =>({
        amount: item.Amount,
        category: item.SelectedCategory,
        svg: { fill: randomColor() },
        key: item.ID,
        })
    )

    const handleSubtitle = () => {
        return data.map((item) =>{
            return(
                <View key={item.key} style={{flexDirection: "row", marginBottom: '1%', justifyContent: 'flex-start'}}>
                    <View style={[styles.subtitleItem, {backgroundColor: item.svg.fill}]}/>
                    <Text style={styles.textSubtitle}>{item.category}: R${item.amount.toFixed(2).replace('.',',')}</Text>
                </View>
            );
        })                   
    }
   
    return(
        <LinearGradient
        colors={['transparent','transparent', '#493687', '#3d2c73']} 
        style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.textHeader}>Relatório agrupado</Text>
                <Text style={styles.textHeader}>por categoria</Text>
            </View>
            <PieChart
            style={{ height: "35%",width: "100%" }}
            valueAccessor={({ item }) => item.amount}
            data={data}
            spacing={0}
            outerRadius={'95%'}
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

    );
}