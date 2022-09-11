import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import TabBar from '../components/TabBar';
import { auth } from '../firebase';

export default function Chat() {
    const navigation = useNavigation();
    const { currentUser } = auth;
    const route = useRoute();
    const room = route.params.room;
  const selectedImage = route.params.image;
  const userB = route.params.user;
    const senderUser = currentUser.photoURL
    ? {
        name: currentUser.displayName,
        _id: currentUser.uid,
        avatar: currentUser.photoURL,
      }
    : { name: currentUser.displayName, _id: currentUser.uid };

    return (
        <View style={styles.container}>
      <LinearGradient style={styles.container} locations={[0, 0.1, 0.4, 0.94, 0.97, 1]}
    colors={['#fffe0e', '#fffe86', 'white', 'white', '#fffe86', '#fffe0e']}>
        <View style={{height: '90%', paddingTop: 60, paddingBottom: 10}}>
            <View style={{flexDirection: "row"}}>
            <TouchableOpacity style={{width:'20%', alignItems: 'center'}} onPress={()=>navigation.goBack()}>
                <Image style={{height: undefined, width: '45%', aspectRatio: 99/98}} source={require("../assets/back.png")} />
            </TouchableOpacity>
                <Text style={styles.title}>
                    {userB.name}
                </Text>
                <TouchableOpacity style={{width:'20%', alignItems: 'center'}}>
                <Image style={{height: undefined, width: '45%', aspectRatio: 1/1}} source={require("../assets/menu.png")} />
            </TouchableOpacity>
            </View>
        </View>
        </LinearGradient>
        </View>
      )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
    // alignSelf: "center",
    width: '60%',
    // textAlign: 'center'
  }
});