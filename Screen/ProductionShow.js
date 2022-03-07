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

const ProductionShow = ({navigation, route}) => {
  const [orderid, setorderid] = useState('');
  const [operation, setoperation] = useState('');
  const [output, setoutput] = useState('');
  // const [Pdate, setPdate] = useState('');
  // const [Edate, setEdate] = useState('');
  const [plan, setplan] = useState('');
  const [unit, setunit] = useState('');

  const [OrderID, setOrderID] = useState([]);

  const [loading, setLoading] = useState(true);

  const {Order} = route.params;

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(Order.OrderID)
      .get()
      .then(documentSnapshot => {
        setOrderID(documentSnapshot.data());
        setLoading(false);
      });

    console.log('-------------1' + OrderID.OrderID);
    console.log('-------------2' + JSON.stringify(OrderID));
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Divider color="white" width={1.5} style={{marginHorizontal: 20}} />

      <Animatable.View style={{flex: 1}} animation="fadeInUp">
        <Card containerStyle={{borderRadius: 10, marginBottom: 10}}>
          <View style={styles.showlist}>
            <Icon name="filetext1" type="antdesign" size={40} />
            <Card containerStyle={styles.cardstyle}>
              <Text style={styles.textshow}>
                Production Order ID : {OrderID.OrderID}
              </Text>
            </Card>
          </View>

          <View style={styles.showlist}>
            <Icon name="filetext1" type="antdesign" size={40} />
            <Card containerStyle={styles.cardstyle}>
              <Text style={styles.textshow}>
                Product ID : {OrderID.ProductID}
              </Text>
            </Card>
          </View>

          <View style={styles.showlist}>
            <Icon name="inbox" type="antdesign" size={40} />
            <Card containerStyle={styles.cardstyle}>
              <Text style={styles.textshow}>
                Product Description : {OrderID.ProductDes}{' '}
              </Text>
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

          <View style={styles.showlist}>
            <Icon name="file-download-done" type="materialicons" size={40} />
            <Card containerStyle={styles.cardstyle}>
              <Text style={styles.textshow}>
                {' '}
                Confirm Quatity : {OrderID.OutPutQty} {OrderID.Unit}
              </Text>
            </Card>
          </View>

          <Button
            raised
            title="Production Confirm"
            onPress={() => {
              navigation.navigate('ProductionConfirm', {Order: OrderID});
            }}
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['#08d4c4', '#01ab9d'],
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
      </Animatable.View>
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
