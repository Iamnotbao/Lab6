import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Styles from './Styles'
import { FlatList } from 'react-native-gesture-handler'

const Transaction_Detail = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [price, setPrice] = useState(0);
    const [price_After_Discount,setPriceAfterDiscount]=useState(0);
    // const [price,setPrice]=useState(0)
    // const [price_after_discount,setPriceAfterDiscount]=useState(0)
    const route = useRoute();
    const { _id } = route.params;

    console.log(_id);
    const fetchData = async () => {
        const value = await AsyncStorage.getItem('token');
        console.log(value);
        await fetch(`https://kami-backend-5rs0.onrender.com/transactions/${_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer:${value}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Network was not ok ~~')
            }
            return response.json();
        }).then(async data => {
            setData(data);
            setIsLoading(false);
            setPrice(data.price);
            setPriceAfterDiscount(data.priceBeforePromotion);
            console.log(data);
            // setPriceAfterDiscount(d.priceBeforePromotion);

        }).catch((error) => {
            console.error("Fetching error", error)
            setIsLoading(false)
        })
    }
    useEffect(() => {
        fetchData();


    }, [])
    const Gen = ({ item }) => {
        return (
            <View>
                <Text style={Styles.input}>ok</Text>
            </View>
        )
    }

    const Gen2 = () => {
        return (
            <View>
                <Text style={Styles.input}>lala</Text>
            </View>
        )
    }


    return (
        <View>

            <Text style={Styles.input}>
                <View>
                    <Text style={Styles.subTitle}>General information</Text>
                    <Text>Transaction code                                                      <Text >{data.id}</Text></Text>
                    <Text>Customer                                                                  <Text>{data._id}</Text></Text>
                    <Text> Creation time                                        <Text>{data.createdAt}</Text></Text>
                </View>
            </Text>

            <Text style={Styles.input}>
                <View>
                    <Text style={Styles.subTitle}>Services list</Text>
                    <View>
                        {isLoading ? <Text>Loading...</Text> : data.services ? data.services.map((service, index) => (
                            <Text key={index}>- {service.name} <Text>x{service.quantity}  <Text style={Styles.priceStyle}>{service.price}đ</Text></Text></Text>
                        )) : null}
                        <Text style={Styles.script}>Customer:  {isLoading ? <Text>Loading...</Text> : data.customer.name ? <Text>{data.customer.name}</Text> : null}</Text>
                    </View>
                    <Text>Total                                                              <Text>{data.priceBeforePromotion}đ </Text></Text>
                </View>
            </Text>

            <Text style={Styles.input}>
                <View>
                    <Text style={Styles.subTitle}>Cost</Text>
                    <Text>Amount of money                                                     <Text >{data.priceBeforePromotion}đ</Text></Text>
                    <Text>Discount                                                                  <Text>-{price-price_After_Discount}đ</Text></Text>
                    <Text> Total Payment                                        <Text>{data.createdAt}</Text></Text>
                </View>
            </Text>

        </View>
        //     <View>
        //         {isLoading ? <Text>Loading...</Text> : data.customer.name ? <Text>{data.customer.name}</Text> : null}
        //     </View>
    )
}
export default Transaction_Detail;