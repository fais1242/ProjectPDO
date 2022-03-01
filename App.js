import React, {useEffect, useState} from 'react';
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
import axios from 'axios';

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
        // ,id: 'userName'
         ,token: 'userToken'});
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      // conFig: () => {
      //   setUserToken('fgkj');
      //   // setIsLoading(false);
      // },
    }),
    [],
  );

  // useEffect(() => {
  //   setTimeout(async () => {
  //     // setIsLoading(false);
  //     let userToken;
  //     userToken = null;
  //     try {
  //       userToken = await AsyncStorage.getItem('userToken');
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     console.log('user token: ',userToken);
  //     dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
  //   }, 1000);
  // }, []);

  const [Username, setusername] = useState('');
  const [Password, setpassword] = useState('');
  const [Url, seturl] = useState('');
  var Cxml2json = require('xml2js').parseString;
    var stripNS = require('xml2js').processors.stripPrefix;

    var base64 = require('base-64');
    var utf8 = require('utf8');


  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      let config;
      userToken = null;
      try {
        await  AsyncStorage.getItem('userToken').then(value => {
          if (value !== null) {
              console.log('getdata');
              userToken = JSON.parse(value);
              console.log(userToken);
          }
              console.log(userToken.id);
              console.log(userToken.ps);
      })
      } catch (e) {
        console.log(e);
      }
      console.log('user token: ',userToken);

      try{
        await  AsyncStorage.getItem('ConfigDb').then(value => {
              if (value !== null) {
                  console.log('getdata');
                   config = JSON.parse(value);
                  console.log(config);
                  setusername(config.Username);
                  setpassword(config.Password);
                  seturl(config.Url);
              }
                  console.log(Username);
                  console.log(Password);
                  console.log(Url);
          })
      }catch (e) {
          console.log(e);}
  
        var createuser = config.Username + ':' + config.Password;
            var bytes = utf8.encode(createuser);
            var encoded = base64.encode(bytes);
            var basicAuth = 'Basic ' + encoded;
            console.log(basicAuth);

      if (userToken == null) {
        dispatch({type: 'RETRIEVE_TOKEN', token: userToken});   
      } else {
      console.log(userToken.id);
      console.log(userToken.ps);
            let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global">
            <soapenv:Header/>
            <soapenv:Body>
               <glob:MobileUserLoginQueryByUserPasswordSimpleByRequest_sync>
                  <MobileUserLoginSimpleSelectionBy>
                     <SelectionByLogin_UserName>
                        <InclusionExclusionCode>I</InclusionExclusionCode>
                        <IntervalBoundaryTypeCode>1</IntervalBoundaryTypeCode>
                        <LowerBoundaryLogin_UserName>${userToken.id}</LowerBoundaryLogin_UserName>
                     </SelectionByLogin_UserName>
                     <SelectionByLogin_Password>
                        <InclusionExclusionCode>I</InclusionExclusionCode>
                        <IntervalBoundaryTypeCode>1</IntervalBoundaryTypeCode>
                        <LowerBoundaryLogin_Password>${userToken.ps}</LowerBoundaryLogin_Password>
                     </SelectionByLogin_Password>
         
                  </MobileUserLoginSimpleSelectionBy>
               </glob:MobileUserLoginQueryByUserPasswordSimpleByRequest_sync>
            </soapenv:Body>
         </soapenv:Envelope>`;
            await axios
              .post(
                `${config.Url}`,
                xmls,
                {
                  headers: {
                    'Content-Type': 'text/xml',
                    Authorization: basicAuth ,
                    // basicAuth
                  },
                },
              )
              
              .then (res => { 
                console.log(res.data); 
                  Cxml2json  (res.data, { tagNameProcessors: [stripNS] },
                  function (err, result) {
                  console.log(result.Envelope.Body[0].MobileUserLoginQueryByUserPasswordSimpleByConfirmation_sync[0].ProcessingConditions[0].ReturnedQueryHitsNumberValue[0]);
                    console.log(JSON.stringify(result));
                  if  (result.Envelope.Body[0].MobileUserLoginQueryByUserPasswordSimpleByConfirmation_sync[0].ProcessingConditions[0].ReturnedQueryHitsNumberValue[0] == 1) {
                    dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
                  }else{
                    authContext.signOut();
                  }
      
      
                });
             }
          )

      }
      // setIsLoading(false);
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
