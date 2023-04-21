import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firebaseDB } from "../firebase";


const ProductScreen = ({ route, navigation }) => {
  const product = route.params.product;
  const userToken = route.params.userToken

  const handleCartAddition = async () => {
    try {
      const docRef = await addDoc(collection(firebaseDB, "cartItems"), {
        cartItemID: product.product_id,
        userID: userToken,
      });
      alert(product.product_name + " has been added to Cart")
      
      
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={Number(product.product_image)} />
      <View style={styles.details}>
        <Text style={styles.title}>{product.product_name}</Text>
        <Text style={styles.price}>${product.product_price}</Text>
        <Text style={styles.description}>{product.product_info}</Text>
        <TouchableOpacity style={styles.button} onPress={handleCartAddition}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 16,
  },
  image: {
    width: "100%",
    height: "50%",
    padding: '20%',
    marginBottom: 16,

  },
  details: {
    width: "90%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#ffdd00",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
  },
});
