import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { nanoid }from 'nanoid'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from "./firebase";
import { useNavigation } from "@react-navigation/native";

export async function pickImage() {
  let result = ImagePicker.launchImageLibraryAsync();
  return result;
}
export async function askForPermission() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status;
}

export async function uploadImage(uri, path, fName) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileName = fName || nanoid();
    const imageRef = ref(storage, `${path}/${fileName}.jpg`);
  
    const snapshot = await uploadBytes(imageRef, blob, {
      contentType: "image/jpeg",
    });
  
    blob.close();
  
    const url = await getDownloadURL(snapshot.ref);
  
    return { url, fileName };
  }

  function TabBar2() {
    const navigation = useNavigation();

    return (
      <View style={{justifyContent: 'flex-end', height: '10%'}}>
        <View style={{flexDirection: "row", height: '100%', width: '100%', marginBottom: 20}}>
        <View style={{width:'25%', alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate("friends")}>
            <Image style={{height: '100%', width: undefined, aspectRatio: 173/218}} source={require("./assets/friends.png")} />
            </TouchableOpacity>
        </View>
        <View style={{width:'25%', alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate("messages")}>
            <Image style={{height: '100%', width: undefined, aspectRatio: 173/219}} source={require("./assets/messages.png")} />
        </TouchableOpacity>
        </View>
        <View style={{width:'25%', alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate("calls")}>
        <Image style={{height: '100%', width: undefined, aspectRatio: 174/219}} source={require("./assets/calls.png")} />
        </TouchableOpacity>
        </View>
        <View style={{width:'25%', alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate("settings")}>
        <Image style={{height: '100%', width: undefined, aspectRatio: 173/219}} source={require("./assets/settings.png")} />
        </TouchableOpacity>
        </View>

        </View>
        </View>
    )
  }