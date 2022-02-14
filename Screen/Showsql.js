import React, {useState, useEffect} from 'react';
import {Button, Image, Card, Divider, Icon, Input} from 'react-native-elements';
import {StyleSheet, View, Text, Alert, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Showsql = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [output, setoutput] = useState('');
  const [scarp, setscarp] = useState('');
  const [idenID, setidenID] = useState('');
  const [idenD, setidenD] = useState('');
  const [durationH, setdurationH] = useState('');
  const [durationM, setdurationM] = useState('');
  const [Processby, setprocessby] = useState('');

  const getData = () => {
    try {
      console.log('start getdata');
      AsyncStorage.getItem('TestData')
      .then(value=>{
        if (value !== null) {
          console.log('getdata');
          console.log(value);
          let Order = JSON.parse(value);
          setoutput(Order.OrderID)
          console.log(Order);
        }
      })
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);


 const removeData = async ()=>{
   try{
     await AsyncStorage.removeItem('TestData');
   }catch(e){
    console.log(e);
   }
 }
  return (
    <ScrollView>
      <View style={styles.body}>
        <Text style={[styles.text]}> {output}</Text>
        <Text style={[styles.text]}> {scarp}</Text>
        <Text style={[styles.text]}> {idenID}</Text>
        <Text style={[styles.text]}> {idenD}</Text>
        <Text style={[styles.text]}> {durationH}</Text>
        <Text style={[styles.text]}> {durationM}</Text>
        <Text style={[styles.text]}> {selectedValue}</Text>
        <Text style={[styles.text]}> {Processby}</Text>

        <Input
          style={styles.input}
          placeholder="Enter your name"
          value={Processby}
          onChangeText={value => setoutput(value)}
        />
        <Button title="Remove" color="#f40100" onPress={removeData} />
        <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
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
    color: 'black',
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

export default Showsql;
