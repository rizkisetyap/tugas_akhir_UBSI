import "react-native-gesture-handler";

import React, { Component, useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import firebase from "firebase";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { firebaseConfig } from "./config/firebase";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
import LandingScreen from "./components/Landing";
import RegisterScreen from "./components/auth/Register";

import HomeScreen from "./components/main/Home";
import SettingScreen from "./components/main/Setting";

import TambahAnakScreen from "./components/main/TambahAnak";
import AnakScreen from "./components/anak/Home";
import ProfileScreen from "./components/setting/Profile";
import BantuanScreen from "./components/setting/Bantuan";
//redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import RootReducer from "./redux/reducer/index";
import thunk from "redux-thunk";

const store = createStore(RootReducer, applyMiddleware(thunk));
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={() => ({
              title: "Register",
              headerStyle: {
                backgroundColor: "#0275d8",
              },
              headerTintColor: "#fff",
            })}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: "Home",
              headerStyle: {
                backgroundColor: "#0275d8",
              },
              headerTintColor: "#fff",

              headerRight: () => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate("Setting")}
                >
                  <MaterialCommunityIcons
                    style={{ marginRight: 18 }}
                    color="#fff"
                    name="cog"
                    size={25}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Setting"
            component={SettingScreen}
            options={() => ({
              title: "Setting",
              headerStyle: {
                backgroundColor: "#0275d8",
              },
              headerTintColor: "#fff",
            })}
          />
          <Stack.Screen
            name="Tambah Anak"
            component={TambahAnakScreen}
            options={() => ({
              title: "Tambah Anak",
              headerStyle: {
                backgroundColor: "#0275d8",
              },
              headerTintColor: "#fff",
            })}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={() => ({
              title: "Profile",
              headerStyle: {
                backgroundColor: "#0275d8",
              },
              headerTintColor: "#fff",
            })}
          />
          <Stack.Screen
            name="Bantuan"
            component={BantuanScreen}
            options={() => ({
              title: "Panduan",
              headerStyle: {
                backgroundColor: "#0275d8",
              },
              headerTintColor: "#fff",
            })}
          />
          <Stack.Screen
            name="AnakScreen"
            component={AnakScreen}
            options={() => ({
              headerShown: false,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
