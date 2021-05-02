import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading...</Text>
    </View>
  );
}

export default Loading;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
});
