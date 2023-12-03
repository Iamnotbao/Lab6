import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import 'react-native-gesture-handler';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import Homescreen from './HomeScreen';
import LoginScreen from './Login';
import Services_Add from './Services';
import Service_Details from './ServiceDetails';
import Service_Edit from './Service_Update';
import Logout from './Logout';
import Customer_List from './Customer_List';
import Customer_Add from './Customer_Add';
import Transaction_List from './Transaction_List';
import Transaction_Detail from './Transaction_Detail';

const Stack = createStackNavigator();
// funtion LoginScreen() {
//     return(
//         <Tab.Navigator
//         initialRouteName="LoginScreen"
//         ScreenOptions={
//             headerShown:true
//         }
//         >
//         </Tab.Navigator>
//     )
//     };
function LoginScreens() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            activeColor="#e91e63"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}

        >
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}

            />
            <Stack.Screen
                name="Service"
                component={MyTabs}

            />

        </Stack.Navigator>
    )
}
function HomeScreen_Run() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            activeColor="#e91e63"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Homescreen"
                component={Homescreen}
            />
            <Stack.Screen
                name="Services"
                component={Services_Add} />
            <Stack.Screen
                name="Service_Details"
                component={Service_Details} />
            <Stack.Screen
                name="Service_Edit"
                component={Service_Edit}
            />

        </Stack.Navigator>
    )
}
function Logout_Run() {
    return (
        <Stack.Navigator
            initialRouteName="Logout"
            activeColor="#e91e63"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Setting"
                component={Logout}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreens}
            />
        </Stack.Navigator>


    )
}
function Customer_Run() {
    return (
        <Stack.Navigator
            initialRouteName="Customer"
            activeColor="#e91e63"
            abelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen
                name="Customer_List"
                component={Customer_List}
            />
            <Stack.Screen
                name="Customer_Add"
                component={Customer_Add} />
        </Stack.Navigator>

    )
}
function Transaction_Run(){
    return (
        <Stack.Navigator
            initialRouteName="Transaction"
            activeColor="#e91e63"
            abelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
            screenOptions={{
                headerShown: false
            }}>
                 <Stack.Screen
                name="Transaction_List"
                component={Transaction_List}
            />
            <Stack.Screen
            name="Transaction_Detail"
            component={Transaction_Detail}
            />

            
                </Stack.Navigator>
    )
}

const Tab = createMaterialBottomTabNavigator();
function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Service"
            barStyle={{ backgroundColor: "blue" }}
        // labeled={false}
        // activeTintColor={"greyLight"}
        // inactiveColor={"greyDark"}
        >
            <Tab.Screen name="Home"
                component={HomeScreen_Run}
                options={{
                    tabBarIcon: 'format-list-bulleted',
                }}
            />
            <Tab.Screen
                name="Transaction"
                component={Transaction_Run}
            />
            <Tab.Screen
                name="Customer"
                component={Customer_Run}
            />
            <Tab.Screen
                name="Setting"
                component={Logout_Run}
            />
        </Tab.Navigator>
    )
}
const App_run = () => {
    return (
        <NavigationContainer>
            <LoginScreens />
        </NavigationContainer>
    );
}
export default App_run;