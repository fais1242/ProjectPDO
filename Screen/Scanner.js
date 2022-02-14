import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {Button, Image, Card, Divider, Icon} from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Scanner = ({navigation}) => {


  const [order, setorder] = useState('');

  const onSuccess = async e => {
    setorder(e.data);
    console.log(e.data);
    try {
      console.log('start setdata');
        var Order = {
        OrderID : e.data,
      }
      console.log(Order.OrderID);
      console.log('setdata');
    await AsyncStorage.setItem('OrderData', JSON.stringify(Order));
    Alert.alert('Scan Success');
    navigation.navigate('Home');
  } catch (e) {
      console.log(e);
  }
  };

  return (
    <ScrollView style={styles.container}>
      <Divider color="white" width={1.5} style={{marginHorizontal: 20}} />
      <QRCodeScanner
        cameraStyle={{
          width: wp('80%'),
          height: hp('40%'),
          marginTop: '5%',
          marginBottom: '5%',
        }}
        containerStyle={{
          backgroundColor: '#ffff',
          marginTop: '10%',
          marginHorizontal: '5%',
          borderRadius: 10,
          paddingHorizontal: '5%',
          width: wp('90%'),
          height: hp('70%'),
        }}
        showMarker={true}
        onRead={onSuccess}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#FFB23E',
  },
  stext: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textshow: {
    fontSize: 18,
    color: 'black',
  },
});

export default Scanner;
