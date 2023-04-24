import { StyleSheet, Text, TextInput, View, Image, Button, Pressable, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

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
  const [fdata, setFdata] = useState({
    email: '',
    password: ''
  })

  const [errormsg, setErrormsg] = useState(null);

  const Sendtobackend = () => {
    // console.log(fdata);
    if (fdata.email == '' || fdata.password == '') {
        setErrormsg('All fields are required');
        return;
    }
    else {
        fetch('http://10.8.13.159:'+process.env.PORT+'/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fdata)
        })
            .then(res => res.json()).then(
                data => {
                    // console.log(data);
                    if (data.error) {
                        setErrormsg(data.error);
                    }
                    else {
                        alert('logged successfully');
                        navigation.navigate('homepage');
                    }
                }
            ).catch((error) => {
              // Handle any errors that occur
              console.error(error);
          });
    }
  }

  return (
    <View style = {styles.container}>
      <Image style={styles.bg} source={background}></Image>
      <View style = {styles.textContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Image style={styles.logo} source={logo} />
        </TouchableOpacity>
        <Text style = {{fontSize: 25, color: '#000', marginBottom: 20}}>Login to your Account</Text>
        {
          errormsg ? <Text style={[styles.text, {color: red}]}>{errormsg}</Text> : null
        }
        <TextInput style = {[input, {textTransform: 'lowercase'}]} placeholder="Email Address" keyboardType='email-address' onPressIn={() => setErrormsg(null)}
        onChangeText={(text) => setFdata({ ...fdata, email: text })}/>
        <TextInput style = {input} placeholder="Password" secureTextEntry={true} onChangeText={(text) => setFdata({ ...fdata, password: text })}
        onPressIn={() => setErrormsg(null)} />
        <Text style={{fontSize: 15, color: '#000', marginTop: 10, marginBottom: 20}}>Don't have an account?&nbsp;
          <Text style={{color: '#004aad'}} onPress={() => navigation.navigate('Register')}>Register Now!</Text>
        </Text>
        <Pressable style={submit} onPress={() => {Sendtobackend()}}>
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