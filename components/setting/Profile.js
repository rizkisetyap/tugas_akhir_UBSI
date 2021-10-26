import React, { useEffect, useState } from "react";

import { View, StyleSheet, Text, TextInput } from "react-native";
import { connect } from "react-redux";
const baseUrl = "http://192.168.43.152:5000";
function Profile({ currentUser }) {
  const [userData, setUserData] = useState({});

  // useEffect(() => {
  //   let Mounted = true;

  //   if (Mounted) {
  //     firebase
  //       .firestore()
  //       .collection("users")
  //       .doc(firebase.auth().currentUser.uid)
  //       .get()
  //       .then((data) => {
  //         setUserData(data.data());
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }

  //   return () => {
  //     Mounted = false;
  //   };
  // }, []);
  console.log(currentUser);
  return (
    <View style={styles.container}>
      {userData && (
        <View
          style={{
            backgroundColor: "#FFF",
            paddingHorizontal: 24,
            paddingTop: 28,
            marginTop: 48,
            marginBottom: 24,
            borderRadius: 10,
            width: "90%",
            marginVertical: 10,
            paddingBottom: 18,
          }}
        >
          <TextProfile value={currentUser.nama} label="Nama" />
          <TextProfile value={currentUser.email} label="Email" />
          <TextProfile value={currentUser.hp} label="No Hp" />
          <TextProfile value={currentUser.nik} label="NIK" />
          <TextProfile value={currentUser.provinsi} label="Provinsi" />
          <TextProfile value={currentUser.kabupaten} label="Kabupaten" />
          <TextProfile value={currentUser.kecamatan} label="Kecamatan" />
        </View>
      )}
    </View>
  );
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps, null)(Profile);
function TextProfile({ value, label }) {
  return (
    <>
      <Text style={{ fontSize: 18, marginBottom: 6 }}>{label}</Text>
      <TextInput
        style={styles.input}
        defaultValue={value}
        value={value}
        editable={false}
        selectTextOnFocus={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 24,
    width: "100%",
  },
  input: {
    color: "#000",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingHorizontal: 10,
    fontSize: 18,
    width: "100%",
    minHeight: 40,
  },
});
