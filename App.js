import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Image } from "react-native";

import LoginScreen from "./src/screens/Login";
import SignUpScreen from "./src/screens/SignUp";
import HomeScreen from "./src/screens/Home";
import InboxScreen from "./src/screens/Inbox";
import SettingsScreen from "./src/screens/Settings";
import SendMoney from "./src/screens/SendMoney";

import { IconLogo } from "./src/constants/IconLogo";
import { Colors } from "./src/constants/Colors";

import { AuthProvider } from "./provider/UserProvider";
import CashOut from "./src/screens/CashOut";
import RequestMoney from "./src/screens/RequestMoney";
import MoneyMap from "./src/screens/MoneyMap";
import MoneyMapping from "./src/screens/MoneyMapping";
import SavingsScreen from "./src/screens/SavingsScreen";
import { MaterialIcons } from "@expo/vector-icons";
import ScannerScreen from "./src/screens/ScannerScreen";
import TransactionScreen from "./src/screens/TransactionScreen";
import QRScanner from "./src/components/QRScanner";
// import QRScannerTab from "./src/components/QRScanner";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: Colors.bg,
                    borderTopColor: Colors.bg,
                    borderTopWidth: 0,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={IconLogo.home}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? Colors.brand : "gray",
                            }}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Scanner"
                component={QRScanner}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons
                            name="qr-code-scanner"
                            size={24}
                            color={focused ? Colors.brand : "gray"}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Inbox"
                component={InboxScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={IconLogo.inbox}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? Colors.brand : "gray",
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={IconLogo.settings}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? Colors.brand : "gray",
                            }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <>
            <NavigationContainer>
                <AuthProvider>
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="Send"
                            component={SendMoney}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="CashOut"
                            component={CashOut}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="Request"
                            component={RequestMoney}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="Map"
                            component={MoneyMap}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="Save"
                            component={SavingsScreen}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="Transaction"
                            component={TransactionScreen}
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="SignUp"
                            component={SignUpScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="HomeTabs"
                            component={TabNavigator}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </AuthProvider>
            </NavigationContainer>
        </>
    );
}
