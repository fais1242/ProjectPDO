import React, {useState, useEffect} from 'react';
import {Button, Image, Card, Divider, Icon, Input} from 'react-native-elements';
import {StyleSheet, View, Text, Alert, ScrollView} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

export default function Showsql({navigation, route}) {

  const [selectedValue, setSelectedValue] = useState('');
  const [output, setoutput] = useState('');
  const [scarp, setscarp] = useState('');
  const [idenID, setidenID] = useState('');
  const [idenD, setidenD] = useState('');
  const [durationH, setdurationH] = useState('');
  const [durationM, setdurationM] = useState('');
  const [Processby, setprocessby] = useState('');

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

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {

      db.transaction((tx) => {
        tx.executeSql("SELECT Output, Scarp, IdenID, IdenDes, DuartionH, DurationM, Status, Processby FROM Users", [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var useroutput = results.rows.item(0).Output;
            var userscarp = results.rows.item(0).Scarp;
            var useridenID = results.rows.item(0).IdenID;
            var useridenD = results.rows.item(0).IdenDes;
            var userdurationH = results.rows.item(0).DuartionH;
            var userdurationM = results.rows.item(0).DurationM;
            var userstatus = results.rows.item(0).Status;
            var userprocess = results.rows.item(0).Processby;
            setoutput(useroutput);
            setscarp(userscarp);
            setidenID(useridenID);
            setidenD(useridenD);
            setdurationH(userdurationH);
            setdurationM(userdurationM);
            setSelectedValue(userstatus);
            setprocessby(userprocess);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    if (output.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        db.transaction((tx) => {
          tx.executeSql(
            'UPDATE Users SET Name=?',
            [output],
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
      db.transaction((tx) => {
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
    <ScrollView style={styles.body}>
      <Text style={[styles.text]}> {output} !</Text>
      <Text style={[styles.text]}> {scarp}</Text>
      <Text style={[styles.text]}> {idenID} !</Text>
      <Text style={[styles.text]}> {idenD}</Text>
      <Text style={[styles.text]}> {durationH} !</Text>
      <Text style={[styles.text]}> {durationM}</Text>
      <Text style={[styles.text]}> {selectedValue} !</Text>
      <Text style={[styles.text]}> {Processby}</Text>
      <Input
        style={styles.input}
        placeholder="Enter your name"
        value={output}
        onChangeText={value => setoutput(value)}
      />
      <Button title="Update" color="#ff7f00" onPress={updateData} />
      <Button title="Remove" color="#f40100" onPress={removeData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
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
