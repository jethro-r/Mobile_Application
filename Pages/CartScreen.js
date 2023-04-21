import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { firebaseDB } from "../firebase";

import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { collection, query, getDocs } from "firebase/firestore";
import { DatabaseConnection } from "../src/Database/Database";

const db = DatabaseConnection.getConnection();

const CartScreen = ({ navigation, route }) => {
  const [allProducts, setProducts] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const userToken = route.params.userToken;

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(
        query(collection(firebaseDB, "cartItems"))
      );
      const data = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().userID === userToken) {
          data.push(doc.data());
        }
      });

      setCartData(data);
    };

    getData().catch(console.error);

    db.transaction(function (tx) {
      tx.executeSql("SELECT * FROM products", [], (tx, results) => {
        const temp = [];
        for (let i = 0; i < results.rows.length; i++) {
          temp.push(results.rows.item(i));
        }
        setProducts(temp);
        console.log("Fetched Products List");
        // console.log(allProducts);
      });
    });
  }, []);

  useEffect(() => {
    if (allProducts.length !== 0 && cartData !== 0) {
      console.log(cartData);
      // console.log(allProd)
      const newCartItems = cartData
        .map((cartItem) => {
          const product = allProducts.find(
            (product) => product.product_id === cartItem.cartItemID
          );
          const quantity = cartData.filter(
            (item) => item.cartItemID === cartItem.cartItemID
          ).length;
          return { ...product, quantity };
        })
      console.log(newCartItems);
      setCartItems(newCartItems);
      setLoading(false);
    }
  }, [allProducts, cartData]);

  return (
    <ScrollView>
      {isLoading ? (
        <View>
          <Text>Loading Data</Text>
        </View>
      ) : (
        <View>
          {cartItems.map((item) => {
            return (
              <View key={item.cartItemID}>
                <Text>{item.product_name}</Text>
                <Text>{item.product_info}</Text>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
