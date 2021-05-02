import React, { Component } from "react";
import * as firebase from "firebase";
import { View, Text, Button, TextInput } from "react-native";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: "",
      email: "",
      password: "",
    };
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const { nama, email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        email.trim().toLowerCase(),
        password.trim()
      )
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            nama,
            email: email.trim().toLowerCase(),
          });
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  }

  render() {
    return (
      <View>
        <Text>Register</Text>
        <TextInput
          placeholder="Nama . . ."
          onChangeText={(nama) => this.setState({ nama })}
        />
        <TextInput
          placeholder="Email . . ."
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Password . . ."
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry={true}
        />
        <Button title="Sign Up" onPress={this.onSignUp} />
        <Text>Already have an account ?</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
      </View>
    );
  }
}

export default Register;
