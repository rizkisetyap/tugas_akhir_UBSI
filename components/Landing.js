import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Selamat datang..</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
