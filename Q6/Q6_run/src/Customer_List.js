import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text,SafeAreaView,Button,FlatList,TouchableOpacity} from "react-native"
import Styles from "./Styles";

const Customer_List = ({navigation}) => {
    const [data, setData] = useState([])

    const fetchData = async () => {
        const value = await AsyncStorage.getItem('token');
        console.log(value)
        await fetch( 'https://kami-backend-5rs0.onrender.com/customers', {
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
                console.log("d: ", d._id)
                d.map((item) => {
                    console.log(item);
                })
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {


        fetchData();
    }
        , []);
        const Item = ({ title }) => (
            <Text style={Styles.input}>
            <View>
              <TouchableOpacity  onPress={()=> navigation.navigate('Service_Details', {_id:title._id})}>
                <Text style={Styles.script}>Customer: {title.name}</Text>
                <Text style={Styles.script}>Phone:{title.phone}</Text>
                <Text styles={Styles.script}>Total money :{title.totalSpent}</Text>
                </TouchableOpacity>
            </View>
            </Text>
        );
        return (
            // <ScrollView showsVerticalScrollIndicator= {false}>
    
            <SafeAreaView style={Styles.container}>
                <Text style={Styles.title}>Huyen Trinh</Text>
                <Text style={Styles.script}>Danh sach cac dich vu</Text>
                <Button style={Styles.button}
                        title="+"
                        onPress={() => navigation.navigate('Customer_Add')}/>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Item title={item} />}
                    keyExtractor={item => item._id}
                />
            </SafeAreaView>
            // </ScrollView>
        );
    };
export default Customer_List;