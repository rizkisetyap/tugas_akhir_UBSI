import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  Pressable,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "firebase";
import "firebase/firebase-firestore";
import "firebase/firebase-auth";
import { connect } from "react-redux";
// import { Picker as SelectPicker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import MyButton from "../parts/Button";
const baseUrl = "http://192.168.43.152:5000";
function TambahAnak({ navigation, currentUser }) {
  const [loading, setLoading] = useState(false);
  const [showInputDate, setShowInputDate] = useState(false);
  const [nama, setNama] = useState("");
  const [beratLahir, setBeratLahir] = useState("");
  const [panjangBadan, setPanjangBadan] = useState("");
  const [lika, setLika] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const { uid } = currentUser;
  function handleButtonPress() {
    if (
      nama.length <= 0 ||
      beratLahir.length <= 0 ||
      panjangBadan.length <= 0 ||
      lika.length <= 0 ||
      jenisKelamin.length <= 0
    ) {
      Alert.alert(
        "Gagal Menyimpan data",
        "Pastikan semua field diisi dengan valid"
      );

      return;
    }
    setLoading(true);
    const anak = {
      nama,
      tanggalLahir: firebase.firestore.Timestamp.fromDate(
        new Date(tanggalLahir)
      ),
      jenisKelamin,
      beratLahir,
      panjangBadan,
      lika,
    };
    fetch(`${baseUrl}/anak`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...anak, userRef: uid }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setLoading(false);
        if (json.status === "gagal") {
          Alert.alert("Gagal", "Data gagal di simpan");
        }
        Alert.alert("Sukses", "Data berhasil di simpan");
        setNama("");
        setBeratLahir("");
        setPanjangBadan("");
        setJenisKelamin("");
        setLika("");
        setLoading(false);
        navigation.navigate("Home");
      });
    setLoading(false);
  }
  function setDate(event, date) {
    setTanggalLahir(date);

    setShowInputDate(false);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Nama anak"
          onChangeText={(value) => setNama(value)}
        />

        <PickTTL
          value={tanggalLahir.toLocaleDateString()}
          editable={!showInputDate}
          handlePress={() => setShowInputDate(true)}
        />
        {showInputDate && (
          <DateTimePicker value={tanggalLahir} mode="date" onChange={setDate} />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: "100%",
            paddingVertical: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, color: "#333" }}>
            {jenisKelamin ? jenisKelamin : "JenisKelamin"}
          </Text>
          <RNPickerSelect
            onValueChange={(value) => setJenisKelamin(value)}
            placeholder={{ label: "jenis Kelamin", value: null }}
            useNativeAndroidPickerStyle={false}
            value={jenisKelamin}
            items={[
              { label: "Laki-Laki", value: "male" },
              { label: "Perempuan", value: "female" },
            ]}
          />
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Berat lahir (kg)"
          onChangeText={(val) => setBeratLahir(val)}
          value={beratLahir}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Panjang badan (cm)"
          onChangeText={(val) => setPanjangBadan(val)}
          value={panjangBadan}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Lingkar kepala  (cm)"
          onChangeText={(val) => setLika(val)}
          value={lika}
        />
        <MyButton
          color="info"
          title="Simpan"
          onButtonPress={handleButtonPress}
          animating={loading}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 58,
    paddingVertical: 36,
  },
  innerContainer: {
    alignItems: "center",
    width: "100%",
  },
  textInput: {
    fontSize: 20,
    textAlign: "left",
    backgroundColor: "#FFF",
    width: "100%",

    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 6,
    borderColor: "#DDD",
    borderWidth: 1,
  },
  btn: {
    flex: 1,
    marginVertical: 24,
    alignSelf: "stretch",
    backgroundColor: "#138496",
    flexDirection: "row",
    padding: 12,
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

function PickTTL({ value, editable, handlePress }) {
  return (
    <Pressable
      style={{
        padding: 5,
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={handlePress}
    >
      <TextInput
        value={value}
        style={[
          styles.textInput,
          { width: "65%", backgroundColor: "#fff", borderWidth: 0 },
        ]}
        placeholder="Tanggal Lahir"
        editable={true}
      />
      <Text
        style={{
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#DDD",
          paddingVertical: 12,
          paddingHorizontal: 5,
          borderRadius: 8,
          color: "#fff",
          backgroundColor: "#0275d8",
        }}
      >
        Tanggal Lahir{" "}
      </Text>
    </Pressable>
  );
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps, null)(TambahAnak);
