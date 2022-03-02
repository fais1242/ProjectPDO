import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import StartScreen from './StartScreen';
import Login from './Login';
import Config from './Config';
import Home from './Home';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#FFB970'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold'},
      headerShadowVisible: false,
      headerTitleAlign: 'center',
    }}>
    <RootStack.Screen
      name="StartScreen"
      component={StartScreen}
      options={{title: ''}}
    />
    <RootStack.Screen
      name="Login"
      component={Login}
      options={{
        title: 'LOGIN',headerShown: false
        // headerRight: ({navigation}) => (
        //   <TouchableOpacity onPress={() => navigation.navigate('Config')}>
        //     <Feather name="settings" color="white" size={30} />
        //   </TouchableOpacity>
        // ),
      }}
    />
    {/* <RootStack.Screen name="Home" component={Home} options={{title: 'Home',headerShown:false}} /> */}
    <RootStack.Screen
      name="Config"
      component={Config}
      options={{title: 'CONFIGURATION'}}
    />
  </RootStack.Navigator>
);

export default RootStackScreen;
