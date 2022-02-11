import {View, Text, ScrollView, StyleSheet, Alert} from 'react-native';
import {Button, Image, Card, Divider, Icon, Input} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductionConfirm = ({navigation}) => {

  // const db = SQLite.openDatabase(
  //   {
  //     name: 'CainDB.db',
  //     location: 'default',
  //   },
  //   () => {},
  //   error => {
  //     console.log(error);
  //   },
  // );

  // useEffect(() => {
  //   createTable();
  // }, []);

  // const createTable = () => {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       'CREATE TABLE IF NOT EXISTS' +
  //         'Users' +
  //         '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Order INTEGER, Scarp INTEGER, IdenID TEXT, IdenDes TEXT, DurationH INTEGER, DurationM INTEGER, Status TEXT, Processby TEXT);',
  //     );
  //   });
  // };

  // const setData = async () => {
    // if (output.length == 0 || scarp.length == 0) {
    //   Alert.alert('Warning!', 'Please write your data.');
    // } else {
    //   try {
  //       await db.transaction(async tx => {
  //         await tx.executeSql(
  //           'INSERT INTO Users (Output, Scarp, IdenID, IdenDes, DurationH, DurationM, Status, Processby) VALUES (?,?,?,?,?,?,?,?)',
  //           [
  //             output,
  //             scarp,
  //             idenID,
  //             idenD,
  //             durationH,
  //             durationM,
  //             selectedValue,
  //             Processby,
  //           ],
  //         );
  //       },console.log('insert success'));
  //       navigation.navigate('Showsql');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const setData = async () => {
    if (output.length == 0 ) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        console.log('start setdata');
          var Order = {
          OrderID : output,
        }
        console.log(output);
        console.log('setdata');
      await AsyncStorage.setItem('OrderData', JSON.stringify(Order));
      navigation.navigate('Showsql');
    } catch (e) {
        console.log(e);
    }
  }
}
  
  const [selectedValue, setSelectedValue] = useState('Start');
  const [output, setoutput] = useState('');
  const [scarp, setscarp] = useState('');
  const [idenID, setidenID] = useState('');
  const [idenD, setidenD] = useState('');
  const [durationH, setdurationH] = useState('');
  const [durationM, setdurationM] = useState('');
  const [Processby, setprocessby] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Divider color="white" width={1.5} style={{marginHorizontal: 20}} />
      <Card
        containerStyle={{
          borderRadius: 10,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
        }}>
        <View style={{flex: 1}}>
          <Text style={styles.stext}>Output Production Quantity</Text>

          <Input
            containerStyle={styles.textInput}
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={value => setoutput(value)}
          />
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.stext}>Scrap Quantity</Text>

          <Input
            containerStyle={styles.textInput}
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={value => setscarp(value)}
          />
        </View>

        {/* <View style={{flex: 1}}>
          <Text style={styles.stext}>Identified Stock ID</Text>

          <Input
            containerStyle={styles.textInput}
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={value => setidenID(value)}
          />
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.stext}>Identified Stock Descrition</Text>

          <Input
            containerStyle={styles.textInput}
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={value => setidenD(value)}
          />
        </View> */}

        <View style={{flex: 1}}>
          <Text style={styles.stext}>Duration</Text>
          <View style={{flexDirection: 'row',alignItems:'center'}}>
            <Input
              containerStyle={{
                borderRadius: 5,
                backgroundColor: '#EEF1F3',
                flex: 1,
                height: hp('6.5%'),
              }}
              placeholder="Hour"
              inputContainerStyle={{borderBottomWidth: 0}}
              onChangeText={value => setdurationH(value)}
            />
            {/* <Text style={{fontSize:20,}}>
             H
           </Text> */}

            <Text style={{fontSize: 40, paddingHorizontal: 5, color: 'black'}}>
              :
            </Text>
            <Input
              containerStyle={{
                borderRadius: 5,
                backgroundColor: '#EEF1F3',
                flex: 1,
                height:hp('6.5%'),
              }}
              placeholder="Minutes"
              inputContainerStyle={{borderBottomWidth: 0}}
              onChangeText={value => setdurationM(value)}
            />
            {/* <Text style={{fontSize:20}} >
           Min
           </Text> */}
          </View>
        </View>

        <View style={{flex: 1, marginBottom: 10}}>
          <Text style={styles.stext}>Status</Text>
          <View style={styles.textInput}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={itemValue => setSelectedValue(itemValue)}>
              <Picker.Item label="Start" value="Start" />
              <Picker.Item label="Finish" value="Finish" />
              <Picker.Item label="Interrupt" value="Interrupt" />
              <Picker.Item label="Restart" value="Restart" />
            </Picker>
          </View>

          <Text style={styles.stext}>Process By</Text>

          <Input
            containerStyle={styles.textInput}
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={value => setprocessby(value)}
          />
        </View>

        <Button
          raised
          title="Submit"
          onPress={setData}
          containerStyle={{marginVertical: 10, marginHorizontal: 10}}
          buttonStyle={{backgroundColor: 'green', borderRadius: 7}}
          titleStyle={{fontSize: 20}}
        />
      </Card>
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
    fontSize: 20,
    marginLeft: 15,
  },
  textshow: {
    fontSize: 20,
    color: 'black',
  },
  cardstyle: {
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#EEF1F3',
    flex: 1,
  },
  textInput: {
    borderRadius: 5,
    backgroundColor: '#EEF1F3',
    height: 50,
    marginBottom: 15,
  },
});

export default ProductionConfirm;
