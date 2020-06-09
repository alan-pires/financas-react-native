import React from 'react';
import { StatusBar } from 'react-native';
//import firebase from './src/services/firebaseConnection'
import 'react-native-gesture-handler'
import Routes from './src/routes/index'
import {NavigationContainer} from '@react-navigation/native'
import AuthProvider from './src/Contexts/auth'

export default function App() {
console.disableYellowBox= true
  return (
    <NavigationContainer>
      <AuthProvider>
      <StatusBar backgroundColor="#131313" barStyle="light-content" />
      <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
