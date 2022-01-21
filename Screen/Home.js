import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Button, Image } from 'react-native-elements';


const Home = ({navigation}) => {
  return (
    <View style={ styles.container }>

      <View>
      <Text style={styles.stext}>
        Home
        </Text>

        <Image
      source={{uri:'https://icon-library.com/images/users-icon-png/users-icon-png-17.jpg'}}
      style={{width:100,height:100}}
      containerStyle={{marginLeft:'auto', marginRight:'auto'}}
      />
      </View>
    <Button
        title= "Scan QR code"
        onPress={() => navigation.navigate('Scanner')}
        containerStyle = {{marginVertical: 10}}   
      />

       <Button
        title="Production Order"
        onPress={() => navigation.navigate('Production')}
        containerStyle = {{marginVertical: 10}}
      />

      <Button
        title="History"
        onPress={() => navigation.navigate('History')}
        containerStyle = {{marginVertical: 10}} 
      />
       <Button
        title="Login"
        onPress={() => Login}
        containerStyle = {{marginVertical: 10}} 
      />


    </View>
  );
};

const styles = StyleSheet.create ({
  container:{
    flex: 1,  
    padding:35,
    backgroundColor: '#FFB23E'
  },
  stext:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom:20,
    marginLeft:'auto', marginRight:'auto'
  },
  button:{
  }
});

export default Home;
