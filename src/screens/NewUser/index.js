import React, { useState } from 'react';

import styles from './styles';
import { View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";

export function NewUser(){
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigation = useNavigation();

    return(
        <LinearGradient
        colors={['transparent', 'transparent', 'transparent', '#8A7455']}
        style={styles.container}
        >   
            <View style={styles.header}>
                <Text style={styles.textHeader}>Novo Usuário</Text>
            </View>
            <View style={styles.form}>
                <TextInput style={styles.inputText} placeholder='Email' onChangeText={setEmail}/>
                <TextInput style={styles.inputText} placeholder='Senha' onChangeText={setPassword}/>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button}
                onPress={() => navigation.goBack()}
                >
                    <Feather name='x' size={RFPercentage(4.1)} color='#FFFAFA'/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                >
                    <Feather name='check' size={RFPercentage(4.1)} color='#FFFAFA'/>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}