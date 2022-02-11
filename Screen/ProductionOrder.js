import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Button, Image, Card, Divider, Icon} from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const ProductionOrder = ({navigation}) => {

  var Cxml2json = require('xml2js').parseString;
  var stripNS = require('xml2js').processors.stripPrefix;

  const [orderid, setorderid] = useState('');
  const [operation, setoperation] = useState('');
  const [output, setoutput] = useState('');
  const [Pdate, setPdate] = useState('');
  const [Edate, setEdate] = useState('');
  const [plan, setplan] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData =  () => {
    try {
      console.log('start getdata');
      AsyncStorage.getItem('OrderData')
      .then(value=>{
        if (value !== null) {
          console.log('getdata');
          console.log(value);
          let Order = JSON.parse(value);
          console.log(Order)
          setorderid(Order.OrderID)
          console.log(orderid);
        }
      })
    } catch (e) {
      console.log(e);
    }

    
  };


    let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global">
  <soapenv:Header/>
  <soapenv:Body>
     <glob:ProductionLotByElementsQuery_sync>
        <ProductionLotSelectionByElements>
           <SelectionByProductionLotID>
              <InclusionExclusionCode>i</InclusionExclusionCode>
              <IntervalBoundaryTypeCode>1</IntervalBoundaryTypeCode>
              <LowerBoundaryProductionLotID>${orderid}</LowerBoundaryProductionLotID>
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
          for (let i = 0; i < result.Envelope.Body[0]['ProductionLotByElementsResponse_sync'][0]['ProductionLot'][0]['ConfirmationGroup'].length ; i++) {
            console.log('___'+i);
            if (result.Envelope.Body[0]
              .ProductionLotByElementsResponse_sync[0]
              .ProductionLot[0].ConfirmationGroup[i].ProductionTask[0].OperationTypeCode[0]._ == 1) {
              console.log(i);
              setoperation(result.Envelope.Body[0]
                .ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].ProductionTask[0].OperationTypeCode[0]._);
              setoutput(result.Envelope.Body[0]
                .ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[0].ProductID[0])
                setplan(result.Envelope.Body[0]
                  .ProductionLotByElementsResponse_sync[0]
                  .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[0].PlannedQuantity[0]._)
              break;
            }
          }

          // var Porder ;

          // const setData = async () => {
          //   for (let i = 0; i < 5; i++) {
          //     if (Porder+i == null ) {
          //       try {
          //         console.log('start setdata');
          //           var Order = {
          //           OrderID : output,
          //         }
          //         console.log(output);
          //         console.log('setdata');
          //       await AsyncStorage.setItem('OrderData', JSON.stringify(Order));
          //       navigation.navigate('Showsql');
          //     } catch (e) {
          //         console.log(e);
          //     }

          //     } 
          //   }
          // }



          const setData = async () => {
            if (output.length == 0 ) {
              Alert.alert('Warning!', 'Please write your data.');
            } else {
              try {
                console.log('start setdata');
                  var Order = {
                  OrderID : output,
                }
                console.log(output);
                console.log('setdata');
              await AsyncStorage.setItem('OrderData', JSON.stringify(Order));
              navigation.navigate('Showsql');
            } catch (e) {
                console.log(e);
            }
          }
        }




        },


      );
    });

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
            <Text style={styles.textshow}>Production Order ID : {orderid}</Text>
          </Card>
        </View>

        <View style={styles.showlist}>
        <Icon
            name="filetext1"
            type="antdesign"
            size={40}
          />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Operation ID : {operation}</Text>
          </Card>
        </View>

        <View style={styles.showlist}>
          <Icon
            name="inbox"
            type="antdesign"
            size={40}
          />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}>Output Product : {output} </Text>
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
          <Icon
            name="edit"
            type="antdesign"
            size={40}
          />
          <Card containerStyle={styles.cardstyle}>
            <Text style={styles.textshow}> Planned Quatity : {plan} EA</Text>
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
    fontSize: 14,
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
