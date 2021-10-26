import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import firebase from "firebase";
import "firebase/firebase-firestore";
const url = "http://192.168.43.152:5000";

function TambahDataPertumbuhan({ route, navigation }) {
  const { data } = route.params;
  const { token } = data;
  const [bb, setBb] = useState();
  const [tb, setTb] = useState();
  const [lika, setLika] = useState();
  const [umur, setUmur] = useState();

  async function handleSimpan() {
    if (!bb || !tb || !lika || !umur) {
      return Alert.alert("Perhatian", "isi data dengan benar");
    }
    try {
      const tanggal = firebase.firestore.Timestamp.fromDate(
        new Date(Date.now())
      );
      const data = { bb, lika, tb, umur, tanggal };
      const config = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data }),
      };
      const res = await fetch(`${url}/pertumbuhan/${token}`, config);
      if (res.status !== 200)
        return Alert.alert("Gagagl", "Gagal Menambah data");
      Alert.alert("Sukses", "Sukses Menambah data");
      navigation.navigate("Pertumbuhan");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 50, fontSize: 24, fontWeight: "bold" }}>
        Pertumbuhan
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType="decimal-pad"
          style={styles.textInput}
          placeholder="Berat Badan kg"
          onChangeText={(berat) => setBb(berat)}
        />
        <TextInput
          keyboardType="decimal-pad"
          style={styles.textInput}
          placeholder="Tinggi Badan cm"
          onChangeText={(tinggi) => setTb(tinggi)}
        />
        <TextInput
          keyboardType="decimal-pad"
          style={styles.textInput}
          placeholder="Lingkar Kepala cm"
          onChangeText={(lk) => setLika(lk)}
        />
        <TextInput
          keyboardType="number-pad"
          style={[styles.textInput, { marginBottom: 30 }]}
          placeholder="Umur Bulan"
          onChangeText={(umur) => setUmur(umur)}
        />
        <Button title="Simpan" onPress={handleSimpan} />
      </View>
    </View>
  );
}

export default TambahDataPertumbuhan;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingTop: 30,
    alignItems: "center",
    flex: 1,
  },
  inputContainer: {
    width: "80%",
    flex: 1,
    marginTop: 20,
  },
  textInput: {
    marginBottom: 15,
    padding: 10,
    fontSize: 18,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
});
