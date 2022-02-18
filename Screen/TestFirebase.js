import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';


const TestFirebase =  (navigation)  => {

const user =  firestore().collection('Users').doc('S26dG3O2cMzNND1lclW6').get()
console.log(user);

firestore()
  .collection('Users')
  .doc('691')
  .get()
  .then(documentSnapshot => {
    console.log(documentSnapshot.data());

    // if (documentSnapshot.exists) {
    //   console.log('User data: ', documentSnapshot.data());
    // }
  });

// firestore()
//   .collection('Users')
//   .add({
//     name: 'Ada Lovelace',
//     age: 30,
//   })
//   .then(() => {
//     console.log('User added!');
//   });


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
