import React, { useState } from "react";
import firebase from "firebase";
import "firebase/firebase-auth";
import { fetchUser } from "../redux/actions/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTheme } from "@react-navigation/native";
const baseUrl = "http://192.168.43.152:5000";
function Landing({ navigation, fetchUser }) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSignIn() {
    setIsLoading(true);
    fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        const { error, uid } = json;
        if (error) return Alert.alert("Login failed", `err:${error.message}`);
        fetchUser(uid);
        navigation.navigate("Home", { uid });
      })
      .catch((error) => {
        Alert.alert("Login Failed", `error :${error.message}`);
        setIsLoading(false);
      });
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View>
        <Text
          style={{
            fontSize: 32,
            textAlign: "center",
            marginBottom: 10,
            color: colors.text,
            fontWeight: "500",
          }}
        >
          Aplikasi KMS
        </Text>
        <Text
          style={{
            fontSize: 32,
            textAlign: "center",
            marginBottom: 50,
            color: colors.text,
            fontWeight: "500",
          }}
        >
          Selamat Datang
        </Text>
        <View style={styles.login_container}>
          {/* Input email */}
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
          />
          {/* input password */}
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Password"
            onChangeText={(pass) => setPassword(pass)}
          />
          {/* button login */}
          <TouchableHighlight style={{ marginVertical: 10 }}>
            <TouchableOpacity
              style={{ backgroundColor: "#4285f4", paddingVertical: 10 }}
              disabled={isLoading}
              onPress={onSignIn}
              activeOpacity={0.6}
            >
              {isLoading ? (
                <ActivityIndicator
                  animating={isLoading}
                  color="#fff"
                  size={18}
                />
              ) : (
                <Text
                  style={{ textAlign: "center", color: "#fff", fontSize: 16 }}
                >
                  Login
                </Text>
              )}
            </TouchableOpacity>
          </TouchableHighlight>
          <View
            style={{ flexDirection: "row", marginVertical: 12, fontSize: 24 }}
          >
            <Text style={{ fontSize: 18 }}>Belum Punya akun? </Text>
            <TouchableHighlight
              activeOpacity={0.5}
              underlayColor={colors.background}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={{ color: "#17a2b8", fontSize: 18 }}>Daftar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);
export default connect(null, mapDispatchToProps)(Landing);
const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  login_container: {
    minWidth: "66%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingHorizontal: 10,
    fontSize: 18,
    width: "100%",
    minHeight: 40,
    borderRadius: 5,
  },
});
