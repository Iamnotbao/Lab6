import { useRoute } from "@react-navigation/native"
import React, { useState, useEffect } from "react"
import { View, Text,TextInput,Button, Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Styles from "./Styles"




const Service_Edit = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('0');
    const [data, setData] = useState([])
    const route = useRoute();
    const { _id } = route.params;
    console.log(_id)
    const fetchData = async () => {
        const value = await AsyncStorage.getItem('token');
        await fetch(`https://kami-backend-5rs0.onrender.com/services/${_id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${value}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: _id,
                name: name,
                price: price,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                Alert.alert('Update Successfully!!!')
            })
            .then((d) => {
                setData(d)
                console.log("c: ", d)
                d.map((item) => {
                    console.log(item);
                })
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    // useEffect(() => {


    //     fetchData();
    // }
    //     , []);


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
                title="Update"
                onPress={fetchData}
            />
        </View>

    )
}
export default Service_Edit;
