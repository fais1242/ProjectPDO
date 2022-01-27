import React, ( Componant ) from "react"
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native'
import { ThemeProvider, Button, Input, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'


class AddUserScreen extends Componant{
    constructor() {
        super();

    }

    render() {
        return(
            <ThemeProvider theme={theme}>
                <ScrollView style={style.container}>
                    <Image 
                        source={{ uri: 'https://image.pngaaa.com/930/2507930-middle.png'}}
                        style={{ width: 200, height: 200 }}
                        containerStyle={{marginLeft: 'auto', marginRight: 'auto'}} 
                    />
                    <Input 
                        leftIcon={
                            <Icon 
                                name='user-o'
                                size={20}
                                color='#0085E6'
                            />
                        }
                        placeholder={'Name'}
                        />
                    <Input
                        leftIcon={    
                            <Icon 
                                name='envelope-o'
                                size={20}
                                color='#0085E6'
                            />
                        }
                        placeholder={'Email'}
                    />
                    <Input
                        leftIcon={    
                            <Icon 
                                name='mobile'
                                size={30}
                                color='#0085E6'
                            />
                        }
                        placeholder={'Mobile'}
                    />
                    <Button
                        icon={
                            <Icon
                                name='check'
                                size='15'
                                color='#white'
                            />
                        }
                        title='  Add User'
                        buttonStyle={{
                            backgroundColor: "green"
                        }}
                    />
                     <Button
                        icon={
                            <Icon
                                name='users'
                                size='15'
                                color='#white'
                            />
                        }
                        title='  Go to User list'
                        onPress={() => this.props.navigation.navigate('UserScreen')}
                        containerStyle={{
                            marginTop: 10
                        }}
                    />
                    <Button
                        icon={
                            <Icon
                                name='users'
                                size='15'
                                color='#white'
                            />
                        }
                        title='  Go to User Detail'
                        onPress={() => this.props.navigation.navigate('UserDetailScreen')}
                        containerStyle={{
                            marginTop: 10
                        }}
                    />
                </ScrollView>
            </ThemeProvider>
        )
    }
}
const theme ={
    Button: {
        raised: true
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    preloader: {
        position: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItem: 'center'
        justifyContent: 'center'
    }
})

export default AddUserScreen;