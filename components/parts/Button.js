import React from "react";
import {
  Text,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function MyButton({ title, color, onButtonPress, animating }) {
  return (
    <TouchableHighlight
      style={[styles.btn, { backgroundColor: colors[color] }]}
      onPress={onButtonPress}
    >
      {animating ? (
        <ActivityIndicator animating={animating} color="#fff" size={19} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    marginVertical: 24,
    alignSelf: "stretch",
    backgroundColor: "#138496",
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    flex: 1,
    fontSize: 18,
  },
});

const colors = {
  primary: "#0275d8",
  success: "#5cb85c",
  info: "#5bc0de",
  warning: "#0ad4e",
  danger: "#d9534f",
  light: "#f7f7f7",
  dark: "#292b2c",
};
