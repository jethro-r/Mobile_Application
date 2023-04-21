import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";

import AppTextInput from "../src/components/AppTextInput";
import AppButton from "../src/components/AppButton";
import Screen from "../src/components/Screen";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DatabaseConnection } from "../src/Database/Database";
const db = DatabaseConnection.getConnection();

const LoginScreen = ({ navigation, route }) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserToken } = route.params;

    const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        setUserToken(user.uid);
        navigation.navigate("MainApp", { screen: "HomeScreen" });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Screen>
      <View style={styles.inputContainer}>
        <AppTextInput
          placeholder="Email"
          icon="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <AppTextInput
          placeholder="Password"
          icon="lock"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <AppButton title="LOGIN" onPress={handleSignIn} />

        <AppButton
          title="REGISTER"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 20,
    marginTop: 15,
  },
  buttonContainer: {
    padding: 20,
  },
});
