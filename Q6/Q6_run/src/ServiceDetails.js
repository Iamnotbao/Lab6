import React, { useState, useEffect } from "react";
import Styles from './Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, FlatList, View, Text, Alert } from "react-native";
import { Button, Card } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Service_Details = ({ navigation }) => {
    const route = useRoute();
    const [data, setData] = useState([]);
    const { _id } = route.params;
    console.log(_id)
    const fetchData = async () => {
        const value = await AsyncStorage.getItem('token');
        console.log(value)
        await fetch(`https://kami-backend-5rs0.onrender.com/services/${_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${value}`,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((d) => {
                setData(d)
                console.log("d: ", d)
                setIsLoading(false)
                d.map((item) => {
                    console.log(item);
                })
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false)
            });
    };

    useEffect(() => {


        fetchData();
    }
        , []);

    const Delete = async () => {
        await fetch(`https://kami-backend-5rs0.onrender.com/services/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('NetWork response was not ok')
                }
                Alert.alert("Delete Succesfull!!!");
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }


    const Item = ({ title }) => {
        return (
            <View>
                <Text style={{ color: 'red' }}>{title} </Text>
            </View>
        )
    };
    return (
        <SafeAreaView style={Styles.container}>
            <Text>Service name :{data.name}</Text>
            <Text>Price: {data.price}</Text>
            {/* <Text>Creator : {data.user.name}</Text>*/}
            <Text>Time: {data.createdAt}</Text>
            <Text>Final update: {data.updatedAt}</Text>
            <TouchableOpacity style={Styles.button}
                onPress={Delete}>
                <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.button}
                onPress={() => navigation.navigate('Service_Edit', { _id:data._id })}>
                <Text>Update</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Service_Details;
