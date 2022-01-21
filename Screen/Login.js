import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';

const Login = () => {
  return (
   <View style = {styles.container}>
        <Text>
          Login
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
