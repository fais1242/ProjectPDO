import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Button, Image, Card, Divider, Icon} from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';

const ProductionOrder = ({navigation}) => {
  const db = SQLite.openDatabase(
    {
      name: 'CainDB.db',
      location: 'default',
    },
    () => {},
    error => {
      console.log(error);
    },
  );

  const [selectedValue, setSelectedValue] = useState('');
  const [output, setoutput] = useState('');
  const [scarp, setscarp] = useState('');
  const [idenID, setidenID] = useState('');
  const [idenD, setidenD] = useState('');
  const [durationH, setdurationH] = useState('');
  const [durationM, setdurationM] = useState('');
  const [Processby, setprocessby] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM Users', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var useroutput = results.rows.item(0).Output;
            var userscarp = results.rows.item(0).Scarp;
            var useridenID = results.rows.item(0).IdenID;
            var useridenD = results.rows.item(0).IdenDes;
            var userdurationH = results.rows.item(0).DurationH;
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
          }console.log('get');
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Divider color="white" width={1.5} style={{marginHorizontal: 20}} />

      <Card containerStyle={{borderRadius: 10, marginBottom: 10}}>
        <View style={styles.showlist}>
          <Icon
            name="filetext1"
            type="antdesign"
            size={40}
          />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Production Order ID : {idenID}</Text>
          </Card>
        </View>

        <View style={{flex: 1, flexDirection: 'row', marginLeft: 40}}>
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Operation ID : {scarp}</Text>
          </Card>
        </View>

        <View style={styles.showlist}>
          <Icon
            name="inbox"
            type="antdesign"
            size={40}
          />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Output Product : {idenD}</Text>
          </Card>
        </View>

        <View style={styles.showlist}>
          <Icon
            name="calendar"
            type="antdesign"
            size={40}
          />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Production date time : {durationH}</Text>
          </Card>
        </View>

        <View style={{flex: 1, flexDirection: 'row', marginLeft: 40}}>
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Expiration date time : {durationM}</Text>
          </Card>
        </View>

        <View style={styles.showlist}>
          <Icon
            name="edit"
            type="antdesign"
            size={40}
          />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}> Planned Quatity : {output}</Text>
          </Card>
        </View>

        <Button
          raised
          title="Production Confirm"
          onPress={() => navigation.navigate('ProductionConfirm')}
          containerStyle={{marginVertical: 10, marginHorizontal: 10}}
          buttonStyle={{backgroundColor: 'green', borderRadius: 7}}
          titleStyle={{fontSize: 20}}
        />
        <Button
          raised
          title="Show"
          onPress={() => navigation.navigate('Showsql')}
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
  cardstyle: {
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#EEF1F3',
    flex: 1,
  },
  showlist:{
    flex: 1, 
    flexDirection: 'row', 
    justifyContent:'space-between', 
    alignItems:'center'
  }
});

export default ProductionOrder;
