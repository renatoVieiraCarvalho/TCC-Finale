import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";

import { Dashboard } from '../screens/Dashboard';
import { Payable } from '../screens/Payable';
import { Receivable } from '../screens/Receivable';
import { Movement } from '../screens/Movement';
import { Charts } from '../screens/Charts';

const Tab = createBottomTabNavigator();

export function BottomTabsMenu() {
  return (
    <Tab.Navigator 
    screenOptions={{ 
      headerShown: false, 
      tabBarActiveBackgroundColor: "#FFFAFA", 
      tabBarInactiveBackgroundColor: "#3d2c73", 
      tabBarActiveTintColor: "#3d2c73", 
      tabBarInactiveTintColor: "#FFFAFA" 
    }}>
      <Tab.Screen name="Início" component={Dashboard} options={{ 
        tabBarIcon: () => { return <Feather name="home" size={RFPercentage(4.1)} color="#D68517"/>}}} />
      <Tab.Screen name="A Pagar" component={Payable} options={{ 
        tabBarIcon: () => { return <Feather name="trending-down" size={RFPercentage(4.1)} color="#8A7455"/>}}} />
      <Tab.Screen name="A Receber" component={Receivable} options={{ 
        tabBarIcon: () => { return <Feather name="trending-up" size={RFPercentage(4.1)} color="#578A49"/>}}} />
      <Tab.Screen name="Movimentação" component={Movement} options={{ 
        tabBarIcon: () => { return <Feather name="dollar-sign" size={RFPercentage(4.1)} color="#D68517"/>}}} />
      <Tab.Screen name="Gráficos" component={Charts} options={{ 
        tabBarIcon: () => { return <Feather name="bar-chart" size={RFPercentage(4.1)} color="#D68517"/>}}} />
    </Tab.Navigator>
  );
}