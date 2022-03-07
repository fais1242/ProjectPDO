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
import {Button, Image, Card, Divider, Icon, SearchBar} from 'react-native-elements';
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
  
        setFilteredDataSource(users);
        setMasterDataSource(users);
        // setUsers(users);
        setLoading(false);
      });
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);


  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  // const updateSearch = (search) => {
  //   setSearch(search);
  // };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.OrderID
          ? item.OrderID.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };


  
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // if (loading) {
  //   return <ActivityIndicator size="large" />;
  // }
  return (
    <SafeAreaView style={styles.container}>
      <Divider color="white" width={1.5} style={{marginHorizontal: 20}} />
      
      <Animatable.View style={{flex:1}}
      animation="fadeIn"
      // duration={4000}
      >
        
      <Card containerStyle={styles.cardbg}
      >
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Type OrderID..."
          value={search}

          lightTheme={true}
          inputStyle={{color:'black'}}
          containerStyle={{ backgroundColor:'white',borderWidth: 1, borderRadius: 5, marginBottom:'3%'}}
        />
        
        <FlatList
          data={filteredDataSource}
          key={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProductionShow',{Order:item});
              }}>
              <Animatable.View style={styles.cardr}
              animation="fadeInDownBig">
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{marginHorizontal:'1%',flex:3}}>
                <Text style={styles.textshow}>OrderID :  {item.OrderID}</Text>
                <Text style={styles.textshow}>Status :  {item.Status}</Text>
                </View>
                <Divider  width={1.5} orientation="vertical" style={{marginHorizontal:'1.5%'}} />
                <View style={{marginHorizontal:'1%',flex:2.5}}>
                <Text style={styles.textshow2}>Product :  {item.ProductDes}</Text>
                <Text style={styles.textshow2}>Planned :  {item.Planned} {item.Unit}</Text>
                </View>
                </View>

              </Animatable.View>
            </TouchableOpacity>
          )}
        />
      </Card>
      </Animatable.View>
    </SafeAreaView>
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
    fontSize: 18,
    color: 'black',
  },
  textshow2: {
    fontSize: 14,
    color: 'black',
  },
  cardbg: {
    backgroundColor: '#3E3D50',
    // backgroundColor: 'white',
    borderRadius: 20,
    // flex: 1,
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
    marginBottom: '4%',
    paddingTop:'4%',
    paddingBottom:'4%',
    paddingLeft:'3%',
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
