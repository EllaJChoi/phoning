import { Button, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import TabBar from '../components/TabBar';
import { auth } from '../firebase';
import ListItem from "../components/ListItem";
import { UserInterfaceIdiom } from 'expo-constants';

export default function Settings() {
  const { currentUser } = auth;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
      <LinearGradient style={styles.container} locations={[0, 0.1, 0.4, 0.94, 0.97, 1]}
    colors={['#00ff29', '#80ff94', 'white', 'white', '#80ff94', '#00ff29']}>
        <View style={{height: '90%'}}>
        <Text style={styles.title}>
        Settings
        </Text>
        {/* <Text style={{marginLeft: 20, fontSize: 20, fontWeight: '600'}}>{currentUser.displayName}</Text> */}
        <View style={{padding: 10}}>
          <ListItem
          style={{}}
          user={currentUser}
          type="settings"
          // image={false}
        />
        </View>
        {/* <Button title="Edit Profile" color="#841584" onPress={() => navigation.navigate("profile")} /> */}
        </View>
        <TabBar/>
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
    paddingBottom: 10,
    paddingTop: 60,
    alignSelf: "center",
  }
});