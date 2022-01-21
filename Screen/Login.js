import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { Button, Image } from 'react-native-elements';

const Login = ({navigation}) => {
  return (
   <View style = {styles.container}>
        <Text>
        <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
        containerStyle = {{marginVertical: 10}} 
      />
        </Text>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor: '#FFB23E'
  },
});

export default Login;
