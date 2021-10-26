import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from "react-native";
const url = "http://192.168.43.152:5000/";
function Setting({ navigation }) {
  const SignOut = () => {
    fetch(`${url}auth/logout`)
      .then((_) => navigation.navigate("Landing"))
      .catch((error) => {
        Alert.alert("Error", "Something went wrong");
      });
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        activeOpacity={0.6}
        underlayColor="ghostwhite"
        onPress={() => navigation.push("Profile")}
      >
        <View style={styles.wrapper}>
          <MaterialCommunityIcons
            name="account-circle"
            color="grey"
            size={32}
          />
          <Text style={styles.text}>Profile</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        activeOpacity={0.6}
        underlayColor="ghostwhite"
      >
        <View style={styles.wrapper}>
          <MaterialCommunityIcons
            name="information-outline"
            color="grey"
            size={32}
          />
          <Text style={styles.text}>Tentang</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        activeOpacity={0.6}
        underlayColor="ghostwhite"
        onPress={() => navigation.push("Bantuan")}
      >
        <View style={styles.wrapper}>
          <MaterialCommunityIcons
            name="help-circle-outline"
            color="grey"
            size={32}
          />
          <Text style={styles.text}>Bantuan</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        activeOpacity={0.6}
        underlayColor="ghostwhite"
        onPress={SignOut}
      >
        <View style={styles.wrapper}>
          <MaterialCommunityIcons name="logout" color="grey" size={32} />
          <Text style={styles.text}>Keluar</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

export default Setting;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 15,
  },
  button: {
    paddingTop: 10,
  },
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "grey",
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "gray",
    marginLeft: 15,
  },
});
