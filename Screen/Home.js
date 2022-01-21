import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Button, Image, Card } from 'react-native-elements';


const Home = ({navigation}) => {
  return (
    <ScrollView style={ styles.container }>
      <View>
        
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
        title="Log"
        onPress={() => navigation.navigate('Login')}
        containerStyle = {{marginVertical: 10}} 
      />


    </ScrollView>
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
