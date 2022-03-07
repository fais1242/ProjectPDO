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

const ProductionOrder = ({navigation}) => {
  var Cxml2json = require('xml2js').parseString;
  var stripNS = require('xml2js').processors.stripPrefix;

  const [orderid, setorderid] = useState('');
  const [operation, setoperation] = useState('');
  const [output, setoutput] = useState('');
  // const [Pdate, setPdate] = useState('');
  // const [Edate, setEdate] = useState('');
  const [plan, setplan] = useState('');
  const [unit, setunit] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
  // await getData(),
  // setLoading(false),
  getshow()
  }, []);

  getshow = async () => {

  let Order ;

    try {
      console.log('start getdata');
  await  AsyncStorage.getItem('OrderData').then(value => {
        if (value !== null) {
          console.log('getdata');
          console.log(value);
          Order = JSON.parse(value);
          console.log(Order);
          setorderid(Order.OrderID);
          console.log(orderid);
        }
      });
    } 
    catch (e) {
      console.log(e);
    }

  let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global">
  <soapenv:Header/>
  <soapenv:Body>
     <glob:ProductionLotByElementsQuery_sync>
        <ProductionLotSelectionByElements>
           <SelectionByProductionLotID>
              <InclusionExclusionCode>i</InclusionExclusionCode>
              <IntervalBoundaryTypeCode>1</IntervalBoundaryTypeCode>
              <LowerBoundaryProductionLotID>${Order.OrderID}</LowerBoundaryProductionLotID>
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

  var base64 = require('base-64');
  var utf8 = require('utf8');
  var user = '_NTZDEV';
  var pass = 'Welcome2021';
  var createuser = user + ':' + pass;
  var bytes = utf8.encode(createuser);
  var encoded = base64.encode(bytes);
  var basicAuth = 'Basic ' + encoded;
  console.log(basicAuth);

 
    console.log('getshow'+Order.OrderID);
    axios
    .post(
      `https://my334089.sapbydesign.com/sap/bc/srt/scs/sap/queryproductionlotisiin?sap-vhost=my334089.sapbydesign.com`,
      xml,
      {
        headers: {
          'Content-Type': 'text/xml',
          Authorization: basicAuth,
          // 'Basic X05UWkRFVjpXZWxjb21lMjAyMQ==',
        },
      },
    )
    .then(res => {
      // setLoading(true)
      console.log(res.data);
      Cxml2json(
        res.data,
        {tagNameProcessors: [stripNS]},
        function (err, result) {
          console.log(JSON.stringify(result));
          var i;
          for (
            let index = 0;
            index <
            result.Envelope.Body[0]['ProductionLotByElementsResponse_sync'][0][
              'ProductionLot'
            ][0]['ConfirmationGroup'].length;
            index++
          ) {
            console.log('___' + index);
            i = index;
          }
          if (
            result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
              .ProductionLot[0].ConfirmationGroup[i].ProductionTask[0]
              .OperationTypeCode[0]._ == 1
          ) {
            // console.log('1                                            '+result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
            // .ProductionLot[0].ConfirmationGroup[1].MaterialOutput[1]
            // .TotalConfirmedQuantity[0]._);
            // console.log('2                                            '+ result.Envelope.Body[0]['ProductionLotByElementsResponse_sync'][0]['ProductionLot'][0]
            // ['ConfirmationGroup'][i]['MaterialOutput'].length);
            console.log(i);
            setoperation(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].ProductionTask[0]
                .OperationTypeCode[0]._,
            );
            setCGuuID(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].ConfirmationGroupUUID[0],
            );
            setPTaskID(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].ProductionTask[0]
                .ProductionTaskID[0],
            );
            setPTaskuuID(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].ProductionTask[0]
                .ProducionTaskUUID[0],
            );

            // setoutput(
            //   result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
            //     .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[0]
            //     .ProductID[0],
            // );
            // setplan(
            //   result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
            //     .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[0]
            //     .PlannedQuantity[0]._,
            // );
            // setunit(
            //   result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
            //     .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[0]
            //     .PlannedQuantity[0].$.unitCode,
            // );
            // setMOuuID(
            //   result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
            //     .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[0]
            //     .MaterialOutputUUID[0],
            // );
            // setAreaID(
            //   result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
            //     .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[0]
            //     .TargetLogisticsAreaID[0],
            // );
            // setIdenID(
            //   result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
            //     .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[0]
            //     .IdentifiedStockID[0],
            // );
            var j = 0 ;
            if ( result.Envelope.Body[0]['ProductionLotByElementsResponse_sync'][0]['ProductionLot'][0]
            ['ConfirmationGroup'][i]['MaterialOutput'].length == 1) {
            setoutput(
            result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[j]
                .ProductID[0],
            );
            setplan(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[j]
                .PlannedQuantity[0]._,
            );
            setunit(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[j]
                .PlannedQuantity[0].$.unitCode,
            );
            setMOuuID(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[j]
                .MaterialOutputUUID[0],
            );
            setAreaID(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[j]
                .TargetLogisticsAreaID[0],
            );
            setdesP(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[j]
                .MaterialOutputInspection[0].InspectionSamplingDetails[0].ProductDescription[0],
            );
            console.log(result.Envelope.Body[0]['ProductionLotByElementsResponse_sync'][0]['ProductionLot'][0]
            ['ConfirmationGroup'][i]['MaterialOutput'][j]['IdentifiedStockID']);

            if (result.Envelope.Body[0]['ProductionLotByElementsResponse_sync'][0]['ProductionLot'][0]
            ['ConfirmationGroup'][i]['MaterialOutput'][j]['IdentifiedStockID'] != undefined) {
              setIdenID(
                result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                  .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[j]
                  .IdentifiedStockID[0],
              );   
            }
            } else  {
              for (let index = 0; index < result.Envelope.Body[0]['ProductionLotByElementsResponse_sync'][0]['ProductionLot'][0]
              ['ConfirmationGroup'][i]['MaterialOutput'].length; index++) {
                
                j++;

                if ( result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                  .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[j]
                  .TotalConfirmedQuantity[0]._ > '0') {
                    console.log('total: '+j);
            setoutput(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[j]
                .ProductID[0],
            );
            setplan(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[j]
                .PlannedQuantity[0]._,
            );
            setunit(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[j]
                .PlannedQuantity[0].$.unitCode,
            );
            setMOuuID(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[j]
                .MaterialOutputUUID[0],
            );
            setAreaID(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[j]
                .TargetLogisticsAreaID[0],
            );
            setIdenID(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[j]
                .IdentifiedStockID[0],
            );
            setdesP(
              result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
                .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[j]
                .MaterialOutputInspection[0].InspectionSamplingDetails[0].ProductDescription[0],
            );
            break;
                }   
              }
            }
            // setoutput(
            //   result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
            //     .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[1]
            //     .ProductID[0],
            // );
            // setplan(
            //   result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
            //     .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[1]
            //     .PlannedQuantity[0]._,
            // );
            // setunit(
            //   result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
            //     .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[1]
            //     .PlannedQuantity[0].$.unitCode,
            // );
            // setMOuuID(
            //   result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
            //     .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[1]
            //     .MaterialOutputUUID[0],
            // );
            // setAreaID(
            //   result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
            //     .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[1]
            //     .TargetLogisticsAreaID[0],
            // );
            // setIdenID(
              // result.Envelope.Body[0].ProductionLotByElementsResponse_sync[0]
              //   .ProductionLot[0].ConfirmationGroup[i].MaterialOutput[1]
              //   .IdentifiedStockID[0],
            // );

            console.log('1' + CGuuID);
            console.log('2' + PTaskID);
            console.log('3' + PTaskuuID);
            console.log('4' + MOuuID);
            console.log('5' + AreaID);
            console.log('6' + IdenID);
          }
        },
      
        );
        setLoading(false)
      });

  }

 
  // if (loading) {
  //   return <ActivityIndicator />;
  // }

  const getOrder = () => {
    setLoading(true);

    console.log(orderid);
    firestore()
      .collection('Users')
      .doc(orderid)
      .set({
        OrderID: orderid,
        ProductID: output,
        ProductDes:desP,
        Planned: plan,
        CGuuID: CGuuID,
        PTaskID: PTaskID,
        PTaskuuID: PTaskuuID,
        MOuuID: MOuuID,
        IdenID: IdenID,
        AreaID: AreaID,
        Unit: unit,
        Status: 'NotStart',
        Operation: operation,
      })
      .then(() => {
        setLoading(false);
        alert('Save ! Success');
        console.log('User added!');
        navigation.navigate('History');
      });
  };

  const [desP, setdesP] = useState('');
  const [CGuuID, setCGuuID] = useState('');
  const [PTaskID, setPTaskID] = useState('');
  const [PTaskuuID, setPTaskuuID] = useState('');
  const [MOuuID, setMOuuID] = useState('');
  const [AreaID, setAreaID] = useState('');
  const [IdenID, setIdenID] = useState('');

  // const setData = () => {
  //   try {
  //     console.log('start setdata');
  //     var Order = {
  //       OrderID: orderid,
  //       CGuuID: CGuuID,
  //       PTaskID: PTaskID,
  //       PTaskuuID: PTaskuuID,
  //       MOuuID: MOuuID,
  //       IdenID: IdenID,
  //       AreaID: AreaID,
  //       Unit: unit,
  //     };
  //     console.log(Order.OrderID);
  //     console.log('setdata');
  //     AsyncStorage.setItem('OrderDetail', JSON.stringify(Order));
  //     navigation.navigate('ProductionConfirm');
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
                Production Order ID : {orderid}
              </Text>
            </Card>
          </View>

          <View style={styles.showlist}>
            <Icon name="filetext1" type="antdesign" size={40} />
            <Card containerStyle={styles.cardstyle}>
              <Text style={styles.textshow}>Product ID : {output}</Text>
            </Card>
          </View>

          <View style={styles.showlist}>
            <Icon name="inbox" type="antdesign" size={40} />
            <Card containerStyle={styles.cardstyle}>
              <Text style={styles.textshow}>Product Description : {desP} </Text>
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
                Planned Quatity : {plan} {unit}
              </Text>
            </Card>
          </View>

          {/* <Button
          raised
          title="Production Confirm"
          onPress={setData}
          containerStyle={{marginVertical: 10, marginHorizontal: 10}}
          buttonStyle={{backgroundColor: 'green', borderRadius: 7}}
          titleStyle={{fontSize: 20}}
        /> */}
          <Button
            raised
            title="SAVE"
            onPress={getOrder}
            containerStyle={{marginVertical: 10, marginHorizontal: 10}}
            buttonStyle={{borderRadius: 7}}
            titleStyle={{fontSize: 20}}
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['#08d4c4', '#01ab9d'],
            }}
          />
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

export default ProductionOrder;
