import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const images = [
  {
    id: "1",
    name: "Ice Cream",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqg_OBzcVDnKHv1d3hyVk_WlCo43pzit4CJQ&usqp=CAU",
  },
  {
    id: "2",
    name: "Biscuits",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT85O96gPiso_j2gaS0cePTBY4mCR3pumV6tw&usqp=CAU",
  },
  {
    id: "3",
    name: "Chocolate",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSicQWeRoxxLEr1RLIp8dJtw-NQvSE4xtlhwA&usqp=CAU",
  },
];

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  return (
    <ScrollView>
      <View
        style={{
          paddingTop: 25,
        }}
      >
        <Text
          style={{
            fontFamily: "monospace",
            fontSize: 30,
            fontWeight: "900",
            textAlign: "center",
            textDecorationLine: "underline",
          }}
        >
          Shopping Cart
        </Text>

        {images.map((item) => {
          return (
            <View
              style={{
                marginBottom: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{
                  uri: item.image,
                  width: 100,
                  height: 100,
                }}
              />

              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {item.name}
                </Text>

                <Picker
                  style={{
                    width: "20%",
                  }}
                >
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                </Picker>

                {cart.includes(item) ? (
                  <Pressable
                    onPress={() =>
                      setCart(cart.filter((x) => x.id !== item.id))
                    }
                  >
                    <Text
                      style={{
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      Remove from Cart!
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable onPress={() => setCart([...cart, item])}>
                    <Text
                      style={{
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      Add To Cart
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          );
        })}

        <View>
          <View style={{ borderWidth: 3, backgroundColor: "grey" }}></View>
          <Text
            style={{
              fontFamily: "monospace",
              fontSize: 30,
              fontWeight: "900",
              textAlign: "center",
              textDecorationLine: "underline",
            }}
          >
            Added Cart Items!
          </Text>

          {cart.map((item) => {
            return (
              <View style={{ marginBottom: 15 }}>
                <Image
                  source={{
                    uri: item.image,
                    width: 100,
                    height: 100,
                  }}
                />

                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {item.name}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({});
