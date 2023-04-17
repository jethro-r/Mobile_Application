import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import AppButton from "../src/components/AppButton";
import Screen from "../src/components/Screen";
import { DatabaseConnection } from "../src/Database/Database";


const HomeScreen = ({ navigation }) => {
  const enterProducts = [
    {
      productName: "Milk",
      price: 3.5,
      description:
        "Fresh, whole milk from grass-fed cows. Perfect for drinking, cooking, or baking.",
      pictureURL: "../assets/dbImages/milk.jpg",
    },
    {
      productName: "Bread",
      price: 2.99,
      description:
        "Soft and delicious white bread. Great for sandwiches, toast, or dipping in soup.",
      pictureURL: "../assets/dbImages/bread.jpg",
    },
    {
      productName: "Eggs",
      price: 4.5,
      description:
        "Large, free-range eggs from happy chickens. Great for breakfast or baking.",
      pictureURL: "../assets/dbImages/eggs.jpg",
    },
    {
      productName: "Cheese",
      price: 6.99,
      description:
        "Sharp cheddar cheese, aged to perfection. Perfect for snacking or grating over pasta.",
      pictureURL: "../assets/dbImages/cheese.jpg",
    },
    {
      productName: "Apples",
      price: 2.5,
      description:
        "Crisp, juicy apples from local orchards. Great for snacking, cooking, or making cider.",
      pictureURL: "../assets/dbImages/apples.jpg",
    },
    {
      productName: "Beef",
      price: 12.99,
      description:
        "Premium, grass-fed beef. Great for grilling, roasting, or making stews.",
      pictureURL: "../assets/dbImages/beef.jpg",
    },
    {
      productName: "Potatoes",
      price: 1.99,
      description:
        "Fresh, locally-grown potatoes. Great for boiling, baking, or making chips.",
      pictureURL: "../assets/dbImages/potatoes.jpg",
    },
    {
      productName: "Yogurt",
      price: 4.25,
      description:
        "Creamy, probiotic yogurt made from organic milk. Perfect for breakfast or snacking.",
      pictureURL: "../assets/dbImages/yogurt.jpg",
    },
    {
      productName: "Carrots",
      price: 1.5,
      description:
        "Sweet, crunchy carrots. Great for salads, roasting, or snacking.",
      pictureURL: "../assets/dbImages/carrots.jpg",
    },
    {
      productName: "Salmon",
      price: 15.99,
      description:
        "Fresh, sustainably-raised salmon. Great for grilling, baking, or making sushi.",
      pictureURL: "../assets/dbImages/salmon.jpg",
    },
    {
      productName: "Oranges",
      price: 3.99,
      description:
        "Juicy, sweet oranges. Great for snacking, juicing, or making marmalade.",
      pictureURL: "../assets/dbImages/orange.jpg",
    },
    {
      productName: "Chicken",
      price: 8.99,
      description:
        "Tender, organic chicken. Great for roasting, grilling, or making soup.",
      pictureURL: "../assets/dbImages/chicken.jpg",
    },
    {
      productName: "Coca-Cola",
      price: 2.5,
      description:
        "Classic carbonated soft drink made with natural flavors and caffeine.",
      pictureURL: "../assets/dbImages/coke.jpg",
    },
    {
      productName: "Sprite",
      price: 2.5,
      description: "Refreshing lemon-lime flavored carbonated soft drink.",
      pictureURL: "../assets/dbImages/sprite.jpg",
    },
    {
      productName: "Orange Juice",
      price: 4.5,
      description:
        "Freshly squeezed orange juice, packed with vitamin C and natural sweetness.",
      pictureURL: "../assets/dbImages/orange-juice.jpg",
    },

    {
      productName: "Broccoli",
      price: 3.5,
      description:
        "Nutritious and delicious, broccoli is great steamed, roasted, or stir-fried.",
      pictureURL: "../assets/dbImages/broccoli.jpg",
    },
    {
      productName: "Spinach",
      price: 2.99,
      description:
        "Packed with iron and other nutrients, spinach is great in salads, smoothies, or cooked dishes.",
      pictureURL: "../assets/dbImages/spinach.jpg",
    },
    {
      productName: "Cauliflower",
      price: 3.99,
      description:
        "Mild and versatile, cauliflower is great roasted, mashed, or in soups.",
      pictureURL: "../assets/dbImages/cauliflower.jpg",
    },
    {
      productName: "Frozen Peas",
      price: 2.5,
      description:
        "Sweet and tender green peas, great for adding to stir-fries, soups, or as a side dish.",
      pictureURL: "../assets/dbImages/frozen-peas.jpg",
    },
    {
      productName: "Frozen Mixed Vegetables",
      price: 3.99,
      description:
        "A convenient blend of green beans, carrots, peas, and corn. Perfect for a quick and easy side dish.",
      pictureURL: "../assets/dbImages/mixed-veges.jpg",
    },
    {
      productName: "Frozen Pizza",
      price: 6.99,
      description:
        "A delicious and convenient meal for one or more, with various toppings to choose from.",
      pictureURL: "../assets/dbImages/frozen-pizza.jpg",
    },
    {
      productName: "Frozen Fish Fillets",
      price: 8.99,
      description:
        "A healthy and tasty option, with various types of fish available such as salmon, hoki, or tarakihi.",
      pictureURL: "../assets/dbImages/frozen-fish.jpg.jpg",
    },
    {
      productName: "Frozen Berries",
      price: 5.5,
      description:
        "A delicious and nutritious option, great for smoothies, toppings for desserts or as a healthy snack.",
      pictureURL: "../assets/dbImages/frozen-berries.jpg",
    },
    {
      productName: "Almonds",
      price: 7.5,
      description:
        "A crunchy and nutritious snack, almonds are high in healthy fats, protein, and fiber.",
      pictureURL: "../assets/dbImages/almonds.jpg",
    },
    {
      productName: "Granola",
      price: 6.99,
      description:
        "A delicious and healthy breakfast option, with various flavors and ingredients to choose from.",
      pictureURL: "../assets/dbImages/granola.jpg",
    },
    {
      productName: "Honey",
      price: 10.5,
      description:
        "A natural sweetener and antioxidant, honey is great for adding flavor to tea, oatmeal, or baked goods.",
      pictureURL: "../assets/dbImages/honey.jpg",
    },
    {
      productName: "Avocado",
      price: 2.99,
      description:
        "A creamy and nutritious fruit, avocados are great in salads, guacamole, or as a toast topping.",
      pictureURL: "../assets/dbImages/avocado.jpg",
    },
    {
      productName: "Popcorn",
      price: 3.5,
      description:
        "A fun and easy snack, popcorn is great for movie nights or as a low-calorie alternative to chips.",
      pictureURL: "../assets/dbImages/popcorn.jpg",
    },
  ];
const db = DatabaseConnection.getConnection();
const [flatlistItems, setFlatListItems] = useState([]);

  const dbAddProducts = (name, price, description, path) => {
    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO products(product_name, product_price, product_info, product_image)VALUES(?,?,?,?)",
        [name, price, description, path],
        (tx, results) => {
          console.log(results);
        }
      );
    });
  };
  useEffect(() => {
    db.transaction(function (tx) {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS products(product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name VARCHAR(30), product_price VARCHAR(15), product_info VARCHAR(200), product_image VARCHAR(200))',
        [],
        (tx, results) => {
          console.log('Products table created successfully');
          tx.executeSql("SELECT * FROM products", [], (tx, results) => {
            const temp = [];
            for (let i = 0; i < results.rows.length; i++) {
              temp.push(results.rows.item(i));
            }
            setFlatListItems(temp);
            console.log('Products added successfully');
          });
        }
      );
    });
  }, []);

  const listViewItems = (item) => {
    return (
      <ScrollView>
        <View
          style={{
            borderWidth: 2,
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 15,
            backgroundColor: "lightgreen",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 25,
            }}
          >
            product id is:{item.product_id}
          </Text>
          <Text>product Name:{item.product_name}</Text>
          <Text>product info:{item.product_info}</Text>
          <Text>product info:{item.product_image}</Text>
        </View>
      </ScrollView>
    );
  };
  return (
    <Screen>
      <FlatList
        data={flatlistItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => listViewItems(item)}
      />
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
