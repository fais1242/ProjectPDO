import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React, { useState, useEffect} from 'react';
import {Button, Image, Card, Divider, Icon} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';



// const DATA = [
//   {
//     id: '01',
//     title: 'First Item',
//   },
//   {
//     id: '02',
//     title: 'Second Item',
//   },
//   {
//     id: '03',
//     title: 'Third Item',
//   },
// ];

const History = ({navigation}) => {

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const users = [];
  
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setUsers(users);
        setLoading(false);
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  


  if (loading) {
    return <ActivityIndicator />;
  }


  return (
    <SafeAreaView style={styles.container}>
      <Divider color="white" width={1.5} style={{marginHorizontal: 20}} />
      <Card containerStyle={styles.cardbg}
      >
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProductionShow',{Order:item});
              }}>
              <Animatable.View style={styles.cardr}
              animation="fadeInUpBig">
                <Text style={styles.textshow}>OrderID :  {item.OrderID}</Text>
                <Text style={styles.textshow}>Status :  {item.Status}</Text>
              </Animatable.View>
            </TouchableOpacity>
          )}
        />
      </Card>
    </SafeAreaView>
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
  cardbg: {
    backgroundColor: '#3E3D50',
    // backgroundColor: 'white',
    borderRadius: 20,
    flex: 1,
    bottom: 10,
  },
  cardr: {
    backgroundColor: '#ffff',
    alignItems:'flex-start',
    // borderTopLeftRadius: 100,
    // borderBottomLeftRadius: 2,
    // borderBottomEndRadius: 100,
    // borderBottomStartRadius: 100,
    borderRadius:5,
    marginBottom: '5%',
    padding: 20,
    // marginLeft: '20%',
  },
  // cardl: {
  //   backgroundColor: '#ffff',
  //   alignItems: 'flex-start',
  //   borderTopRightRadius: 100,
  //   borderBottomRightRadius: 2,
  //   borderBottomLeftRadius: 100,
  //   borderBottomEndRadius: 100,
  //   marginBottom: 20,
  //   padding:20,
  //   marginRight:"20%"
  // },
});

export default History;
