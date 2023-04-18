import { StyleSheet, Text, View, Image, Button, Pressable, Alert, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

// Images
import background from '../../assets/background.jpg';
import logo from '../../assets/logo.png';

// Common
import {submit} from '../common/button';
import {input} from '../common/input';

// Navigation
import Login from './Login';
import Landing from './Landing';
import Welcome from './Welcome';

const Register = ({ navigation }) => {
  return (
    <View style = {styles.container}>
      <Image style={styles.bg} source={background}></Image>
      <ScrollView contentContainerStyle = {styles.textContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Image style={styles.logo} source={logo} />
        </TouchableOpacity>
        <Text style = {[styles.text, {marginBottom: 35}]}>Register your Account</Text>
        <Text style = {[styles.text, {fontSize: 15, marginBottom: -5}]}>Name</Text>
        <View style = {styles.innerContainer}>
          <TextInput style = {[input, {flex: 1, minWidth: 100}]} placeholder="First Name" />
          <TextInput style = {[input, {flex: 1, minWidth: 100}]} placeholder="Last Name" />
        </View>
        <Text style = {[styles.text, {fontSize: 15, marginBottom: -5}]}>Date of Birth</Text>
        <View style = {styles.innerContainer}>
          <TextInput style = {[input, {flex: 2, minWidth: 50}]} placeholder="Month" keyboardType='number-pad' />
          <TextInput style = {[input, {flex: 2, minWidth: 50}]} placeholder="Day" keyboardType='number-pad' />
          <TextInput style = {[input, {flex: 3, minWidth: 100}]} placeholder="Year" keyboardType='number-pad' />
        </View>
        <TextInput style = {input} placeholder="Mobile Number" keyboardType='number-pad' />
        <TextInput style = {[input, {textTransform: 'lowercase'}]} placeholder="Email Address" keyboardType='email-address' />
        <TextInput style = {input} placeholder="Password" secureTextEntry={true} />
        <Text style={{fontSize: 15, color: '#000', marginTop: 10, marginBottom: 20}}>Already have an account?&nbsp;
          <Text style={{color: '#004aad'}} onPress={() => navigation.navigate('Login')}>Login instead!</Text>
        </Text>
        <Pressable style={submit} onPress={() => navigation.navigate('Landing')}>
          <Text style={styles.text}>Register</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
      width: '100%',
      height: '100%'
  },
  textContainer: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
      height: '100%'
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start'
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
      width: '20%',
      height: undefined,
      aspectRatio: 1,
      borderWidth: 1,
      borderColor: '#ffde59',
      borderRadius: 5,
      marginBottom: 20
  }
});