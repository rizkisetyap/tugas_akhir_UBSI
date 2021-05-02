import "react-native-gesture-handler";

import React, { Component } from "react";
import * as firebase from "firebase";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebaseConfig } from "./config/firebase";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
import LandingScreen from "./components/Landing";
import LoginScreen from "./components/auth/Login";
import RegisterScreen from "./components/auth/Register";
import WelcomeScreen from "./components/auth/Welcome";

import LoadingScreen from "./components/stateless/Loading";

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      loggedin: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedin: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedin: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loaded, loggedin } = this.state;
    if (!loaded) {
      return <LoadingScreen />;
    }
    if (!loggedin) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
