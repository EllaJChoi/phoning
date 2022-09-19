import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useContacts from "../hooks/useHooks";
import ListItem from "../components/ListItem";
import TabBar from "../components/TabBar";
import { FlatList } from "react-native-gesture-handler";
import GlobalContext from "../context/Context";
import { auth, db } from "../firebase";

export default function Friends() {
  const contacts = useContacts();
  const route = useRoute();
  const image = route.params && route.params.image;
  return (
    <LinearGradient
      style={styles.container}
      locations={[0, 0.1, 0.4, 0.94, 0.98, 1]}
      colors={["#397bfc", "#9cbdfe", "white", "white", "#9cbdfe", "#397bfc"]}
    >
      <View style={{ height: "90%" }}>
        <Text style={styles.title}>Friends</Text>
        <FlatList
          style={{ flex: 1, padding: 10 }}
          data={contacts}
          keyExtractor={(_, i) => i}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => showModal()}>
              <FriendPreview contact={item} image={image} />
            </TouchableOpacity>
          )}
        />
      </View>
      <TabBar />
    </LinearGradient>
  );
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
  },
});

function FriendPreview({ contact, image }) {
  const { unfilteredRooms, rooms } = useContext(GlobalContext);
  const [user, setUser] = useState(contact);
  const { currentUser } = auth;

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("email", "==", contact.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        setUser((prevUser) => ({ ...prevUser, userDoc }));
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <View>
    {user.userDoc && user.email !== currentUser.email && (
      // <Text>JSON.stringify{user.userDoc}</Text>
    <ListItem
      // style={{ marginTop: 7 }}
      type="friends"
      user={user}
      image={image}
      room={unfilteredRooms.find((room) =>
        room.participantsArray.includes(contact.email)
      )}
    />
    )}
    </View>
  );
}
