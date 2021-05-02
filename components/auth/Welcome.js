import React from "react";
import { View, Text, Button } from "react-native";
import firebase from "firebase";
function Welcome() {
  const handleLogout = () => {
    try {
      firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <Text>Welcome User</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
}

export default Welcome;
