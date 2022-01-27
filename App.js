import * as React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Image} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Scanner from './Screen/Scanner';
import ProductionOrder from './Screen/ProductionOrder';
import History from './Screen/History';
import Login from './Screen/Login';
import Home from './Screen/Home';
import config from './Screen/config';

import { openDatabase } from 'react-native-sqlite-storage';


const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign:'center',
          headerStyle: {backgroundColor: '#FFB23E'},
          headerTintColor: '#fff',
          headerShadowVisible: false,
          headerTitleStyle: {
          fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="config" component={config} options={{title:'CONFIGURATION'}}  />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="Production" component={ProductionOrder} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: 'lightblue',
  },
  stext: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {},
});


