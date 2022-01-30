import * as React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Scanner from './Screen/Scanner';
import ProductionOrder from './Screen/ProductionOrder';
import ProductionConfirm from './Screen/ProductionConfirm';
import History from './Screen/History';
import Login from './Screen/Login';
import Home from './Screen/Home';
import Showsql from './Screen/Showsql';
import Shoesql2 from './Screen/Shoesql2';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#FFB23E'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="Home" component={Home} options={{title: 'HOME'}} />

        <Stack.Screen
          name="Production"
          component={ProductionOrder}
          options={{title: 'PRODUCTION ORDER'}}
        />

        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{title: 'SCAN QRCODE'}}
        />

        <Stack.Screen
          name="History"
          component={History}
          options={{title: 'HISTOY'}}
        />

        <Stack.Screen
          name="ProductionConfirm"
          component={ProductionConfirm}
          options={{title: 'PRODUCTION CONFIRM'}}
        />
        <Stack.Screen
          name="Showsql"
          component={Showsql}
          options={{title: 'Showsql'}}
        />
        <Stack.Screen
          name="Shoesql2"
          component={Shoesql2}
          options={{title: 'Shoesql2'}}
        />
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

export default App;
