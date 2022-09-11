import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { signUp, logIn } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signUp");

  async function handlePress() {
    if (email !== '' && password !== '') {
      if (mode === "signUp") {
        signUp(email, password);
      }
      if (mode === "logIn") {
        logIn(email, password);
      }
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.container} locations={[0, 0.1, 0.4, 0.94, 0.97, 1]}
    colors={['#3077fc', '#98bbfe', 'white', 'white', '#98bbfe', '#3077fc']}>
        <Text style={styles.title}>
          Welcome 👋
        </Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableHighlight
          underlayColor="none"
          onPress={handlePress}
        >
          <LinearGradient
            style={styles.button}
            locations={[0, 0.3]}
            colors={["white", "#92e141"]}
          >
            <Text style={styles.buttonText}>{mode === 'logIn' ? 'Log in' : 'Sign up'}</Text>
          </LinearGradient>
          </TouchableHighlight>
        
        <TouchableOpacity onPress={() => mode === 'signUp' ? setMode("logIn") : setMode("signUp")}>
          <Text style={styles.accountText}>
          {mode === 'logIn' ? 'New to Phoning? ' : 'Already have an account? '}
            <Text style={styles.signupText}>{mode === 'logIn' ? 'Sign up' : 'Log in'}</Text>
          </Text>
        </TouchableOpacity>
      </LinearGradient>
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
    marginTop: 40,
    fontSize: 16,
    alignSelf: "center",
    color: '#004af7'
  },
  accountText: {
    marginTop: 40,
    fontSize: 16,
    alignSelf: "center",
    color: '#000'
  }
});
