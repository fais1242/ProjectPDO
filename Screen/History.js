import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import React from 'react';
import {Button, Image, Card, Divider, Icon} from 'react-native-elements';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];


const History = () => {


  const Item = ({ title }) => (
    <View style={styles.cardr}>
      <Text style={styles.textshow}>{title}</Text>
    </View>
  );
  

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  

  return (
    <ScrollView style={styles.container}>
      <Divider color="white" width={1.5} style={{marginHorizontal: 20}} />
      <Card containerStyle={styles.cardbg}>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
       <View
          style={styles.cardr}>
          <Text style={styles.textshow}>asdfdsafdsa</Text>
        </View>
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
