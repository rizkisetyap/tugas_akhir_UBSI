import React, { Component } from "react";
import { View, Text } from "react-native";
import firebase from "firebase";
require("firebase/firestore");
class Anak extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Tambah Anak</Text>
      </View>
    );
  }
}

export default Anak;
