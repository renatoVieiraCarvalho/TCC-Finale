import React from 'react';

import styles from './styles';
import { View, Text, TouchableOpacity} from 'react-native';

import Toast from 'react-native-toast-message';

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
    name: 'mainDB.db',
    location: 'default'
},
() =>{ },
error =>{console.log(error)}
);

export function ModalDeleter({closeModal, PropDescription, PropID, propUpdate}){

    const handleDelete = () => {       
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM Bills WHERE ID=?",
                [PropID],
                () => {
                    closeModal();
                    Toast.show({
                        type: 'success',
                        text1: 'Deletado com sucesso!',
                    });
                    propUpdate()
                }
            )
        })
    }
    return(
        <>
            <View style={styles.centralizer}/>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.text}>Deseja deletar o cadastro de:</Text>
                        <Text style={styles.textObj}>{PropDescription}?</Text>
                    </View>
                    <View style={styles.buttonField}>
                        <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleDelete()}
                        >
                            <Text style={styles.textButton}>Sim</Text>
                        </TouchableOpacity>
                        <View style={styles.separator} />
                        <TouchableOpacity 
                        style={styles.button}
                        onPress={closeModal}
                        >
                            <Text style={styles.textButton}>Não</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            <View style={styles.centralizer}/>
        </>
    );
}