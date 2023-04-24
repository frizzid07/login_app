import { StyleSheet, Text, TextInput, View, Image, Button, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';

// Images
import background from '../../assets/background.jpg';
import logo from '../../assets/logo.png';

// Common
import {submit} from '../common/button';
import {input} from '../common/input';

const Verify = ({ navigation, route }) => {
    const { userdata } = route.params;

    const [errormsg, setErrormsg] = useState(null);
    const [userCode, setUserCode] = useState('XXXX');
    const [actualCode, setActualCode] = useState(null);

    useEffect(() => {
        setActualCode(userdata[0]?.VerificationCode);
    }, [])

    const Sendtobackend = () => {
        if (userCode == 'XXXX' || userCode == '') {
            setErrormsg('Please enter the code');
            return;
        }

        else if (userCode == actualCode) {
            const fdata = {
                firstName: userdata[0]?.firstName,
                lastName: userdata[0]?.lastName,
                dayOfBirth: userdata[0]?.dayOfBirth,
                monthOfBirth: userdata[0]?.monthOfBirth,
                yearOfBirth: userdata[0]?.yearOfBirth,
                mobileNumber: userdata[0]?.mobileNumber,
                email: userdata[0]?.email,
                password: userdata[0]?.password
            }

            fetch('http://10.8.13.159:'+process.env.PORT+'/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fdata)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message === 'User Registered Successfully') {
                        alert(data.message);
                        navigation.navigate('login')
                    }
                    else {
                        alert("Something went wrong !! Try Signing Up Again");
                    }
                }).catch((error) => {
                    // Handle any errors that occur
                    console.error(error);
                });
        }
        else if (userCode != actualCode) {
            setErrormsg('Incorrect code');
            return;
        }
    }
    return (
        <View style = {styles.container}>
            <Image style={styles.bg} source={background} />
            <View style = {styles.textContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                    <Image style={styles.logo} source={logo} />
                </TouchableOpacity>
                <Text style = {styles.text}>Verify your Email</Text>
                <Text style = {[styles.text, {fontSize: 15}]}>A code has been sent to your email!</Text>
                {
                    errormsg ? <Text style={[styles.text, {color: red}]}>{errormsg}</Text> : null
                }
                <Text style = {[styles.text, {fontSize: 15, marginTop: 30}]}>Code</Text>
                <TextInput style={input} placeholder="Enter 6-digit Verification Code" secureTextEntry={true} onChangeText={(text) => setUserCode(text)} onPressIn={() => setErrormsg(null)} />
                <Text style={{fontSize: 15, color: '#000', marginTop: 10, marginBottom: 20}}>Want to Login with another account?&nbsp;
                    <Text style={{color: '#004aad'}} onPress={() => navigation.navigate('Login')}>Go to Login Page!</Text>
                </Text>
                <Text style={{fontSize: 15, color: '#000', marginTop: 10, marginBottom: 20}}>Do not have an account?&nbsp;
                    <Text style={{color: '#004aad'}} onPress={() => navigation.navigate('Register')}>Register a new account!</Text>
                </Text>
                <Pressable style={submit} onPress={() => {Sendtobackend()}}>
                    <Text style={styles.text}>Verify</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Verify

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