import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import { SafeAreaView, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import styles from './Styles';
import { Button } from "react-native-paper";
import Styles from "./Styles";



const Homescreen = ({ navigation }) => {
    const [data, setData] = useState([])
    const filePath = 'https://kami-backend-5rs0.onrender.com/services'
    useEffect(() => {
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('NetWork response was not ok')
                }
                return response.json();
            })
            .then((d) => {
                console.log(d);


                setData(d);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);




    const Item = ({ title }) => {
        return (
            <Text style={Styles.input}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Service_Details', { _id: title._id })}>
                        <Text style={Styles.script}>{title.name}</Text>
                        <Text style={Styles.priceStyle}>{title.price}</Text>
                    </TouchableOpacity>
                </View>
            </Text>
        )

    };
    return (
        // <ScrollView showsVerticalScrollIndicator= {false}>

        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Huyen Trinh</Text>
            <Text style={styles.script}>Danh sach cac dich vu</Text>
            <TouchableOpacity style={Styles.button}
                onPress={() => navigation.navigate('Services')}>
                <Text>+</Text>
            </TouchableOpacity>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item title={item} />}
                keyExtractor={item => item._id}
            />
        </SafeAreaView>
        // </ScrollView>
    );
};
export default Homescreen;