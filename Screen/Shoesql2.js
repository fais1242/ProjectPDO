import React, {useState, useEffect} from 'react';
import {Button, Image, Card, Divider, Icon, Input} from 'react-native-elements';
import {StyleSheet, View, Text, Alert, ScrollView} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const Shoesql2 = ({navigation}) => {
  const db = SQLite.openDatabase(
    {
      name: 'MainDB.db',
      location: 'default',
    },
    () => {},
    error => {
      console.log(error);
    },
  );

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [pat, setPat] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT Name, Age, Pat FROM Users', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var userName = results.rows.item(0).Name;
            var userAge = results.rows.item(0).Age;
            var userPat = results.rows.item(0).Pat;
            setName(userName);
            setAge(userAge);
            setPat(userPat);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeData = async () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Users',
          [],
          () => {
            navigation.navigate('ProductionConfirm');
          },
          error => {
            console.log(error);
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.body}>
        <Text style={[styles.text]}>Welcome {name} !</Text>
        <Text style={[styles.text]}>Your age is {age}</Text>
        <Text style={[styles.text]}>{pat}</Text>
        <Input
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={value => setName(value)}
        />
        <Button title="Remove" color="#f40100" onPress={removeData} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 130,
    marginBottom: 10,
  },
});

export default Shoesql2;
