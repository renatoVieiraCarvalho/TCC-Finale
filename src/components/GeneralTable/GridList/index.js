import React from 'react';

import styles from './styles';
import { View, FlatList, Text } from 'react-native';

import { ListItem } from '../ListItem';

export function GridList( { handleData, propUpdate } ){
          
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{width: '39%'}}>
                    <Text style={styles.headerText}>Descrição</Text>
                </View>
                <View style={{borderRightWidth: 1, height: '100%'}}/>
                <View style={{width: '21%'}}>
                    <Text style={styles.headerText}>Categoria</Text>
                </View>
                <View style={{borderRightWidth: 1, height: '100%'}}/>
                <View style={{width: '18%'}}>
                    <Text style={styles.headerText}>Status</Text>
                </View>
                <View style={{borderRightWidth: 1, height: '100%'}}/>
                <View style={{width: '22%'}}>
                    <Text style={styles.headerText}>Valor</Text>                        
                </View>
            </View>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={handleData}
            keyExtractor={ item => item.ID }
            renderItem={({ item }) => (
                <ListItem
                propUpdate={propUpdate} 
                {...item}
                />
            )}
            />           
        </View>
    );
}