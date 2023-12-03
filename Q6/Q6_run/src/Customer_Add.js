
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, TextInput, TouchableOpacity,Alert } from 'react-native'
import Styles from './Styles'

const Customer_Add = () => {
    const [ data, setData ] = useState([])
    const [ name, setName ] = useState('')
    const [ phone, setPhone ] = useState('')
     async function  fetchData() {
        const value = await AsyncStorage.getItem('token')
        console.log(value);
        await fetch('https://kami-backend-5rs0.onrender.com/customers', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${value}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                phone: phone,
               
                name: name,
            }),
        })
            .then(res => res.json())
            .then(async data => {
                console.log(data)
            })
            
            .catch(error => { console.log(error) });
        Alert.alert('Add successfully');
    }
    return (
        <View>
            <Text>Customer name *</Text>
            <TextInput
                style={Styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Input your customer's name"
            />
            <Text>Phone *</Text>
            <TextInput
                styles={Styles.input}
                keyboardType='numeric'
                onChangeText={setPhone}
                value={phone}
                placeholder="Input phone number "
            />
            <TouchableOpacity
                style={Styles.button}
                onPress={fetchData}>
                <Text>Add</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Customer_Add;