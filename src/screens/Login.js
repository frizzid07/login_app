import { StyleSheet, Text, TextInput, View, Image, Button, Pressable, Alert } from 'react-native'
import React from 'react'

// Images
import background from '../../assets/background.jpg';
import logo from '../../assets/logo.png';

// Common
import {submit} from '../common/button';
import {input} from '../common/input';

// Navigation
import Register from './Register';
import Landing from './Landing';

const Login = ({ navigation }) => {
  return (
    <View style = {styles.container}>
      <Image style={styles.bg} source={background}></Image>
      <View style = {styles.textContainer}>
        <Image style={styles.logo} source={logo}></Image>
        <Text style = {{fontSize: 25, color: '#000', marginBottom: 20}}>Login to your Account</Text>
        <TextInput style = {[input, {textTransform: 'lowercase'}]} placeholder="Email Address" keyboardType='email-address' />
        <TextInput style = {input} placeholder="Password" secureTextEntry={true} />
        <Text style={{fontSize: 15, color: '#000', marginTop: 10, marginBottom: 20}}>Don't have an account?&nbsp;
          <Text style={{color: '#004aad'}} onPress={() => navigation.navigate('Register')}>Register Now!</Text>
        </Text>
        <Pressable style={submit} onPress={() => navigation.navigate('Landing')}>
          <Text style={styles.text}>Login</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    bg: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
    },
    text: {
        fontSize: 25,
        color: '#000'
    },
    logo: {
        width: '40%',
        height: undefined,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: '#ffde59',
        borderRadius: 5,
        marginBottom: 40
    }
});