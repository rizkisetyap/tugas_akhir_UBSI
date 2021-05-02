import React, { Component } from "react";
import { View, Text, Button, TextInput } from "react-native";
import firebase from "firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onSignIn = this.onSignIn.bind(this);
  }
  onSignIn() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim().toLowerCase(), password.trim())
      .then((result) => {})
      .catch((error) => {
        console.log(error.message);
      });
  }
  render() {
    return (
      <View>
        <Text>Login Screeen</Text>
        <TextInput
          onChangeText={(email) => this.setState({ email })}
          placeholder="Email..."
        />
        <TextInput
          onChangeText={(password) => this.setState({ password })}
          placeholder="Password..."
        />
        <Button title="Sign In" onPress={this.onSignIn} />
        <Text>Don't have an account ?</Text>
        <Button
          title="Register"
          onPress={() => this.props.navigation.navigate("Register")}
        />
      </View>
    );
  }
}

export default Login;
