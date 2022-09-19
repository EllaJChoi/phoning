import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { pickImage, askForPermission, uploadImage } from "../utils";
import { auth, db } from "../firebase";
import { updateProfile } from "@firebase/auth";
import { doc, setDoc, addDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function Profile({type}) {
  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const navigation = useNavigation();
  
  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  async function handlePress() {
    const user = auth.currentUser;
    let photoURL;
    if (selectedImage) {
      const { url } = await uploadImage(selectedImage, `images/${user.uid}`, "profile");
      photoURL = url;
    }
    const userData = {
      displayName,
      email: user.email,
    };
    if (photoURL) {
      userData.photoURL = photoURL;
    }
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
    ]);
    navigation.navigate("home");
  }

  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  }

  if (!permissionStatus) {
    return <Text>Loading</Text>;
  }
  if (permissionStatus !== "granted") {
    return <Text>You need to allow this permission</Text>;
  }
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <View style={styles.container}>
      <LinearGradient style={styles.container} locations={[0, 0.1, 0.4, 0.94, 0.97, 1]}
    colors={['#3077fc', '#98bbfe', 'white', 'white', '#98bbfe', '#3077fc']}>
        <TouchableOpacity style={{width:'20%', alignItems: 'center', paddingTop: 60}} onPress={()=>navigation.goBack()}>
        <Image style={{height: 34, width: 34}} source={require("../assets/back.png")} />
        </TouchableOpacity>
        <Text style={styles.title}>
        Profile Info 📝
        </Text>
        <TouchableHighlight
        style={styles.imagePicker}
          onPress={handleProfilePicture}
          underlayColor="none"
        >
          {selectedImage ? (
            <LinearGradient
            style={{width: '100%', height: '100%',borderRadius: 180, justifyContent: 'center'}}
            locations={[0, 0.3]}
            colors={["white", "#92e141"]}
          >
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "90%", height: "90%", borderRadius: 180, alignSelf: 'center' }}
            />
            </LinearGradient>
          )
            : auth.currentUser.photoURL ? (
              <LinearGradient
            style={{width: '100%', height: '100%',borderRadius: 180, justifyContent: 'center'}}
            locations={[0, 0.3]}
            colors={["white", "#92e141"]}
          >
            {/* <Text>{auth.currentUser.photoURL}</Text> */}
            <Image source={{ uri: auth.currentUser.photoURL }} style={{ width: "90%", height: "90%", borderRadius: 180, alignSelf: 'center' }} />
            </LinearGradient>
          ) : (
            <Image source={require("../assets/camera.png")} style={{ width: '30%', height: undefined, aspectRatio: 246/168}}/>
          )}
          
        </TouchableHighlight>
        <TextInput
          placeholder=  {auth.currentUser.displayName || "Type your name"}
          value={displayName}
          onChangeText={setDisplayName}
          style={styles.input}
        />
        <TouchableHighlight
          underlayColor="none"
          onPress={handlePress}
          disabled={!displayName}
        >
          <LinearGradient
            style={styles.button}
            locations={[0, 0.3]}
            colors={["white", "#92e141"]}
          >
            <Text style={styles.buttonText}>Save ✔️</Text>
          </LinearGradient>
          </TouchableHighlight>
        </LinearGradient>
      </View>
    </React.Fragment>
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
        // paddingBottom: 30,
        paddingTop: 100,
        alignSelf: 'center'
      },
      input: {
        backgroundColor: "#fff",
        marginHorizontal: 40,
        marginTop: 30,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 8,
        padding: 12,
      },
      imagePicker: {
        marginTop: 30,
            borderRadius: 180,
            width: 180,
            height: 180,
            // backgroundColor: '#fff',
            alignItems: "center",
            borderWidth: 1,
            justifyContent: "center",
            alignSelf: 'center'
      },
      button: {
        marginHorizontal: 40,
        marginTop: 20,
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
})