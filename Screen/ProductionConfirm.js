import {View, Text, ScrollView, StyleSheet, Alert} from 'react-native';
import {Button, Image, Card, Divider, Icon, Input} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';

const ProductionConfirm = ({navigation}) => {
  const db = SQLite.openDatabase(
    {
      name: 'ainDB.db',
      location: 'default',
    },
    () => {},
    error => {
      console.log(error);
    },
  );

  useEffect(() => {
    createTable();
    getData();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE' +
          'Users ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER, Pat TEXT, Cat TEXT);',
      );
    });
  };

  const getData = () => {
    try {

      db.transaction(tx => {
        tx.executeSql('SELECT Name, Age, Pat, Cat FROM Users', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            navigation.navigate('Shoesql2');
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (name.length == 0 || age.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        await db.transaction(async tx => {
          await tx.executeSql('INSERT INTO Users (Name, Age, Pat, Cat) VALUES (?,?,?,?)', [
            name,
            age,
            pat,
            cat
          ]);
        });
        navigation.navigate('Shoesql2');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [selectedValue, setSelectedValue] = useState('Start');

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [pat, setPat] = useState('');
  const [cat, setCat] = useState('');

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
            onChangeText={value => setName(value)}
          />
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.stext}>Scrap Quantity</Text>

          <Input
            containerStyle={styles.textInput}
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={value => setAge(value)}
          />
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.stext}>Identified Stock ID</Text>

          <Input
            containerStyle={styles.textInput}
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={value => setPat(value)}

          />
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.stext}>Identified Stock Descrition</Text>

          <Input
            containerStyle={styles.textInput}
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={value => setCat(value)}

          />
        </View>

        <View style={{flex: 1, marginBottom: 10}}>
          <Text style={styles.stext}>Duration</Text>
          <View style={{flexDirection: 'row'}}>
            <Input
              containerStyle={{
                borderRadius: 5,
                backgroundColor: '#EEF1F3',
                flex: 1,
                height: 50,
              }}
              placeholder="Hour"
              inputContainerStyle={{borderBottomWidth: 0}}
              keyboardType="numeric"
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
                height: 50,
              }}
              placeholder="Minutes"
              inputContainerStyle={{borderBottomWidth: 0}}
              keyboardType="numeric"
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
