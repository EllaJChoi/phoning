import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";

import { auth } from "../config/firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => console.log(`Login err: ${err}`));
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background-blue.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <Text style={styles.title}>
          Log in to continue
        </Text>
        <TextInput
          style={styles.input}
          placeholder="your@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="**********"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableHighlight
          underlayColor="none"
          onPress={onHandleLogin}
        >
          <LinearGradient
            style={styles.button}
            locations={[0.3, 0, 0]}
            colors={["#92e141", "white", "white"]}
          >
            <Text style={[styles.buttonText]}>Log in</Text>
          </LinearGradient>
          </TouchableHighlight>
        
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.accountText}>
            {"Don't have an account? "}
            <Text style={styles.signupText}>{'Sign up'}</Text>
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "black",
    alignSelf: "center",
    paddingBottom: 30,
    paddingTop: 100,
  },
  input: {
    backgroundColor: "#fff",
    marginHorizontal: 40,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    padding: 12,
  },
  button: {
    marginHorizontal: 40,
    // marginBottom: 50,
    paddingTop: 18,
    paddingBottom: 18,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#000",
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  signupText: {
    marginTop: 50,
    fontSize: 16,
    alignSelf: "center",
    color: '#004af7'
  },
  accountText: {
    marginTop: 50,
    fontSize: 16,
    alignSelf: "center",
    color: '#000'
  }
});
