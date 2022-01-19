import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from './Srceen/login'
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigation
    screenOption={{
      headerStyle:{
        backgroundColor : '#0085E6'
      },
      headerTintColor :'#fff',
      headerTintStyle : {
        fontWeight : 'bold'
      }
    }}
    >
      <Stack.Screen
      name = "Login"
      component={login}
      options={{title:'Login'}}
      />
      
    </Stack.Navigation>
  )
  
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gold'
  },
  text:{
    color: 'blue',
    fontSize: 30
  }
})
export default function App(){
  return(
    <NavigationContainer></NavigationContainer>
  );
}
