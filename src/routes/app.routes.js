import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../screens/Login';
import { NewUser } from '../screens/NewUser';
import { BottomTabsMenu } from './bottomTabsMenu';
import { NewBarCode } from '../screens/NewBarCode';

const Stack = createStackNavigator();

export function AppRoutes() {
  return (
    <Stack.Navigator 
    screenOptions={{ headerShown: false }}
    initialRouteName='Login'
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="NewUser" component={NewUser} />
      <Stack.Screen name="Dashboard" component={BottomTabsMenu} />
      <Stack.Screen name="NewBarCode" component={NewBarCode} />
    </Stack.Navigator>
  );
}