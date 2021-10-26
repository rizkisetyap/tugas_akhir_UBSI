import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";

function MenuAnak({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.push("Profile Anak")}>
        <View style={styles.button}>
          <MaterialCommunityIcons
            name="human-child"
            size={36}
            color="#d9534f"
          />
          <Text style={styles.text}>Profile Anak</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.push("KMS")}>
        <View style={styles.button}>
          <MaterialCommunityIcons
            name="chart-areaspline"
            size={36}
            color="#5cb85c"
          />
          <Text style={styles.text}>KMS</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.push("Pertumbuhan")}>
        <View style={styles.button}>
          <MaterialCommunityIcons name="finance" size={36} color="#0275d8" />
          <Text style={styles.text}>Pertumbuhan </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default MenuAnak;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 30,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.54,
    elevation: 5,
  },
  text: {
    fontSize: 17,
    color: "#292b2c",
    fontWeight: "bold",
  },
});
