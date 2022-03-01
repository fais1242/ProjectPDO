import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Scanner from './Screen/Scanner';
import ProductionOrder from './Screen/ProductionOrder';
import ProductionShow from './Screen/ProductionShow';
import ProductionConfirm from './Screen/ProductionConfirm';
import History from './Screen/History';
import Login from './Screen/Login';
import Home from './Screen/Home';
import Showsql from './Screen/Showsql';
import TestFirebase from './Screen/TestFirebase';
import RootStackScreen from './Screen/RootSrackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './components/context';
import Search from './Screen/Search';

const Stack = createNativeStackNavigator();

const App = () => {
  const initiaLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'CONFIG':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initiaLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        // const userToken = String(foundUser[0].userToken);
        // const userName = foundUser[0].username;

        // try {
        //   await AsyncStorage.setItem('userToken', userToken);
        // } catch (e) {
        //   console.log(e);
        // }
        // console.log('user token: ', userToken);
        dispatch({type: 'LOGIN'
        ,id: 'userName'
         ,token: 'userToken'});
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        // try {
        //   await AsyncStorage.removeItem('userToken');
        // } catch (e) {
        //   console.log(e);
        // }
        dispatch({type: 'LOGOUT'});
      },
      conFig: () => {
        setUserToken('fgkj');
        // setIsLoading(false);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ',userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {backgroundColor: '#FFB970'},
              headerTintColor: '#fff',
              headerTitleStyle: {fontWeight: 'bold'},
              headerShadowVisible: false,
              headerTitleAlign: 'center',
            }}>
            {/* <Stack.Screen
          name="TestFirebase"
          component={TestFirebase}
          options={{title: 'SCAN QRCODE'}}
        /> */}

            <Stack.Screen
              name="Home"
              component={Home}
              options={{title: 'HOME', headerShown: false}}
            />
            <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen
              name="History"
              component={History}
              options={{title: 'LIST PRODUCTION'}}
            />
            </Stack.Group>

            <Stack.Screen
                name="Scanner"
                component={Scanner}
                options={{title: 'SCAN QRCODE'}}
              />

            <Stack.Screen
              name="Production"
              component={ProductionOrder}
              options={{title: 'PRODUCTION PREVIEW'}}
            />

            <Stack.Screen
              name="ProductionShow"
              component={ProductionShow}
              options={{title: 'PRODUCTION SHOW'}}
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
              name="Search"
              component={Search}
              options={{title: 'Search'}}
            />
            <Stack.Group></Stack.Group>
          </Stack.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
