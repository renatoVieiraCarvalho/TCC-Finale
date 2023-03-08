import React, { useState, useEffect } from 'react';

import styles from './styles';
import { View, Text, TouchableOpacity, Image, TextInput, Alert} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
    name: 'mainDB.db',
    location: 'default'
},
() =>{ },
error =>{console.log(error)}
);

const createTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "Bills "
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Description TEXT, Amount REAL, HandleDate TEXT, HandleDatePay TEXT, HandleType TEXT, SelectedCategory TEXT, SelectedPayment TEXT, SelectedStatus TEXT);"
        )
    })
}

export function Login(){
    const navigation = useNavigation();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    useEffect(() => {
        createTable();    
    },[]);

    const handleLogin = () => {
        Alert.alert("CMD", "Ferramenta indisponível no momento")
    }

    return(
        <LinearGradient
        colors={['transparent', 'transparent', 'transparent', '#8A7455']}
        style={styles.container}
        >   
            <View style={styles.header}>
                <Image
                source={require('../../assets/logo.png')}
                />
            </View>
            <View style={styles.form}>
                <TextInput style={styles.inputText} placeholder='Email' keyboardType='email-address' onChangeText={setEmail}/>
                <TextInput style={styles.inputText} placeholder='Senha' secureTextEntry={true} onChangeText={setPassword}/>
                <View style={styles.centerRow}>
                    <TouchableOpacity
                    onPress={() => handleLogin()}
                    >
                        <Text style={styles.textCenter}>Cadastrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => handleLogin()}
                    >
                        <Text style={styles.textCenter}>Redefinir senha</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate('Dashboard')}
                >
                    <Feather name='log-in' size={RFPercentage(4.1)} color='#FFFAFA'/>
                </TouchableOpacity>
            </View>

        </LinearGradient>

    );
}