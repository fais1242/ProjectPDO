import { View, Text, ScrollView, StyleSheet, InputAccessoryView } from 'react-native';
import { Button, Image, Card, Divider, Icon} from 'react-native-elements';
import React from 'react';

const ProductionConfirm = () => {
  return (
    <ScrollView style={styles.container}>
        <Divider color='white' width={1.5}/>
        <Card containerStyle={{borderRadius:10, marginBottom:10}}>

        <View style={{flex:1}}>
            <Text style={styles.stext}>
                Output Production Quantity
            </Text>

        <Card containerStyle={styles.cardstyle}
        
        />
        </View>

        <View style={{flex:1, flexDirection:'row'}}>



        <Card containerStyle={styles.cardstyle}
        
        />
        </View>

        <View style={{flex:1, flexDirection:'row'}}>
        
        <Card containerStyle={styles.cardstyle}
        
        />
        </View>

        <View style={{flex:1, flexDirection:'row'}}>
        
        <Card containerStyle={styles.cardstyle}
        
        />
        </View>

        <View style={{flex:1, flexDirection:'row'}}>
       
        <Card containerStyle={styles.cardstyle}
        
        />
        </View>
        
        <View style={{flex:1, flexDirection:'row'}}>
        
        <Card containerStyle={styles.cardstyle}
        
        />

        </View>

        <Button
        raised
        title= "Submit"
        onPress={() => navigation.navigate('ProductionConfirm')}
        containerStyle = {{marginVertical: 10, marginHorizontal:10}}  
        buttonStyle={{backgroundColor:'green', borderRadius:7}}
        titleStyle={{fontSize:20}}
      />

       </Card>


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
      fontSize: 20,
      marginLeft:15
    },
    textshow:{
      fontSize:20, 
      color:'black'
    },
    cardstyle:{
      borderRadius:5, 
      marginBottom:10, 
      backgroundColor:'#EEF1F3',
      flex:1
    }
  });

export default ProductionConfirm;
