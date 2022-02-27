import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    AppRegistry,
    Linking,
    TextInput,
    Button,
    Alert,
    StatusBar,
    ScrollView,
  } from 'react-native';
  import React, {useEffect, useState, Component} from 'react';
//   import QRCodeScanner from 'react-native-qrcode-scanner';
//   import {RNCamera} from 'react-native-camera';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import SQlite from 'react-native-sqlite-storage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { white } from 'react-native-paper/lib/typescript/styles/colors';

  
  const Config = ({navigation}) => {

    const [suser,setsuser]= useState('');
    const [spass,setspass]= useState('');


    useEffect(() => {
        getData();
      }, []);
    
      const getData = () => {
        try {
          console.log('start getdata');
          AsyncStorage.getItem('ConfigDb').then(value => {
            if (value !== null) {
              console.log('getdata');
              console.log(value);
              let Config = JSON.parse(value);
              console.log(Config);
              setsuser(Config.Username);
              setspass(Config.Password)
            }
          });
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      }

    const { colors } = useTheme();
    const [data, setData] = React.useState({
      secureTextEntry: true,
     
  });
  const updateSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
}
  
    // const convert = require('xml-js');
    var Cxml2json = require('xml2js').parseString;
    var stripNS = require('xml2js').processors.stripPrefix;

    var base64 = require('base-64');
    var utf8 = require('utf8');
    // var user = '_NTZ_KAN';
    // var pass = 'Welcome2021';
  
    
    const setConfig = async () => {  
      if (Url.length == 0 || Username.length == 0 || Password.length == 0) {
        Alert.alert('Warning!','กรุณากรอกข้อมูล');
      } else {
        var createuser = Username + ':' + Password;
        var bytes = utf8.encode(createuser);
        var encoded = base64.encode(bytes);
        var basicAuth = 'Basic ' + encoded;
        console.log(basicAuth);

        let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global">
        <soapenv:Header/>
        <soapenv:Body>
           <glob:MobileUserLoginQueryByUserPasswordSimpleByRequest_sync>
              <MobileUserLoginSimpleSelectionBy>
                 <SelectionByLogin_UserName>
                    <InclusionExclusionCode>I</InclusionExclusionCode>
                    <IntervalBoundaryTypeCode>1</IntervalBoundaryTypeCode>
                    <LowerBoundaryLogin_UserName>TEST01</LowerBoundaryLogin_UserName>
                 </SelectionByLogin_UserName>
                 <SelectionByLogin_Password>
                    <InclusionExclusionCode>I</InclusionExclusionCode>
                    <IntervalBoundaryTypeCode>1</IntervalBoundaryTypeCode>
                    <LowerBoundaryLogin_Password>PW1234</LowerBoundaryLogin_Password>
                 </SelectionByLogin_Password>
     
              </MobileUserLoginSimpleSelectionBy>
           </glob:MobileUserLoginQueryByUserPasswordSimpleByRequest_sync>
        </soapenv:Body>
     </soapenv:Envelope>`;
        await axios
          .post(
            `${Url}/sap/bc/srt/scs/sap/yyd61neday_mobileprdcfauth?sap-vhost=my334089.sapbydesign.com`,
            xmls,
            {
              headers: {
                'Content-Type': 'text/xml',
                Authorization: basicAuth,
              },
            },
          )
          .then (res => { 
            console.log(res.data); 
           // const data = 
            // convert.xml2json(res.data, { compact: true, spaces: 1 })
             //console.log(data);
              Cxml2json  (res.data, { tagNameProcessors: [stripNS] },
              function (err, result) {
              console.log(result.Envelope.Body[0].MobileUserLoginQueryByUserPasswordSimpleByConfirmation_sync[0].ProcessingConditions[0].ReturnedQueryHitsNumberValue[0]);
                console.log(JSON.stringify(result));
              if  (result.Envelope.Body[0].MobileUserLoginQueryByUserPasswordSimpleByConfirmation_sync[0].ProcessingConditions[0].ReturnedQueryHitsNumberValue[0] == 1) {
                Alert.alert('Successfully', 'ยินต้อนรับเข้าสู่ระบบ By Design'), navigation.navigate('Login')
              }else{
                Alert.alert('Warning!', 'Username หรือ password ไม่ถูกต้อง')
              }
              try {
                console.log('start setdata');
                  var configID = {
                  Username : Username,
                  Password : Password,
                  Url : Url
                }
                console.log(configID);
                console.log('setdata');
               AsyncStorage.setItem('ConfigDb', JSON.stringify(configID));
              Alert.alert('Connect Success');
              navigation.navigate('Login');
              } catch (e) {
                console.log(e);
            }
  
  
            });
         }
      )};
    };

    // const removeData = async ()=>{
    //     try{
    //       await AsyncStorage.removeItem('ConfigDb');
    //     }catch(e){
    //      console.log(e);
    //     }
    //   }

        
  
    const [Url, seturl] = useState('https://my334089.sapbydesign.com');
    const [Username, setusername] = useState('');
    const [Password, setpassword] = useState('');
    
    return (
      <ScrollView style={styles.container}>
          {/* <StatusBar backgroundColor='#FFB23E' barStyle="light-content"/> */}
          {/* <View style={ styles.title_header}>
                <TouchableOpacity onPress={removeData}>
                <Icon name="delete" type="antdesign" size={30} color='white' />
                </TouchableOpacity>
            </View> */}
        <View style={styles.header}>
            <Animatable.Image 
              animation="bounceIn"
              duraton="1500"
              source={require('../assets/cloud.png')}
              style={styles.logo}
              resizeMode="stretch"
            />
            
        </View>
        <View style={styles.text_header}>
            <Text style={styles.text_header}>Connect to By Design!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 10
            }]}>Customer Tenant URL</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="database"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="URL"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    value={Url}
                    onChangeText={(value) => seturl(value)}
                />
            </View>

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 5
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    // value={suser}
                    autoCapitalize="none"
                    onChangeText={(value) => setusername(value)}
                />
            </View>
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 5
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    // value={spass}
                    autoCapitalize="none"
                    onChangeText={(value) => setpassword(value)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={setConfig}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>CONFIRM</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#FFB970'
    },
    header: {
        height: hp('15%'),
        width: wp('100%'),
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    footer: {
        // height: hp('50%'),
        // width: wp('100%'),
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 5,
        flex:1,
        marginTop:'20%',
        paddingBottom:'20%'
    },
    logo: {
      marginLeft: 60,
      height: hp('12%'),
      width: wp('50%'),
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        marginVertical: 20 ,
        marginLeft: 10

    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        height: hp('7%'),
        width: wp('90%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        // fontWeight: 'bold'
    },
    title_header: {
        marginLeft: 'auto',
        marginRight: '3%',
        // marginBottom:'2%'
    }
  });

  export default Config;