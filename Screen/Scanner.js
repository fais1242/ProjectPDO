import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Button, Image, Card, Divider, Icon} from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const Scanner = ({navigation}) => {
  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };
  return (
    <View style={styles.container}>
      <Divider color="white" width={1.5} style={{marginHorizontal: 20}} />
        <QRCodeScanner
          onRead={this.onSuccess}
          cameraStyle={{width: 300, height: 200}}
          containerStyle={{backgroundColor:'#ffff',alignItems: 'center', justifyContent: 'center',marginVertical:"30%",marginHorizontal:"5%", borderRadius:10}}
          flashMode={RNCamera.Constants.FlashMode.torch}
          showMarker={true}
        />

    </View>
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
