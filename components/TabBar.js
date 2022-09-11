import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TabBar() {
    const navigation = useNavigation();
  return (
  <View style={{flexDirection: "row", height: '10%', width: '95%', alignSelf: 'center'}}>
    <TouchableOpacity style={{width:'25%', alignItems: 'center'}} onPress={()=>navigation.navigate("friends")}>
      <Image style={{height: '80%', width: undefined, aspectRatio: 173/218}} source={require("../assets/friends.png")} />
    </TouchableOpacity>
    <TouchableOpacity style={{width:'25%', alignItems: 'center'}} onPress={()=>navigation.navigate("messages")}>
      <Image style={{height: '80%', width: undefined, aspectRatio: 173/219}} source={require("../assets/messages.png")} />
    </TouchableOpacity>
    <TouchableOpacity style={{width:'25%', alignItems: 'center'}} onPress={()=>navigation.navigate("calls")}>
      <Image style={{height: '80%', width: undefined, aspectRatio: 174/219}} source={require("../assets/calls.png")} />
    </TouchableOpacity>
    <TouchableOpacity style={{width:'25%', alignItems: 'center'}} onPress={()=>navigation.navigate("settings")}>
      <Image style={{height: '80%', width: undefined, aspectRatio: 173/219}} source={require("../assets/settings.png")} />
    </TouchableOpacity>
  </View>
  );
}