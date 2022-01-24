import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scanner from './Screen/Scanner';
import ProductionOrder from './Screen/ProductionOrder';
import ProductionConfirm from './Screen/ProductionConfirm';
import History from './Screen/History';
import Login from './Screen/Login';
import Home from './Screen/Home';
import { Divider } from 'react-native-elements/dist/divider/Divider';

const Stack = createNativeStackNavigator();

const App = () =>{
  return(
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ 
          headerStyle: { backgroundColor: '#FFB23E'},
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold',},
          headerShadowVisible: false,
          headerTitleAlign:'center'
           }}>

          <Stack.Screen name="ProductionConfirm" component={ProductionConfirm}
           options={{title:'PRODUCTION CONFIRM' }}
          />
          <Stack.Screen name="Home" component={Home} 
          options={{title:'HOME'}}
          />
          <Stack.Screen name="Scanner" component={Scanner} 
           options={{title:'SCAN QRCODE' }}
          />
          <Stack.Screen name="Production" component={ProductionOrder}
          options={{title:'PRODUCTION ORDER'}}
           />
       
         
          <Stack.Screen name="History" component={History}
           options={{title:'HISTOY' }}
          />
        </Stack.Navigator>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create ({
  container:{
    flex: 1,  
    padding:35,
    backgroundColor: 'lightblue'
  },
  stext:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom:20,
    marginLeft:'auto', marginRight:'auto'
  },
  button:{
  }
});


export default App;
