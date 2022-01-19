import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const App = () => {
  return(
    <View style={styles.container}>
      <Text style = {styles.text}>Hello fais</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    color: 'blue',
    fontSize: 30
  }
})
export default App;
