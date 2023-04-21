import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import AppButton from "../src/components/AppButton";
import Screen from "../src/components/Screen";
import AppTextInput from "../src/components/AppTextInput";
import { auth, firebaseDB } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterUser = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { setUserToken } = route.params

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password == passwordConfirm) {
      createUserWithEmailAndPassword(auth, emailAddress, password)
        .then(async (userCredentials) => {
          const user = userCredentials.user;
          console.log(user.uid)
          try {
            const docRef = await setDoc(doc(firebaseDB, "users", `${user.uid}`), {
              firstName: firstName,
              lastName: lastName,
              email: emailAddress,
              phoneNumber: phoneNumber,
            });
            
            
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          setUserToken(user.uid)
          navigation.navigate("MainApp", { screen: "HomeScreen" });
        })
        .catch((error) => alert(error.message));
    }
    else alert("Please make sure the passwords are the same")
  };

  return (
    <Screen>
      <AppTextInput
        placeholder="Enter your First Name:"
        value={firstName}
        onChangeText={(firstName) => setFirstName(firstName)}
        style={styles.input}
      />
      <AppTextInput
        placeholder="Enter your Last Name:"
        value={lastName}
        style={styles.input}
        onChangeText={(lastName) => setLastName(lastName)}
      />
      <AppTextInput
        placeholder="Enter your Email Address:"
        style={styles.input}
        value={emailAddress}
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <AppTextInput
        style={styles.input}
        placeholder="Enter your Phone Number"
        value={phoneNumber}
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
      />
      <AppTextInput
        placeholder="Enter your Password"
        value={password}
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
      />
      <AppTextInput
        placeholder="Enter your Password"
        style={styles.input}
        value={passwordConfirm}
        onChangeText={(passwordConfirm) => setPasswordConfirm(passwordConfirm)}
      />

      <AppButton title="Register" onPress={handleSignUp} />
    </Screen>
  );
};

export default RegisterUser;

const styles = StyleSheet.create({
  input: {
    
  },
});
