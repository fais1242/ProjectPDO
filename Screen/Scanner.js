import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator
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
import firestore from '@react-native-firebase/firestore';



const Scanner = ({navigation}) => {

  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (loading) {
  //     onSuccess();
  //     return <ActivityIndicator />;
  //     setLoading(false);
  //   }
  // }, []);

 var check = false;
  const onSuccess = async e => {
  Alert.alert('Scan Success')
  console.log('1 '+e.data);
  await firestore()
  .collection('Users')
  .where('OrderID', '==', e.data)
  .get()
  .then(
    querySnapshot => {
      console.log('Total users: ', querySnapshot.size);
    if (querySnapshot.size > 0) {
      console.log('record fail');
      check = true
      Alert.alert('Order fail');
      navigation.navigate('Home');
    }
    }
  );
    if (check == false) {

      console.log('2 '+check);

      console.log(e.data);
    try {
      console.log('start setdata');
        var Order = {
        OrderID : e.data,
      }
      console.log(Order.OrderID);
      console.log('setdata');
    AsyncStorage.setItem('OrderData', JSON.stringify(Order));
    navigation.navigate('Production');
  } catch (e) {
      console.log(e);
  } 
  }
  }


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
    backgroundColor: '#FFB970',
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
