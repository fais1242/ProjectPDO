import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button, Image, Card, Divider, Icon} from 'react-native-elements';

const Home = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      {/* <Divider color="white" width={1.5} style={{marginHorizontal: 20}} /> */}

      <Card containerStyle={{borderRadius: 10, marginBottom: 10}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 3}}>
            <Text style={styles.textshow}>Name :</Text>
            <Text style={styles.textshow}>Company:</Text>
            <Text style={styles.textshow}>Email:</Text>
            <Text style={styles.textshow}>Phone:</Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row-reverse',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: 'https://icon-library.com/images/users-icon-png/users-icon-png-17.jpg',
              }}
              style={{width: wp('10%'), height: hp('5%')}}
            />
          </View>
        </View>
      </Card>

      <View style={{padding: 15}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <Button
            title="Scan QR code"
            onPress={() => navigation.navigate('Scanner')}
            containerStyle={{marginVertical: 10, marginHorizontal: 10}}
            buttonStyle={styles.butstyle}
            titleStyle={styles.textshow}
            iconPosition="top"
            icon={
              <Icon name="qrcode-scan" type="material-community" size={80} />
            }
          />

          <Button
            title="Production Order"
            onPress={() => navigation.navigate('Production')}
            containerStyle={{marginVertical: 10, marginHorizontal: 10}}
            buttonStyle={styles.butstyle}
            titleStyle={styles.textshow}
            iconPosition="top"
            icon={
              <Icon
                name="clipboard-text-outline"
                type="material-community"
                size={80}
              />
            }
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginBottom: 30,
          }}>
          <Button
            title="History"
            onPress={() => navigation.navigate('History')}
            containerStyle={{marginVertical: 10, marginHorizontal: 10}}
            buttonStyle={{
              width: wp('85%'),
              height: hp('25%'),
              borderRadius: 20,
              backgroundColor: 'white',
            }}
            titleStyle={styles.textshow}
            iconPosition="top"
            icon={<Icon name="history" type="material-community" size={80} />}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#FFB23E',
  },
  stext: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  butstyle: {
    width: wp('40%'),
    height: hp('25%'),
    borderRadius: 20,
    backgroundColor: 'white',
  },
  textshow: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
  },
});

export default Home;
