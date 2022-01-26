import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Button, Image, Card, Divider, Icon} from 'react-native-elements';
import React from 'react';

const ProductionOrder = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <Divider color="white" width={1.5} style={{marginHorizontal: 20}} />

      <Card containerStyle={{borderRadius: 10, marginBottom: 10}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Icon
            style={{marginTop: 20}}
            name="filetext1"
            type="antdesign"
            size={40}
          />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Production Order ID : {}</Text>
          </Card>
        </View>

        <View style={{flex: 1, flexDirection: 'row', marginLeft: 40}}>
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Operation ID : {}</Text>
          </Card>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <Icon
            style={{marginTop: 20}}
            name="inbox"
            type="antdesign"
            size={40}
          />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Output Product : {}</Text>
          </Card>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <Icon
            style={{marginTop: 20}}
            name="calendar"
            type="antdesign"
            size={40}
          />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Production date time : {}</Text>
          </Card>
        </View>

        <View style={{flex: 1, flexDirection: 'row', marginLeft: 40}}>
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Expiration date time : {}</Text>
          </Card>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <Icon
            style={{marginTop: 20}}
            name="edit"
            type="antdesign"
            size={40}
          />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}> Planned Quatity : {}</Text>
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
});

export default ProductionOrder;
