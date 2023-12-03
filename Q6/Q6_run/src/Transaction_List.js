import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { Text, View, FlatList,TouchableOpacity } from 'react-native'
import Styles from './Styles'

const Transaction_List = ({navigation}) => {
    const [data, SetData] = useState([])
    const fetchData = async () => {
        const value = await AsyncStorage.getItem('Token');
        console.log(value);
        await fetch('https://kami-backend-5rs0.onrender.com/transactions', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer:${value}`,
                'ConTent-Type': 'application/json'
            },
        }).then(res => res.json())
            .then((d) => {
                SetData(d)
                console.log(d)
            }).catch((error) => { console.error("Fetching error:", error) })
    }
    useEffect(() => {
        fetchData();
    }, []
    )
    const Item = ({ item }) => {
        return (
            <Text style={Styles.input}>
                <View>
                <TouchableOpacity
                onPress={() => navigation.navigate('Transaction_Detail', {_id:item._id})}
                >
                    <Text style={Styles.script}>{item.id}- {item.createdAt}</Text>
                    <Text style={Styles.priceStyle}>{item.price}đ</Text>
                    {item.services.map((service, index) => (
                        <Text key={index}>- {service.name}</Text>
                    ))}
                    <Text style={Styles.script}>Customer: {item.customer.name}</Text>
                    </TouchableOpacity>
                </View>

            </Text>
        )
    }
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <Item item={item} />}
            />

        </View>

    )
}

export default Transaction_List;