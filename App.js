import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer, useIsFocused, CommonActions } from "@react-navigation/native";
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
import ProductScreen from "./Pages/ProductScreen";

const db = DatabaseConnection.getConnection();

export default function App({ route, navigation }) {
  const enterProducts = [
    {
      productName: "Milk",
      price: 3.5,
      description:
        "Fresh, whole milk from grass-fed cows. Perfect for drinking, cooking, or baking.",
      pictureURL: require("./assets/dbImages/milk.jpg"),
    },
    {
      productName: "Bread",
      price: 2.99,
      description:
        "Soft and delicious white bread. Great for sandwiches, toast, or dipping in soup.",
      pictureURL: require("./assets/dbImages/bread.jpg"),
    },
    {
      productName: "Eggs",
      price: 4.5,
      description:
        "Large, free-range eggs from happy chickens. Great for breakfast or baking.",
      pictureURL: require("./assets/dbImages/eggs.jpg"),
    },
    {
      productName: "Cheese",
      price: 6.99,
      description:
        "Sharp cheddar cheese, aged to perfection. Perfect for snacking or grating over pasta.",
      pictureURL: require("./assets/dbImages/cheese.jpg"),
    },
    {
      productName: "Apples",
      price: 2.5,
      description:
        "Crisp, juicy apples from local orchards. Great for snacking, cooking, or making cider.",
      pictureURL: require("./assets/dbImages/apples.jpg"),
    },
    {
      productName: "Beef",
      price: 12.99,
      description:
        "Premium, grass-fed beef. Great for grilling, roasting, or making stews.",
      pictureURL: require("./assets/dbImages/beef.jpg"),
    },
    {
      productName: "Potatoes",
      price: 1.99,
      description:
        "Fresh, locally-grown potatoes. Great for boiling, baking, or making chips.",
      pictureURL: require("./assets/dbImages/potatoes.jpg"),
    },
    {
      productName: "Yogurt",
      price: 4.25,
      description:
        "Creamy, probiotic yogurt made from organic milk. Perfect for breakfast or snacking.",
      pictureURL: require("./assets/dbImages/yogurt.jpg"),
    },
    {
      productName: "Carrots",
      price: 1.5,
      description:
        "Sweet, crunchy carrots. Great for salads, roasting, or snacking.",
      pictureURL: require("./assets/dbImages/carrots.jpg"),
    },
    {
      productName: "Salmon",
      price: 15.99,
      description:
        "Fresh, sustainably-raised salmon. Great for grilling, baking, or making sushi.",
      pictureURL: require("./assets/dbImages/salmon.jpg"),
    },
    {
      productName: "Oranges",
      price: 3.99,
      description:
        "Juicy, sweet oranges. Great for snacking, juicing, or making marmalade.",
      pictureURL: require("./assets/dbImages/orange.jpg"),
    },
    {
      productName: "Chicken",
      price: 8.99,
      description:
        "Tender, organic chicken. Great for roasting, grilling, or making soup.",
      pictureURL: require("./assets/dbImages/chicken.jpg"),
    },
    {
      productName: "Coca-Cola",
      price: 2.5,
      description:
        "Classic carbonated soft drink made with natural flavors and caffeine.",
      pictureURL: require("./assets/dbImages/coke.jpg"),
    },
    {
      productName: "Sprite",
      price: 2.5,
      description: "Refreshing lemon-lime flavored carbonated soft drink.",
      pictureURL: require("./assets/dbImages/sprite.jpg"),
    },
    {
      productName: "Orange Juice",
      price: 4.5,
      description:
        "Freshly squeezed orange juice, packed with vitamin C and natural sweetness.",
      pictureURL: require("./assets/dbImages/orange-juice.jpg"),
    },

    {
      productName: "Broccoli",
      price: 3.5,
      description:
        "Nutritious and delicious, broccoli is great steamed, roasted, or stir-fried.",
      pictureURL: require("./assets/dbImages/broccoli.jpg"),
    },
    {
      productName: "Spinach",
      price: 2.99,
      description:
        "Packed with iron and other nutrients, spinach is great in salads, smoothies, or cooked dishes.",
      pictureURL: require("./assets/dbImages/spinach.jpg"),
    },
    {
      productName: "Cauliflower",
      price: 3.99,
      description:
        "Mild and versatile, cauliflower is great roasted, mashed, or in soups.",
      pictureURL: require("./assets/dbImages/cauliflower.jpg"),
    },
    {
      productName: "Frozen Peas",
      price: 2.5,
      description:
        "Sweet and tender green peas, great for adding to stir-fries, soups, or as a side dish.",
      pictureURL: require("./assets/dbImages/frozen-peas.jpg"),
    },
    {
      productName: "Frozen Mixed Vegetables",
      price: 3.99,
      description:
        "A convenient blend of green beans, carrots, peas, and corn. Perfect for a quick and easy side dish.",
      pictureURL: require("./assets/dbImages/mixed-veges.jpg"),
    },
    {
      productName: "Frozen Pizza",
      price: 6.99,
      description:
        "A delicious and convenient meal for one or more, with various toppings to choose from.",
      pictureURL: require("./assets/dbImages/frozen-pizza.jpg"),
    },
    {
      productName: "Frozen Fish Fillets",
      price: 8.99,
      description:
        "A healthy and tasty option, with various types of fish available such as salmon, hoki, or tarakihi.",
      pictureURL: require("./assets/dbImages/frozen-fish.jpg"),
    },
    {
      productName: "Frozen Berries",
      price: 5.5,
      description:
        "A delicious and nutritious option, great for smoothies, toppings for desserts or as a healthy snack.",
      pictureURL: require("./assets/dbImages/frozen-berries.jpg"),
    },
    {
      productName: "Almonds",
      price: 7.5,
      description:
        "A crunchy and nutritious snack, almonds are high in healthy fats, protein, and fiber.",
      pictureURL: require("./assets/dbImages/almonds.jpg"),
    },
    {
      productName: "Granola",
      price: 6.99,
      description:
        "A delicious and healthy breakfast option, with various flavors and ingredients to choose from.",
      pictureURL: require("./assets/dbImages/granola.jpg"),
    },
    {
      productName: "Honey",
      price: 10.5,
      description:
        "A natural sweetener and antioxidant, honey is great for adding flavor to tea, oatmeal, or baked goods.",
      pictureURL: require("./assets/dbImages/honey.jpg"),
    },
    {
      productName: "Avocado",
      price: 2.99,
      description:
        "A creamy and nutritious fruit, avocados are great in salads, guacamole, or as a toast topping.",
      pictureURL: require("./assets/dbImages/avocado.jpg"),
    },
    {
      productName: "Popcorn",
      price: 3.5,
      description:
        "A fun and easy snack, popcorn is great for movie nights or as a low-calorie alternative to chips.",
      pictureURL: require("./assets/dbImages/popcorn.jpg"),
    },
  ];
  const CategoryStack = createNativeStackNavigator();
  const AccountStack = createNativeStackNavigator();
  const HomeStack = createNativeStackNavigator();
  const AppStack = createNativeStackNavigator();
  const CartStack = createNativeStackNavigator();
  const BottomTab = createBottomTabNavigator();
  const [userToken, setUserToken] = useState(null);

  function MainApp({ navigation, route }) {
    let userToken = route.params.userToken;
    return (
      <BottomTab.Navigator
        initialRouteName="HomeStackScreen"
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.black,
          tabBarActiveBackgroundColor: colors.black,
          tabBarInactiveBackgroundColor: colors.primary,
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <BottomTab.Screen
          name="HomeScreen"
          component={HomeStackScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size * 1.25} color={color} />
            ),
          }}
          initialParams={{ userToken }}
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
          initialParams={{ userToken }}
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
          initialParams={{ userToken }}
        />
        <BottomTab.Screen
          name="AccountScreen"
          component={AccountStackScreen}
          options={{
            title: "Pak'n'Save",
            headerBackground: () => (
              <View style={{ flex: 1, backgroundColor: colors.primary }} />
            ),
            tabBarLabel: "Account",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={size * 1.25}
                color={color}
              />
            ),
          }}
          initialParams={{ userToken }}
        />
      </BottomTab.Navigator>
    );
  }

  function CategoriesStackScreen() {
    return (
      <CategoryStack.Navigator
        initialRouteName="Categories"
        screenOptions={{
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerTitle: "Pak'n'Save",
          headerBackground: () => (
            <View style={{ flex: 1, backgroundColor: colors.primary }} />
          ),
        }}
      >
        <CategoryStack.Screen name="Categories" component={CategoriesScreen} />
      </CategoryStack.Navigator>
    );
  }

  function AccountStackScreen({route}) {
    const userToken = route.params.userToken;

    return (
      <AccountStack.Navigator
        initialRouteName="Account"
        screenOptions={{
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerTitle: "Pak'n'Save",
          headerBackground: () => (
            <View style={{ flex: 1, backgroundColor: colors.primary }} />
          ),
        }}
      >
        <AccountStack.Screen name="Account" component={AccountScreen} initialParams={{ userToken }}/>
      </AccountStack.Navigator>
    );
  }

  function HomeStackScreen({route, navigation}) {
    const userToken = route.params.userToken;
    const isFocused = useIsFocused();

  // Reset the stack when the screen is focused
  useEffect(() => {
    if (isFocused) {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      navigation.dispatch(resetAction);
    }
  }, [isFocused]);
    return (
      <HomeStack.Navigator
        initialRouteName="Home"

        screenOptions={{
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerTitle: "Pak'n'Save",
          headerBackground: () => (
            <View style={{ flex: 1, backgroundColor: colors.primary }} />
          ),
        }}
      >
        <HomeStack.Screen name="Home" component={HomeScreen} initialParams={{userToken}}/>
        <HomeStack.Screen name="Products" component={ProductScreen} initialParams={{userToken}}/>
      </HomeStack.Navigator>
    );
  }
  function CartStackScreen({ route, navigation }) {
    const userToken = route.params.userToken;
    const isFocused = useIsFocused();

  // Reset the stack when the screen is focused
  useEffect(() => {
    if (isFocused) {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: 'Cart' }],
      });
      navigation.dispatch(resetAction);
    }
  }, [isFocused]);
    return (
      <CartStack.Navigator
        initialRouteName="Cart"
        screenOptions={{
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerTitle: "Pak'n'Save",
          headerBackground: () => (
            <View style={{ flex: 1, backgroundColor: colors.primary }} />
          ),
        }}
      >
        <CartStack.Screen
          name="Cart"
          component={CartScreen}
          initialParams={{ userToken }}
        />
      </CartStack.Navigator>
    );
  }
  const dbAddProducts = (name, price, description, path) => {
    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO products(product_name, product_price, product_info, product_image)VALUES(?,?,?,?)",
        [name, price, description, path],
        (tx, results) => {
        }
      );
    });
  };

  useEffect(() => {
    db.transaction(function (tx) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS products(product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name VARCHAR(30), product_price VARCHAR(15), product_info VARCHAR(200), product_image VARCHAR(200))",
        [],
        (tx, results) => {
          enterProducts.forEach((product) => dbAddProducts(product.productName, product.price, product.description, product.pictureURL))
          console.log("yeet")
        }
      );
    });
  }, []);

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
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
          <AppStack.Screen
            name="MainApp"
            component={MainApp}
            initialParams={{ userToken }}
          />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
