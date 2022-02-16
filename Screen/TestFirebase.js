import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';





const TestFirebase = async (navigation)  => {

const user = await firestore().collection('Users').doc('MnfAU1GXyBxxq5tNWM5L').get()
console.log(user);


  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>GGGGGGGGG</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestFirebase;
