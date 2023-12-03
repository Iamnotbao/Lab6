import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import styles from './Styles';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({navigation}) => {




    async function LoginAcc() {
        await fetch('https://kami-backend-5rs0.onrender.com/auth', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                phone: '0373007856',
                password: '123'
            })
        })
            .then(response => response.json())
            .then(async data => {

                    console.log(data);
                    await AsyncStorage.setItem('token',data.token);
                    await navigation.navigate('Service');
            }
            )
            .catch(error => console.error(error));
    }


    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}

                        onPress={LoginAcc}>Login</Text>

                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};
export default LoginScreen;