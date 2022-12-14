// @refresh reset
import { useRoute } from "@react-navigation/native";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Avatar from "../components/Avatar";
import TabBar from "../components/TabBar";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import {
  Actions,
  Bubble,
  GiftedChat,
  InputToolbar,
} from "react-native-gifted-chat";
import { pickImage, uploadImage } from "../utils";
import ImageView from "react-native-image-viewing";

const randomId = nanoid();

export default function Chat() {
  const [roomHash, setRoomHash] = useState("");
  const [messages, setMessages] = useState([]);
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

  const roomId = room ? room.id : randomId;

  const roomRef = doc(db, "rooms", roomId);
  const roomMessagesRef = collection(db, "rooms", roomId, "messages");

  useEffect(() => {
    (async () => {
      if (!room) {
        const currUserData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
        };
        if (currentUser.photoURL) {
          currUserData.photoURL = currentUser.photoURL;
        }
        const userBData = {
          displayName: userB.contactName || userB.displayName || "",
          email: currentUser.email,
        };
        if (userB.photoURL) {
          userBData.photoURL = userB.photoURL;
        }
        const roomData = {
          participants: [currUserData, userBData],
          participantsArray: [currentUser.email, userB.email],
        };
        try {
          setDoc(roomRef, roomData);
        } catch (error) {
          console.log(error);
        }
      }
      const emailHash = `${currentUser.email}:${userB.email}`;
      setRoomHash(emailHash);
      if (selectedImage && selectedImage.uri) {
        await sendImage(selectedImage.uri, emailHash);
      }
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessagesRef, (querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function onSend(messages = []) {
    const writes = messages.map((m) => addDoc(roomMessagesRef, m));
    const lastMessage = messages[messages.length - 1];
    writes.push(updateDoc(roomRef, { lastMessage }));
    await Promise.all(writes);
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.container}
        locations={[0, 0.1, 0.4, 0.94, 0.97, 1]}
        colors={["#fffe0e", "#fffe86", "white", "white", "#fffe86", "#fffe0e"]}
      >
        <View
          style={{
            height: "90%",
            paddingTop: 60,
            paddingBottom: 10,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ width: "20%", alignItems: "center" }}
              onPress={() => navigation.goBack()}
            >
              <Image
                style={{ height: 34, width: 34 }}
                source={require("../assets/back.png")}
              />
            </TouchableOpacity>
            <View
              style={{
                width: "60%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={
                  route.params.user.userDoc
                    ? { uri: route.params.user.userDoc.photoURL }
                    : require("../assets/nj-bunny.png")
                }
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 35,
                }}
              />
              <Text style={styles.title}>
                {route.params.user.contactName || route.params.user.displayName}
              </Text>
            </View>
            <TouchableOpacity style={{ width: "20%", alignItems: "center" }}>
              <Image
                style={{ height: 34, width: 34 }}
                source={require("../assets/menu.png")}
              />
            </TouchableOpacity>
          </View>
          <GiftedChat
            onSend={onSend}
            messages={messages}
            user={senderUser}
            renderAvatar={null} />
        </View>
      </LinearGradient>
    </View>
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
    // alignSelf: "center",
    width: "60%",
    // textAlign: 'center',
    marginLeft: 10,
  },
});
