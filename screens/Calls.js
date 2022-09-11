import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import TabBar from '../components/TabBar';

export default function Calls() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
      <LinearGradient style={styles.container} locations={[0, 0.1, 0.4, 0.94, 0.97, 1]}
    colors={['#a77dff', '#d3beff', 'white', 'white', '#d3beff', '#a77dff']}>
        <View style={{height: '90%'}}>
        <Text style={styles.title}>
          Calls
        </Text>
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