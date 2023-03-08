import 'expo-asset';
import React from 'react';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './src/routes/app.routes';


export default function App() {
  return (
    <NavigationContainer>
      <AppRoutes />
      <Toast />
    </NavigationContainer>
  );
}
