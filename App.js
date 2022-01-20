import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scanner from './Screen/Scanner';
import ProductionOrder from './Screen/ProductionOrder';
import History from './Screen/History';
import Login from './Screen/Login';

function HomeScreen({ navigation }) {
  return (
    <View style={ styles.container }>

    <ScrollView>

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

    </ScrollView>

    </View>
    
  );
}

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create ({
  container:{
    flex: 1,  
    padding:35,
    backgroundColor: 'lightblue'
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

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={Scanner}  />
        <Stack.Screen name="Production" component={ProductionOrder}/>
        <Stack.Screen name="History" component={History}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
