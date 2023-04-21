import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { firebaseDB } from "../firebase";
import {
  collection,
  query,
  getDocs,
} from "firebase/firestore";

const AccountScreen = ({ navigation, route }) => {
  const userToken = route.params.userToken;
  const [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(
        query(collection(firebaseDB, "users"))
      );
      querySnapshot.forEach((doc) => {
        if (doc.id === userToken) {
          setUserInfo(doc.data());
        }
      });

    };
    getData().catch(console.error);
  }, []);

  return (
    <View>
      <Text>{userInfo.firstName}</Text>
      <Text>{userInfo.lastName}</Text>
      <Text>{userInfo.email}</Text>
      <Text>{userInfo.phoneNumber}</Text>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
