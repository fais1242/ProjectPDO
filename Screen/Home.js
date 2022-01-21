import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Button, Image, Card } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';



const Home = ({navigation}) => {
  return (
    <ScrollView style={ styles.container }>

      <Card containerStyle={{borderRadius:5,marginBottom:10}}>

        <View style ={{flex:1, flexDirection:'row'}}>

          <View style={{flex:3,}}>
            <Text>
              Name :
            </Text>
            <Text>
              Company:
            </Text>
            <Text>
              Email:
            </Text>
            <Text>
              Phone:
            </Text>
            
          </View>

          <View style ={{flex:1, flexDirection:'row-reverse', justifyContent:'center',alignItems:'center'}}>

            <Image 
              source={{uri:'https://icon-library.com/images/users-icon-png/users-icon-png-17.jpg'}}
              style={{width:50,height:50}}
            />

          </View>

       </View>
      </Card>
    <View style = {{
      flexDirection:'row',
      paddingRight:5,
      paddingLeft:5
    }}>
    <Button
        title= "Scan QR code"
        onPress={() => navigation.navigate('Scanner')}
        containerStyle = {{marginVertical: 10, marginHorizontal:10}}  
        buttonStyle={{width:160, height:200, borderRadius:10}}
        
      />

  

       <Button
        title="Production Order"
        onPress={() => navigation.navigate('Production')}
        containerStyle = {{marginVertical: 10}}
        buttonStyle={{width:160, height:200, borderRadius:10}}
      />

    </View>

     <View style = {{
      flexDirection:'row',
      paddingRight:5,
      paddingLeft:5
    }}>
    <Button
        title= "History"
        onPress={() => navigation.navigate('History')}
        containerStyle = {{marginVertical: 10, marginHorizontal:10}}  
        buttonStyle={{width:160, height:200, borderRadius:10}}
      />

       <Button
        title="Log"
        onPress={() => navigation.navigate('Log')}
        type='outline'
        containerStyle = {{marginVertical: 10}}
        buttonStyle={{width:160, height:200, borderRadius:10, backgroundColor:'white',}}
        titleStyle={{color:'black'}}
      />
      
    </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create ({
  container:{
    flex: 1,
    padding:15,
    backgroundColor: '#FFB23E'
  },
  stext:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom:20,
    marginLeft:'auto', marginRight:'auto'
  },
});

export default Home;
