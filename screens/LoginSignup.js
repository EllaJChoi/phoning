import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background-blue.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.component1}>
        {/* <Image
          style={styles.phoningImage}
          source={require("../assets/?")}
        /> */}
        </View>
        <View style={styles.component2}>
        <TouchableHighlight
          underlayColor="none"
          onPress={() => navigation.navigate("Login")}
        >
          <LinearGradient
            style={styles.button}
            locations={[0.3, 0, 0]}
            colors={["#92e141", "white", "white"]}
          >
            <Text style={[styles.buttonText]}>Log in / Sign up</Text>
          </LinearGradient>
        </TouchableHighlight>
        </View>
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
    flexDirection: 'column',
    height: "100%",
    width: "100%",
  },
  button: {
    marginHorizontal: 40,
    marginBottom: 50,
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
  phoningImage: {
    width: '50%',
    height: undefined,
    aspectRatio: 572/771,
  },
  component1: {
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    height: '100%',
  },
  component2: {
    position: 'absolute',
    width:'100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
});
