import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const StartScreen = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#FFB970' barStyle="light-content"/>
          <View style={styles.header1}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/LogoSAP.png')}
            style={styles.logo1}
            resizeMode="stretch"
            />
          </View>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/logo2.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <View style={styles.text_header}>
            <Text style={styles.text_header}>By Design</Text>
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Stay connected with Production!</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default StartScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#FFB970'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -15,
        height: hp('20%'),
        width: wp('100%'),
        flex:1
    },
    header1: {
        marginLeft: wp('75%'),
    },
    text_header: {
        color:'#fff',
        marginVertical:35,
        marginLeft: 20,
        fontSize:20
    },
    footer: {
        // height: hp('35%'),
        // width: wp('100%'),
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 25,
        flex:1
    },
    logo: {
      height: hp('18%'),
      width: wp('90%') 
    },
    logo1: {
        height: hp('5%'),
        width: wp('20%') 
      },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop:'15%',
    },
    signIn: {
        height: hp('5%'),
        width: wp('35%'), 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        // fontWeight: 'bold'
    }
  });