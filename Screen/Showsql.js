import React, {useState, useEffect} from 'react';
import {Button, Image, Card, Divider, Icon, Input} from 'react-native-elements';
import {StyleSheet, View, Text, Alert} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

export default function Showsql({navigation, route}) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const db = SQLite.openDatabase(
    {
      name: 'MainDB.db',
      location: 'default',
      createFromLocation: '~MainDB.db',
    },
    () => {},
    error => {
      console.log(error);
    },
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      // AsyncStorage.getItem('UserData')
      //     .then(value => {
      //         if (value != null) {
      //             let user = JSON.parse(value);
      //             setName(user.Name);
      //             setAge(user.Age);
      //         }
      //     })
      db.transaction(tx => {
        tx.executeSql('SELECT Name, Age FROM Users', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var userName = results.rows.item(0).Name;
            var userAge = results.rows.item(0).Age;
            setName(userName);
            setAge(userAge);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    if (name.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        // var user = {
        //     Name: name
        // }
        // await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
        db.transaction(tx => {
          tx.executeSql(
            'UPDATE Users SET Name=?',
            [name],
            () => {
              Alert.alert('Success!', 'Your data has been updated.');
            },
            error => {
              console.log(error);
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeData = async () => {
    try {
      // await AsyncStorage.clear();
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
    <View style={styles.body}>
      <Text style={[styles.text]}>Welcome {name} !</Text>
      <Text style={[styles.text]}>Your age is {age}</Text>
      <Input
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={value => setName(value)}
      />
      <Button title="Update" color="#ff7f00" onPress={updateData} />
      <Button title="Remove" color="#f40100" onPress={removeData} />
    </View>
  );
}

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
