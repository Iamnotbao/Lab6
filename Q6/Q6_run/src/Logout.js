import React from "react"
import { View, Text, TouchableOpacity } from 'react-native'
import Styles from "./Styles"

const Logout = ({ navigation }) => {
    return (
        <View>
            <TouchableOpacity
                style={Styles.button}
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Logout;