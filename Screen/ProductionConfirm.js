import {View, Text, ScrollView, StyleSheet, Alert} from 'react-native';
import {Button, Image, Card, Divider, Icon, Input} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const ProductionConfirm = ({navigation}) => {

  const setData = async () => {
    if (output.length == 0 ) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      try {
        console.log('start setdata');
        
         var Order = {
          OrderID : Order.output,
        }
        console.log(Order.OrderID);
        console.log('setdata');
      await AsyncStorage.setItem('TestData', JSON.stringify(Order));
      console.log(Order);
      navigation.navigate('Showsql');
    } catch (e) {
        console.log(e);
    }
  }
}

let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global">
<soapenv:Header/>
<soapenv:Body>
   <glob:ProductionLotByElementsQuery_sync>
      <ProductionLotSelectionByElements>
         <SelectionByProductionLotID>
            <InclusionExclusionCode>i</InclusionExclusionCode>
            <IntervalBoundaryTypeCode>1</IntervalBoundaryTypeCode>
            <LowerBoundaryProductionLotID></LowerBoundaryProductionLotID>
         </SelectionByProductionLotID>
       </ProductionLotSelectionByElements>
      <ProcessingConditions>
         <QueryHitsMaximumNumberValue>1</QueryHitsMaximumNumberValue>
         <QueryHitsUnlimitedIndicator>false</QueryHitsUnlimitedIndicator>
         <LastReturnedObjectID/>
      </ProcessingConditions>
   </glob:ProductionLotByElementsQuery_sync>
</soapenv:Body>
</soapenv:Envelope> `;
axios
  .post(
    `https://my334089.sapbydesign.com/sap/bc/srt/scs/sap/queryproductionlotisiin?sap-vhost=my334089.sapbydesign.com`,
    xml,
    {
      headers: {
        'Content-Type': 'text/xml',
        Authorization: 'Basic X05UWkRFVjpXZWxjb21lMjAyMQ==',
        
      },
    },
  )
  .then(res => {
    console.log(res.data);
    Cxml2json(
      res.data,
      {tagNameProcessors: [stripNS]},
      function (err, result) {
        console.log(JSON.stringify(result));
        console.log(
          result.Envelope.Body[0]
            .ProductionLotByElementsResponse_sync[0]
            .ProductionLot[0].ConfirmationGroup[1].ProductionTask[0].OperationTypeCode[0]._,
        );
      },
    );
  });



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
