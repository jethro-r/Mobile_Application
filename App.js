import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import colors from "./src/config/colors";

import HomeScreen from "./Pages/HomeScreen";
import RegisterUser from "./Pages/RegisterUser";
import AccountScreen from "./Pages/AccountScreen";
import CartScreen from "./Pages/CartScreen";
import LoginScreen from "./Pages/LoginScreen";
import CategoriesScreen from "./Pages/CategoriesScreen";
import { DatabaseConnection } from "./src/Database/Database";

const db = DatabaseConnection.getConnection();

export default function App({ route, navigation }) {
  
  const CategoryStack = createNativeStackNavigator();
  const AppStack = createNativeStackNavigator();
  const CartStack = createNativeStackNavigator();
  const BottomTab = createBottomTabNavigator();
  const [userToken, setUserToken] = useState("hi");

  
  function MainApp({ navigation }) {
    return (
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.black,
          tabBarActiveBackgroundColor: colors.black,
          tabBarInactiveBackgroundColor: colors.primary,
          headerShown: false,
          tabBarLabelStyle: {
            fontFamily: "Roboto",
            fontSize: 12,
          },
        }}
      >
        <BottomTab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size * 1.25} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="CategoriesScreen"
          tab
          component={CategoriesStackScreen}
          options={{
            tabBarLabel: "Categories",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="list-alt" size={size} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="CartScreen"
          component={CartStackScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="shopping-cart" size={size} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            tabBarLabel: "Account",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={size * 1.25}
                color={color}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  }

  function CategoriesStackScreen() {
    return (
      <CategoryStack.Navigator>
        <CategoryStack.Screen
          name="Holding for later"
          component={CategoriesScreen}
        />
      </CategoryStack.Navigator>
    );
  }
  function CartStackScreen() {
    return (
      <CartStack.Navigator>
        <CartStack.Screen name="Cart" component={CartScreen} />
      </CartStack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: "Roboto",
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerTitle: "Pak'n'Save",
          headerBackground: () => (
            <View style={{ flex: 1, backgroundColor: colors.primary }} />
          ),
        }}
      >
        {userToken == null ? (
          <>
            <AppStack.Screen
              name="Login"
              component={LoginScreen}
              initialParams={{ setUserToken }}
            />
            <AppStack.Screen
              name="Register"
              component={RegisterUser}
              initialParams={{ setUserToken }}
            />
          </>
        ) : (
          <AppStack.Screen name="MainApp" component={MainApp} />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
