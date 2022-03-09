import {View, Text, ScrollView, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {Button, Image, Card, Divider, Icon, Input} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const ProductionConfirm = ({navigation, route}) => {
  var Cxml2json = require('xml2js').parseString;
  var stripNS = require('xml2js').processors.stripPrefix;

  const [loading, setLoading] = useState(false);
  const [OrderID, setOrderID] = useState([]); // Initial empty array of users

  const [fname,setfname] = useState('');
  const [lname,setlname] = useState('');

  

  useEffect(() => {
    firestore()
    .collection('Users')
    .doc(Order.OrderID)
    .get()
    .then(documentSnapshot => {
        setOrderID(documentSnapshot.data());
        // setLoading(false);
        // setidenID(OrderID.IdenID)
      });
      getData();


      console.log('-------------1'+OrderID.OrderID);
      console.log('-------------2'+JSON.stringify(OrderID));
  }, []);


  // useEffect(() => {
  //   getData();
  // }, []);



  const getData =  () => {
    try {
      console.log('start getdata');
      AsyncStorage.getItem('usernameDB').then(value => {
        if (value !== null) {
          console.log('getdata');
          console.log(value);
          let Username = JSON.parse(value);
          console.log(Username);
          setfname(Username.fname);
          setlname(Username.lname)
        }
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

 

    // try {
    //   console.log('start getdata');
    //   AsyncStorage.getItem('OrderDetail').then(value => {
    //     if (value !== null) {
    //       console.log('getdata');
    //       let Order = JSON.parse(value);
    //       console.log(Order);
    //       setCGuuID(Order.CGuuID);
    //       setPTaskID(Order.PTaskID);
    //       setPTaskuuID(Order.PTaskuuID);
    //       setMOuuID(Order.MOuuID);
    //       setidenID(Order.IdenID);
    //       setAreaID(Order.AreaID);
    //       setunit(Order.Unit);
    //     }
    //           console.log('1 '+CGuuID);
    //           console.log('2 '+PTaskID);
    //           console.log('3 '+PTaskuuID);
    //           console.log('4 '+MOuuID);
    //           console.log('5 '+AreaID);
    //           console.log('6 '+idenID);
    //   });
    // } catch (e) {
    //   console.log(e);}

      // AsyncStorage.getItem('OrderData').then(value => {
      //   if (value !== null) {
      //     console.log('2 getdata');
      //     console.log(value);
      //     let Order = JSON.parse(value);
      //     console.log(Order);
      //     setorderid(Order.OrderID);
      //     console.log(orderid);
      //   }
      // })

  const {Order} = route.params;

  var base64 = require('base-64');
  var utf8 = require('utf8');
  var user = '_NTZDEV';
  var pass = 'Welcome2021';
  var createuser = user + ':' + pass;
  var bytes = utf8.encode(createuser);
  var encoded = base64.encode(bytes);
  var basicAuth = 'Basic ' + encoded;
  console.log(basicAuth);

  const setData = () => {

    setLoading(true)

    var total = parseInt(output)+parseInt(OrderID.OutPutQty) ;

    console.log(total);

    
              console.log('1 '+OrderID.OrderID);
              console.log('2 '+OrderID.PTaskID);
              console.log('3 '+OrderID.PTaskuuID);
              console.log('4 '+OrderID.MOuuID);
              console.log('5 '+OrderID.AreaID);
              console.log('6 '+OrderID.IdenID);

    var iden ;
    if (idenID == ''&&OrderID.IdenID == ''&& output=='') {
      Alert.alert('Inden null')
    } else if(idenID == ''&&OrderID.IdenID != ''&& output!=''){
      iden = OrderID.IdenID
      console.log('iden if 1'+iden);
      let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global" xmlns:ymg="http://0004586690-one-off.sap.com/YMGK3T5AY_">
      <soapenv:Header/>
      <soapenv:Body>
         <glob:ProductionLotsBundleMaintainRequest_sync_V1>
         <BasicMessageHeader>
      </BasicMessageHeader>
            <ProductionLot>
               <ConfirmationGroup>
                  <!--Optional:-->
                  <ConfirmationGroupUUID>${OrderID.CGuuID}</ConfirmationGroupUUID>
                  <ProductionTask>
                     <ProductionTaskID>${OrderID.PTaskID}</ProductionTaskID>
                     <ProducionTaskUUID>${OrderID.PTaskuuID}</ProducionTaskUUID>
                     <AssignResponsibleIndicator>true</AssignResponsibleIndicator>
                  </ProductionTask>
                  
                  <!--Zero or more repetitions:-->
                  <MaterialOutput ActionCode="02">
                     <MaterialOutputUUID>${OrderID.MOuuID}</MaterialOutputUUID>
                     <IdentifiedStockID>${iden}</IdentifiedStockID>
                     <TargetLogisticsAreaID>${OrderID.AreaID}</TargetLogisticsAreaID>
                     <ConfirmedQuantity unitCode="${OrderID.Unit}">${output}</ConfirmedQuantity>
                  </MaterialOutput>
               </ConfirmationGroup>
            </ProductionLot>
         </glob:ProductionLotsBundleMaintainRequest_sync_V1>
      </soapenv:Body>
      </soapenv:Envelope> `;
      // ${output}
      axios
        .post(
          `https://my334089.sapbydesign.com/sap/bc/srt/scs/sap/manageproductionlotsin?sap-vhost=my334089.sapbydesign.com`,
          xml,
          {
            headers: {
              'Content-Type': 'text/xml',
              Authorization: basicAuth,
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
              if (result.Envelope.Body[0].ProdLotBundleMaintainConfirmation_sync_V1[0]
                .ProductionLotResponse[0].ProductionLotLog[0].SeverityCode[0] == 'S' && 
                result.Envelope.Body[0].ProdLotBundleMaintainConfirmation_sync_V1[0]
                .ProductionLotResponse[0].ProductionLotLog[1].SeverityCode[0] == 'S'&& 
                result.Envelope.Body[0].ProdLotBundleMaintainConfirmation_sync_V1[0]
                .ProductionLotResponse[0].ProductionLotLog[2].SeverityCode[0] == 'S') {
                  Alert.alert('Confirm Success');
  
                  console.log('Success');
  
                  try {
                    // console.log('           '+Order.OrderID);
                    // firestore().collection('Users').doc(Order.OrderID).update({ 
                    //   OutPutQty: output, 
                    //   ScrapQty: scarp,
                    //   Status: selectedValue,
                    //   Processby: Processby,
                    //   IdenID:idenID
                    // })   
                    if (idenID == '') {
                    firestore().collection('Users').doc(Order.OrderID).update({ 
                      OutPutQty: total, 
                      // ScrapQty: scarp,
                      Status: selectedValue,
                      Processby: fname+'  '+ lname,
                      IdenID:OrderID.IdenID
                    })
                  } else {
                    firestore().collection('Users').doc(Order.OrderID).update({ 
                      OutPutQty: total, 
                      // ScrapQty: scarp,
                      Status: selectedValue,
                      Processby: fname+'  '+ lname,
                      IdenID:idenID
                    })   
                  }
                  setLoading(false)
                    alert('Confirm ! Success')
                    setLoading(false);
                    navigation.navigate('Home')
                  } catch (error) {
                    setLoading(false)
                    
                    console.log(error);
                    console.log('error123');
                  }
  
              }else{
                setLoading(false)
                Alert.alert('Confirm Fail');
                console.log('Error');
              }
            },
          );
        })
    }else if(output!=''){
      iden = idenID
      console.log('iden if 2'+iden);
      let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global" xmlns:ymg="http://0004586690-one-off.sap.com/YMGK3T5AY_">
      <soapenv:Header/>
      <soapenv:Body>
         <glob:ProductionLotsBundleMaintainRequest_sync_V1>
         <BasicMessageHeader>
      </BasicMessageHeader>
            <ProductionLot>
               <ConfirmationGroup>
                  <!--Optional:-->
                  <ConfirmationGroupUUID>${OrderID.CGuuID}</ConfirmationGroupUUID>
                  <ProductionTask>
                     <ProductionTaskID>${OrderID.PTaskID}</ProductionTaskID>
                     <ProducionTaskUUID>${OrderID.PTaskuuID}</ProducionTaskUUID>
                     <AssignResponsibleIndicator>true</AssignResponsibleIndicator>
                  </ProductionTask>
                  
                  <!--Zero or more repetitions:-->
                  <MaterialOutput ActionCode="02">
                     <MaterialOutputUUID>${OrderID.MOuuID}</MaterialOutputUUID>
                     <IdentifiedStockID>${iden}</IdentifiedStockID>
                     <TargetLogisticsAreaID>${OrderID.AreaID}</TargetLogisticsAreaID>
                     <ConfirmedQuantity unitCode="${OrderID.Unit}">${output}</ConfirmedQuantity>
                  </MaterialOutput>
               </ConfirmationGroup>
            </ProductionLot>
         </glob:ProductionLotsBundleMaintainRequest_sync_V1>
      </soapenv:Body>
      </soapenv:Envelope> `;
      // ${output}
      axios
        .post(
          `https://my334089.sapbydesign.com/sap/bc/srt/scs/sap/manageproductionlotsin?sap-vhost=my334089.sapbydesign.com`,
          xml,
          {
            headers: {
              'Content-Type': 'text/xml',
              Authorization: basicAuth,
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
              if (result.Envelope.Body[0].ProdLotBundleMaintainConfirmation_sync_V1[0]
                .ProductionLotResponse[0].ProductionLotLog[0].SeverityCode[0] == 'S' && 
                result.Envelope.Body[0].ProdLotBundleMaintainConfirmation_sync_V1[0]
                .ProductionLotResponse[0].ProductionLotLog[1].SeverityCode[0] == 'S'&& 
                result.Envelope.Body[0].ProdLotBundleMaintainConfirmation_sync_V1[0]
                .ProductionLotResponse[0].ProductionLotLog[2].SeverityCode[0] == 'S') {
                  Alert.alert('Confirm Success');
  
                  console.log('Success');
  
                  try {
                    // console.log('           '+Order.OrderID);
                    // firestore().collection('Users').doc(Order.OrderID).update({ 
                    //   OutPutQty: output, 
                    //   ScrapQty: scarp,
                    //   Status: selectedValue,
                    //   Processby: Processby,
                    //   IdenID:idenID
                    // })   
                    if (idenID == '') {
                    firestore().collection('Users').doc(Order.OrderID).update({ 
                      OutPutQty: total, 
                      // ScrapQty: scarp,
                      Status: selectedValue,
                      Processby: fname+'  '+ lname,
                      IdenID:OrderID.IdenID
                    })
                  } else {
                    firestore().collection('Users').doc(Order.OrderID).update({ 
                      OutPutQty: total, 
                      // ScrapQty: scarp,
                      Status: selectedValue,
                      Processby: fname+'  '+ lname,
                      IdenID:idenID
                    })   
                  }
                  setLoading(false)
                    alert('Confirm ! Success')
                    setLoading(false);
                    navigation.navigate('Home')
                  } catch (error) {
                    setLoading(false)
                    
                    console.log(error);
                    console.log('error123');
                  }
  
              }else{
                setLoading(false)
                Alert.alert('Confirm Fail');
                console.log('Error');
              }
            },
          );
        })
    }else{
      setLoading(false)
      Alert.alert('กรุณาใส่จำนวน')
    }

    // let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global" xmlns:ymg="http://0004586690-one-off.sap.com/YMGK3T5AY_">
    // <soapenv:Header/>
    // <soapenv:Body>
    //    <glob:ProductionLotsBundleMaintainRequest_sync_V1>
    //    <BasicMessageHeader>
    // </BasicMessageHeader>
    //       <ProductionLot>
    //          <ConfirmationGroup>
    //             <!--Optional:-->
    //             <ConfirmationGroupUUID>${OrderID.CGuuID}</ConfirmationGroupUUID>
    //             <ProductionTask>
    //                <ProductionTaskID>${OrderID.PTaskID}</ProductionTaskID>
    //                <ProducionTaskUUID>${OrderID.PTaskuuID}</ProducionTaskUUID>
    //                <AssignResponsibleIndicator>true</AssignResponsibleIndicator>
    //             </ProductionTask>
                
    //             <!--Zero or more repetitions:-->
    //             <MaterialOutput ActionCode="02">
    //                <MaterialOutputUUID>${OrderID.MOuuID}</MaterialOutputUUID>
    //                <IdentifiedStockID>${iden}</IdentifiedStockID>
    //                <TargetLogisticsAreaID>${OrderID.AreaID}</TargetLogisticsAreaID>
    //                <ConfirmedQuantity unitCode="${OrderID.Unit}">${output}</ConfirmedQuantity>
    //             </MaterialOutput>
    //          </ConfirmationGroup>
    //       </ProductionLot>
    //    </glob:ProductionLotsBundleMaintainRequest_sync_V1>
    // </soapenv:Body>
    // </soapenv:Envelope> `;
    // // ${output}
    // axios
    //   .post(
    //     `https://my334089.sapbydesign.com/sap/bc/srt/scs/sap/manageproductionlotsin?sap-vhost=my334089.sapbydesign.com`,
    //     xml,
    //     {
    //       headers: {
    //         'Content-Type': 'text/xml',
    //         Authorization: basicAuth,
    //       },
    //     },
    //   )
    //   .then(res => {
    //     console.log(res.data);
    //     Cxml2json(
    //       res.data,
    //       {tagNameProcessors: [stripNS]},
    //       function (err, result) {
    //         console.log(JSON.stringify(result));
    //         if (result.Envelope.Body[0].ProdLotBundleMaintainConfirmation_sync_V1[0]
    //           .ProductionLotResponse[0].ProductionLotLog[0].SeverityCode[0] == 'S' && 
    //           result.Envelope.Body[0].ProdLotBundleMaintainConfirmation_sync_V1[0]
    //           .ProductionLotResponse[0].ProductionLotLog[1].SeverityCode[0] == 'S'&& 
    //           result.Envelope.Body[0].ProdLotBundleMaintainConfirmation_sync_V1[0]
    //           .ProductionLotResponse[0].ProductionLotLog[2].SeverityCode[0] == 'S') {
    //             Alert.alert('Confirm Success');

    //             console.log('Success');

    //             try {
    //               // console.log('           '+Order.OrderID);
    //               // firestore().collection('Users').doc(Order.OrderID).update({ 
    //               //   OutPutQty: output, 
    //               //   ScrapQty: scarp,
    //               //   Status: selectedValue,
    //               //   Processby: Processby,
    //               //   IdenID:idenID
    //               // })   
    //               if (idenID == '') {
    //               firestore().collection('Users').doc(Order.OrderID).update({ 
    //                 OutPutQty: total, 
    //                 // ScrapQty: scarp,
    //                 Status: selectedValue,
    //                 Processby: fname+'  '+ lname,
    //                 IdenID:OrderID.IdenID
    //               })
    //             } else {
    //               firestore().collection('Users').doc(Order.OrderID).update({ 
    //                 OutPutQty: total, 
    //                 // ScrapQty: scarp,
    //                 Status: selectedValue,
    //                 Processby: fname+'  '+ lname,
    //                 IdenID:idenID
    //               })   
    //             }
    //             setLoading(false)
    //               alert('Confirm ! Success')
    //               setLoading(false);
    //               navigation.navigate('Home')
    //             } catch (error) {
    //               setLoading(false)
                  
    //               console.log(error);
    //               console.log('error123');
    //             }

    //         }else{
    //           setLoading(false)
    //           Alert.alert('Confirm Fail');
    //           console.log('Error');
    //         }
    //       },
    //     );
    //   })
  };

  const [selectedValue, setSelectedValue] = useState('Start');
  const [output, setoutput] = useState('0');
  const [scarp, setscarp] = useState('');
  const [idenID, setidenID] = useState('');
  const [idenD, setidenD] = useState('');
  const [durationH, setdurationH] = useState('');
  const [durationM, setdurationM] = useState('');
  const [Processby, setprocessby] = useState('');

  const [orderid, setorderid] = useState('');

  // const [CGuuID, setCGuuID] = useState('');
  // const [PTaskID, setPTaskID] = useState('');
  // const [PTaskuuID, setPTaskuuID] = useState('');
  // const [MOuuID, setMOuuID] = useState('');
  // const [AreaID, setAreaID] = useState('');
  // const [unit, setunit] = useState('');

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
      <Card
        containerStyle={{
          borderRadius: 10,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
        }}>
        <View style={{flex: 1}}>
          <Text style={styles.stext}>Output Production Quantity</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Input
            containerStyle={styles.textInput}
            inputContainerStyle={{borderBottomWidth: 1}}
            keyboardType='number-pad'
            onChangeText={value => setoutput(value)}
          />
          <Text style={styles.textshow}> {OrderID.Unit} </Text>
          </View>
        </View>

        {/* <View style={{flex: 1}}>
          <Text style={styles.stext}>Scrap Quantity</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>

          <Input
            containerStyle={styles.textInput}
            inputContainerStyle={{borderBottomWidth: 1}}
            onChangeText={value => setscarp(value)}
          />
          <Text style={styles.textshow}> {OrderID.Unit} </Text>
          </View>
        </View> */}

        <View style={{flex: 1}}>
          <Text style={styles.stext}>Identified Stock ID</Text>

          <Input
            placeholder={OrderID.IdenID}
            containerStyle={styles.textInput}
            inputContainerStyle={{borderBottomWidth: 1}}
            onChangeText={value => setidenID(value)}
          />
        </View>

        {/* <View style={{flex: 1}}>
          <Text style={styles.stext}>Identified Stock Descrition</Text>

          <Input
            containerStyle={styles.textInput}
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={value => setidenD(value)}
          />
        </View> */}

        {/* <View style={{flex: 1}}>
          <Text style={styles.stext}>Duration</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Input
              containerStyle={{
                borderRadius: 5,
                backgroundColor: '#EEF1F3',
                flex: 1,
                height: hp('6.5%'),
              }}
              placeholder="Hour"
              // inputContainerStyle={{borderBottomWidth: 0}}
              onChangeText={value => setdurationH(value)}
            />
            <Text style={{fontSize:20,}}>
             H
           </Text>

            <Text style={{fontSize: 40, paddingHorizontal: 5, color: 'black'}}>
              :
            </Text>
            <Input
              containerStyle={{
                borderRadius: 5,
                backgroundColor: '#EEF1F3',
                flex: 1,
                height: hp('6.5%'),
              }}
              placeholder="Minutes"
              inputContainerStyle={{borderBottomWidth: 0}}
              onChangeText={value => setdurationM(value)}
            />
            <Text style={{fontSize:20}} >
           Min
           </Text>
          </View>
        </View> */}

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
            value={fname+'  '+ lname}
            inputContainerStyle={{borderBottomWidth: 1}}
            onChangeText={value => setprocessby(value)}
          />
        </View>

        <Button
          raised
          title="Submit"
          onPress={setData}
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
    flex:1
  },
});

export default ProductionConfirm;
