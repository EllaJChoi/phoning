
import React, { useState, useEffect } from 'react';
import { useAssets } from "expo-asset";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, LogBox, ImageBackground } from 'react-native';
import ContextWrapper from "./context/ContextWrapper";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

import Login from './screens/Login';
import Profile from './screens/Profile';
import Messages from './screens/Messages';
import Friends from './screens/Friends';
import Calls from './screens/Calls';
import Settings from './screens/Settings';
import Chat from './screens/Chat';

import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      if (user) {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <ContextWrapper>
      <View style={styles.container}>
        <Image style={styles.loading} source={require("./assets/loading_status_loading.png")} />
        {/* progress bar */}
      </View>
      </ContextWrapper>
    );
  }

  return (
    <ContextWrapper>
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          {!user.displayName && (
            <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
          )}
          <Stack.Screen name="home" component={Home} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="chat" component={Chat} options={{ headerShown: false }} />
          <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
        </Stack.Navigator>
      )
      }
    </NavigationContainer>
    </ContextWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    width: '30%',
    height: undefined,
    aspectRatio: 243/65,
    alignSelf: 'center',
    // marginTop: 4
  },
});

function Home() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: {display: 'none'} }}>

    <Tab.Screen name="friends" component={Friends}
      // options={{ tabBarIcon: ({}) => (
      //   <Image style={{height: '180%', width: undefined, aspectRatio: 173/218}} source={require("./assets/friends.png")} />
      // ),}}
      />
    <Tab.Screen name="messages" component={Messages}
      // options={{ tabBarIcon: ({}) => (
      //   <Image style={{height: '180%', width: undefined, aspectRatio: 173/219}} source={require("./assets/messages.png")} />
      // ),}}
    />
    <Tab.Screen name="calls" component={Calls}
      // options={{ tabBarIcon: ({}) => (
      //   <Image style={{height: '180%', width: undefined, aspectRatio: 174/219}} source={require("./assets/calls.png")} />
      // ),}}
    />
    <Tab.Screen name="settings" component={Settings}
      // options={{ tabBarIcon: ({}) => (
      //   <Image style={{height: '180%', width: undefined, aspectRatio: 173/219}} source={require("./assets/settings.png")} />
      // ),}}
    />
  </Tab.Navigator>
  );
}

function Main() {
  const [assets] = useAssets(
    require("./assets/camera.png"),
    require("./assets/loading_status_loading.png"),
    require("./assets/nj-bunny.png"),
    require("./assets/friends.png"),
    require("./assets/messages.png"),
    require("./assets/calls.png"),
    require("./assets/settings.png"),
  );
  if (!assets) {
    return <Text>Loading...</Text>;
  }
  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  );
}

export default Main;