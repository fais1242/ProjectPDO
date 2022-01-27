import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
import React from 'react';
import {Button,Card} from 'react-native-elements';
import * as Animation from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from 'react-native-paper';
import {AuthContext} from '../components/context';
import Users from '../model/users';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Login = () => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <Divider style={{marginHorizontal: 40}} color='white' width={1.5}/>
      <View style={styles.header}>
        <Card containerStyle={{
          borderRadius: 10, marginbutton: 10
        }}>
          <Text style={styles.text_footer}>Customer Tenant</Text>
          <View style={styles.action}>
            <FontAwesome
                name="user-o" 
                color="#05375a" 
                size={20} 
            />
          <TextInput
            placeholder="Your Customer Tenant"
            style={styles.TextInput}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Feather 
            name="check-circle" 
            color="#05375a" 
            size={20} 
            />
          ) : null}
        </View> 
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 15,
            },
          ]}>
        </Text>
    
        <Text style={styles.text_footer}>Username</Text>
        <View style={styles.action}>
          <FontAwesome
          name="user-o" 
          color="#05375a" 
          size={20} 
            />
          <TextInput
            placeholder="Your Username"
            style={styles.TextInput}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Feather 
            name="check-circle" 
            color="#05375a" 
            size={20} 
              />
          ) : null}
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <FontAwesome 
          name="lock" 
          color="#05375a" 
          size={20} 
          />
          <TextInput
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.TextInput}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather 
              name="eye-off" 
              color="grey" 
              size={20} 
                />
            ) : (
              <Feather 
              name="eye" 
              color="grey" 
              size={20} 
                />
            )}
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 15,
            },
          ]}>
        </Text>
        
        <View style={styles.button}>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#fff',
                },
              ]}>
              Login
            </Text>
          </LinearGradient>
        </View>

          
        </Card>
      </View>
      </View>
  );
};
export default Login;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB23E',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
 
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
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
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
