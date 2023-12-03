import React, { useState } from 'react'
import { View, TextInput, Alert, Text, Button } from 'react-native';
import Styles from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Services_Add = ({ navigation }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('0');



    async function Submit_Executed() {
        const value = await AsyncStorage.getItem('token');
        console.log(value);
        await fetch('https://kami-backend-5rs0.onrender.com/services', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${value}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                price: price,
            }),
        })
            .then(res => res.json())
            .then( async data => {
                 console.log(data)
                 await navigation.navigate('Homescreen')
            })
            .catch(error => { console.log(error) });
        Alert.alert('Add successfully');
    }
    return (
        <View style={Styles.container}>
            <Text>Service name *</Text>
            <TextInput
                style={Styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Input a service name"
            />
            <Text>Price*</Text>
            <TextInput
                style={Styles.input}
                onChangeText={setPrice}
                value={price}
                keyboardType="numeric"
            />
            <Button style={Styles.button}
                title="Add"
                onPress={Submit_Executed}
            />
        </View>
    )
}
export default Services_Add;