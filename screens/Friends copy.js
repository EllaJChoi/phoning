import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';

export default function Friends() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
      <LinearGradient style={styles.container} locations={[0, 0.1, 0.4, 0.94, 0.97, 1]}
    colors={['#3077fc', '#98bbfe', 'white', 'white', '#98bbfe', '#3077fc']}>
        <View style={{justifyContent: 'flex-start', height: '90%'}}>
        <Text style={styles.title}>
          Friends
        </Text>
        </View>
        <View style={{justifyContent: 'flex-end', height: '10%'}}>
        <View style={{flexDirection: "row", height: '100%', width: '100%', marginBottom: 30}}>
        <View style={{width:'25%', alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate("friends")}>
            <Image style={{height: '95%', width: undefined, aspectRatio: 173/218}} source={require("../assets/friends.png")} />
            </TouchableOpacity>
        </View>
        <View style={{width:'25%', alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate("messages")}>
            <Image style={{height: '95%', width: undefined, aspectRatio: 173/219}} source={require("../assets/messages.png")} />
        </TouchableOpacity>
        </View>
        <View style={{width:'25%', alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate("calls")}>
        <Image style={{height: '95%', width: undefined, aspectRatio: 174/219}} source={require("../assets/calls.png")} />
        </TouchableOpacity>
        </View>
        <View style={{width:'25%', alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate("settings")}>
        <Image style={{height: '95%', width: undefined, aspectRatio: 173/219}} source={require("../assets/settings.png")} />
        </TouchableOpacity>
        </View>

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
      backgroundImage: {
        flex: 1,
        flexDirection: "column",
        height: "100%",
        width: "100%",
      },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "black",
        // paddingBottom: 30,
        paddingTop: 60,
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
            backgroundColor: '#fff',
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