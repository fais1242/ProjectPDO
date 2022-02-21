import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
  } from 'react-native';
  import {Button, Image, Card, Divider, Icon} from 'react-native-elements';
  import React, {useState, useEffect} from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import axios from 'axios';
  import firestore from '@react-native-firebase/firestore';
  import LinearGradient from 'react-native-linear-gradient';
  import * as Animatable from 'react-native-animatable';
  
  const ProductionShow = ({navigation , route}) => {

    const [orderid, setorderid] = useState('');
    const [operation, setoperation] = useState('');
    const [output, setoutput] = useState('');
    // const [Pdate, setPdate] = useState('');
    // const [Edate, setEdate] = useState('');
    const [plan, setplan] = useState('');
    const [unit, setunit] = useState('');

    const [OrderID, setOrderID] = useState([]);

    const {Order} = route.params;

    useEffect(() => {
        firestore()
        .collection('Users')
        .doc(Order.OrderID)
        .get()
        .then(documentSnapshot => {
            setOrderID(documentSnapshot.data());
            // setLoading(false);
          });
    
          console.log('-------------1'+OrderID.OrderID);
          console.log('-------------2'+JSON.stringify(OrderID));
    
      }, []);

    return (
    <ScrollView style={styles.container}>
      <Divider color="white" width={1.5} style={{marginHorizontal: 20}} />

      <Card containerStyle={{borderRadius: 10, marginBottom: 10}}>
        <View style={styles.showlist}>
          <Icon name="filetext1" type="antdesign" size={40} />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Production Order ID : {OrderID.OrderID}</Text>
          </Card>
        </View>

        <View style={styles.showlist}>
          <Icon name="filetext1" type="antdesign" size={40} />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Operation ID : {OrderID.Operation}</Text>
          </Card>
        </View>

        <View style={styles.showlist}>
          <Icon name="inbox" type="antdesign" size={40} />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Output Product : {OrderID.Product} </Text>
          </Card>
        </View>

        {/* <View style={styles.showlist}>
          <Icon
            name="calendar-check-o"
            type="font-awesome"
            size={40}
          />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Production date time : {}</Text>
          </Card>
        </View>

        <View style={styles.showlist}>
        <Icon
            name="calendar-times-o"
            type="font-awesome"
            size={40}
          />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Expiration date time : {}</Text>
          </Card>
        </View> */}

        <View style={styles.showlist}>
          <Icon name="edit" type="antdesign" size={40} />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>
              {' '}
              Planned Quatity : {OrderID.Planned} {OrderID.Unit}
            </Text>
          </Card>
        </View>

        <Button
          raised
          title="Production Confirm"
          onPress={() => {
            navigation.navigate('ProductionConfirm',{Order:OrderID});
          }}
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ['#00CC00', '#009900', '#00FF00'],
          }}
          containerStyle={{marginVertical: 10, marginHorizontal: 10}}
          buttonStyle={{borderRadius: 7}}
          titleStyle={{fontSize: 20}}
        />
        {/* <Button
          raised
          title="SAVE"
          onPress={getOrder}
          containerStyle={{marginVertical: 10, marginHorizontal: 10}}
          buttonStyle={{backgroundColor: 'green', borderRadius: 7}}
          titleStyle={{fontSize: 20}}
        /> */}
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
    fontSize: 14,
    color: 'black',
  },
  cardstyle: {
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#EEF1F3',
    flex: 1,
  },
  showlist: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ProductionShow;