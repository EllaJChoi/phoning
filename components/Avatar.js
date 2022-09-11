import React from "react";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Avatar({ size, user }) {
  return (
    // <Image
    //   style={{
    //     width: size,
    //     height: size,
    //     borderRadius: size,
    //   }}
    //   source={
    //     user.photoURL
    //       ? { uri: user.photoURL }
    //       : require("../assets/camera.png")
    //   }
    //   resizeMode="cover"
    // />
    <LinearGradient
            style={{width: size, height: size,borderRadius: size, justifyContent: 'center', borderWidth: 1}}
            locations={[0, 0.3]}
            colors={["white", "#92e141"]}
          >
            <Image
              source={
                    user.photoURL
                      ? { uri: user.photoURL }
                      : require("../assets/nj-bunny.png")
                  }
              style={{ width: "90%", height: "90%", borderRadius: size, alignSelf: 'center' }}
            />
            </LinearGradient>
  );
}