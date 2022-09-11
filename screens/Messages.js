import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { useContext } from 'react';
import GlobalContext from '../context/Context';
import { LinearGradient } from "expo-linear-gradient";
import TabBar from '../components/TabBar';
import useContacts from '../hooks/useHooks';

export default function Messages() {
    const navigation = useNavigation();
    const { currentUser } = auth;
    const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
    const contacts = useContacts();
    const chatsQuery = query(
      collection(db, "rooms"),
      where("participantsArray", "array-contains", currentUser.email)
    );

    useEffect(() => {
      const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
        const parsedChats = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          userB: doc
            .data()
            .participants.find((p) => p.email !== currentUser.email),
        }));
        setUnfilteredRooms(parsedChats);
        setRooms(parsedChats.filter((doc) => doc.lastMessage));
      });
      return () => unsubscribe();
    }, []);
  
    function getUserB(user, contacts) {
      const userContact = contacts.find((c) => c.email === user.email);
      if (userContact && userContact.contactName) {
        return { ...user, contactName: userContact.contactName };
      }
      return user;
    }

    return (
        <View style={styles.container}>
      <LinearGradient style={styles.container} locations={[0, 0.1, 0.4, 0.94, 0.97, 1]}
    colors={['#fffe0e', '#fffe86', 'white', 'white', '#fffe86', '#fffe0e']}>
        <View style={{height: '90%'}}>
        <Text style={styles.title}>
        Messages
        </Text>
        <View style={{ flex: 1, padding: 5, paddingRight: 10 }}>
      {rooms.map((room) => (
        <ListItem
          type="chat"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={getUserB(room.userB, contacts)}
        />
      ))}
    </View>
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