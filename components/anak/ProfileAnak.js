import React from "react";
import firebase from "firebase";
import "firebase/firebase-firestore";
import "firebase/firebase-auth";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
function ProfileAnak({ route, navigation }) {
  const { data } = route.params;
  const { token } = data;

  function onDelete() {
    firebase
      .firestore()
      .collection("anak")
      .doc(token)
      .delete()
      .then(() => {
        Alert.alert("Sukses", "Data berhasil di hapus");
        navigation.navigate("Home");
      })
      .catch((error) => {
        Alert.alert("Gagal", "Data gagal dihapus ");
      });
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          borderRadius: 60,
          alignItems: "center",
          marginBottom: 22,
        }}
      >
        <MaterialCommunityIcons
          name={`alpha-${data.nama[0].toLowerCase()}`}
          color="gray"
          size={100}
        />
      </View>
      <Detail text={data.token} icon="briefcase-outline" />
      <Detail text={data.nama} icon="account-box-outline" />
      <Detail text={data.jenisKelamin} icon="gender-male-female" />
      <Detail
        text={new Date(data.tanggalLahir.seconds * 1000).toDateString()}
        icon="cake"
      />
      <ActionButton onPress={onDelete} title="Hapus" color="#d9534f" />
    </View>
  );
}

export default ProfileAnak;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 35,
    marginVertical: 20,
    borderRadius: 5,
    padding: 8,
    paddingTop: 44,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  detailContainer: {
    flexDirection: "row",
    width: "85%",
    borderColor: "#333",
    borderBottomWidth: 1,
    height: 50,
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    width: 50,
    textAlign: "left",
    marginTop: 8,
  },
  text: {
    flex: 1,
    textAlign: "left",
    fontSize: 18,
  },
  action_button: {
    width: "100%",
    paddingVertical: 5,
    marginVertical: 15,
  },
});

function Detail({ text, icon }) {
  return (
    <View style={styles.detailContainer}>
      <MaterialCommunityIcons
        style={styles.icon}
        name={icon}
        color="black"
        size={36}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

function ActionButton({ title, onPress, color }) {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        Alert.alert("Peringatan", "Yakin Ingin Menghapus Data Ini?", [
          {
            text: "Batal",
            onPress: () => {
              return null;
            },
            style: "cancel",
          },
          {
            text: "hapus",
            onPress,
          },
        ])
      }
    >
      <View
        style={[
          styles.action_button,
          { backgroundColor: color, alignSelf: "flex-end" },
        ]}
      >
        <Text style={{ fontSize: 24, textAlign: "center", color: "#fff" }}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
