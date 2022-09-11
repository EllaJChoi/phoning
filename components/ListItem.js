import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image,StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GlobalContext from "../context/Context";
import { Grid, Row, Col } from "react-native-easy-grid";
import Avatar from "./Avatar";
import Modal from "react-native-modal";

export default function ListItem({
  type,
  description,
  user,
  style,
  time,
  room,
  image,
}) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Text>{JSON.stringify(user)}</Text>
      {user.userDoc && (
    <TouchableOpacity
      style={{ height: 70, ...style }}
      onPress={() =>
        type === "contacts"
          ? showModal()
          : navigation.navigate("chat", { user, room, image })
      }
    >
      <Grid style={{ maxHeight: 70 }}>
        <Col
          style={{ width: 70, alignItems: "center", justifyContent: "center" }}
        >
          <Avatar user={user} size={type === "contacts" ? 55 : 65} />
        </Col>
        <Col style={{ borderBottomWidth: 1, borderBottomColor: "#a9a9a966" }}>
          <Row style={{ marginLeft: 10, marginTop: 10 }}>
            <Col>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: "black" }}
              >
                { user.contactName || user.userDoc && user.userDoc.displayName }
              </Text>
            </Col>
            {time && (
              <Col style={{ alignItems: "flex-end" }}>
                <Text style={{ color: "gray", fontSize: 11 }}>
                  {new Date(time.seconds * 1000).toLocaleDateString()}
                </Text>
              </Col>
            )}
          </Row>
          {description && (
            <Row style={{ marginTop: -5 }}>
              <Text style={{ color: "gray", fontSize: 13 }}>{description}</Text>
            </Row>
          )}
        </Col>
      </Grid>
    </TouchableOpacity>
      )}
    <Modal animationIn={'fadeIn'} animationOut={'fadeOut'} backdropOpacity={0.5} isVisible={modalVisible} onBackdropPress={() => hideModal()}>
        <View style={{width: '85%', borderRadius: 20, alignSelf: 'center', backgroundColor: 'white'}}>
        <Image style={{borderTopLeftRadius: 20, borderTopRightRadius: 20, height: undefined, width: '100%', aspectRatio: 1/1}} source={ user.photoURL ? { uri: user.photoURL } : require("../assets/nj-bunny.png")} />
          <Text
            style={{ textAlign: "center", paddingTop: 20, paddingBottom: 10, fontSize: 22, fontWeight: '600' }}
          >
            { user.contactName || user.userDoc && user.userDoc.displayName }
          </Text>
            {/* <Text style={{textAlign: 'center', marginBottom: 20}}>Not a member</Text> */}
          <TouchableOpacity
          underlayColor="none"
          onPress={() => {navigation.navigate("chat", { user, room, image }); hideModal()}}
        >
          <LinearGradient
            style={styles.button}
            locations={[0, 0.3]}
            colors={["white", "#92e141"]}
          >
            <Text style={styles.buttonText}>Chat 💬</Text>
          </LinearGradient>
          </TouchableOpacity>
          </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 90,
    marginBottom: 30,
    marginTop: 5,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#000",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: "#000",
    textAlign: "center",
  },
})