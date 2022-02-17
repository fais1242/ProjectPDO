import {View, Text, StyleSheet, ScrollView, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button, Image, Card, Divider, Icon} from 'react-native-elements';

const DATA = [
  {
    id: '01',
    title: 'First Item',
  },
  {
    id: '02',
    title: 'Second Item',
  },
  {
    id: '03',
    title: 'Third Item',
  },
];


const History = (navigation) => {


  const Item = ({ title ,onPress}) => (
    <TouchableOpacity onPress={onPress}>
    <View style={styles.cardr}>
      <Text style={styles.textshow}>{title}</Text>
    </View>
    </TouchableOpacity>
  );
  

  const renderItem = ({ item }) => (
    <Item title={item.title} 
    // onPress ={() => navigation.navigate('Home')}
    />
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <Divider color="white" width={1.5} style={{marginHorizontal: 20}} />
      <Card containerStyle={styles.cardbg}>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
    borderRadius: 20,
    flex: 1,
  },
  cardr: {
    backgroundColor: '#ffff',
    alignItems: 'flex-end',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 2,
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100,
    marginBottom: "5%",
    padding:20,
    marginLeft:"20%"
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
