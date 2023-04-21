import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";

import AppButton from "../src/components/AppButton";
import Screen from "../src/components/Screen";
import { DatabaseConnection } from "../src/Database/Database";
import { useIsFocused, CommonActions } from "@react-navigation/native";
import colors from "../src/config/colors";
import { addDoc, collection } from "firebase/firestore";
import { firebaseDB } from "../firebase";


const HomeScreen = ({ route, navigation }) => {
  const userToken = route.params.userToken
  const db = DatabaseConnection.getConnection();
  const [flatlistItems, setFlatListItems] = useState([]);

  useEffect(()=> {
    db.transaction(function(tx){
      tx.executeSql("SELECT * FROM products", [], (tx, results) => {
        const temp = [];
        for (let i = 0; i < results.rows.length; i++) {
          temp.push(results.rows.item(i));
        }
        setFlatListItems(temp);
        console.log("Products Fetched successfully");
      });
    })
  },[])
  

  const listViewItems = (item) => {
    const handleCartAddition = async () => {
      try {
        const docRef = await addDoc(collection(firebaseDB, "cartItems"), {
          cartItemID: item.product_id,
          userID: userToken,
        });
        alert(item.product_name + " has been added to Cart")
        
        
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("HomeScreen", {
            screen: "Products",
            params: { product: item },
          });
        }}
      >
        <View style={styles.productContainer}>
          <Image
            source={Number(item.product_image)}
            style={styles.productImage}
          />
          <View style={{ flexDirection: "row", display:'flex' }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.productTitle}>{item.product_name}</Text>
              <Text style={styles.productPrice}>${item.product_price}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCartAddition}>
              <Text style={styles.buttonText}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Screen>
      <FlatList
        data={flatlistItems}
        keyExtractor={(item) => item.product_id}
        renderItem={({ item }) => listViewItems(item)}
        numColumns={2}
        styles={styles.listOfProducts}
      />
    </Screen>
  );
};

export default HomeScreen;

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
console.log(windowWidth);
const styles = StyleSheet.create({
  productContainer: {
    width: windowWidth * 0.48,
    height: windowHeight / 4,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: windowWidth * 0.01,
    marginVertical: 5,
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  listOfProducts: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: "70%",
    height: "70%",
    resizeMode: "cover",
    marginTop: 5,
  },
  productPrice: {
    flex: 1,
  },
  productTitle: {
    fontSize: windowWidth/30,
    fontWeight: "bold",
    marginTop: 5,
    overflow:"hidden",
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    width: "50%",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: colors.black,
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
