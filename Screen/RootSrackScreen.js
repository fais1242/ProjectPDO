import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from './StartScreen';
import Login from './Login';
import Config from './Config';
import Home from './Home';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator screenOptions={{
        headerStyle: {backgroundColor: '#FFB23E'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
        headerShadowVisible: false,
        headerTitleAlign: 'center', }} >
        <RootStack.Screen name="StartScreen" component={StartScreen} options={{title: ''}} />
        <RootStack.Screen name="Login" component={Login} options={{title: 'LOGIN'}} />
        <RootStack.Screen name="Home" component={Home} options={{title: 'Home'}} />
        <RootStack.Screen name="Config" component={Config} options={{title: 'CONFIGURATION'}} />
    </RootStack.Navigator>
);

export default RootStackScreen;