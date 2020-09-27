import * as React from 'react';
import { Button, View, Text, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createBottomTabNavigator,
    BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { useSafeArea, SafeAreaProvider } from "react-native-safe-area-context";

import { TabBar } from "../components/BottomMenu/TabBar";

import SplashScreen from "./SplashScreen";
import Signin from "./Signin";
import Home from "./Home";
import { Shipment } from "./Shipment";
import { Inventory } from "./Inventory";
import Profile from "./Profile";
import { Scan } from "./Scan";
import Create_Shipment from "./Create_Shipment";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomePage = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="HOMEPAGE">
            <Stack.Screen name="HOMEPAGE" component={Home} />
            <Stack.Screen name="Create_Shipment" component={Create_Shipment} />
        </Stack.Navigator>
    )
}

const HomeScreen = () => {
    return (
        <View style={{ flex: 1, position: "relative" }}>
            <Tab.Navigator
                tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
                <Tab.Screen name="HOME" component={HomePage} />
                <Tab.Screen name="SHIPMENT" component={Shipment} />
                <Tab.Screen name="SCAN" component={Scan} />
                <Tab.Screen name="INVENTORY" component={Inventory} />
                <Tab.Screen name="PROFILE" component={Profile} />
            </Tab.Navigator>
            {useSafeArea().bottom > 0 && (
                <View
                    style={{
                        height: useSafeArea().bottom - 5,
                        backgroundColor: "white",
                    }}
                />
            )}
        </View>
    );
};

const Auth = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Signin">
            <Stack.Screen name="Signin" component={Signin} />
        </Stack.Navigator>
    );
}

function Routes() {
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName="SplashScreen">
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    <Stack.Screen name="Auth" component={Auth} />
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                </Stack.Navigator>
            </SafeAreaProvider>
        </NavigationContainer>
    );
}

export default Routes;