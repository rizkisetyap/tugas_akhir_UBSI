import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  StatusBar,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import DatePicker from "react-native-datepicker";
import firebase from "firebase";
require("firebase/firestore");
class Registrasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrasi: false,
      ibu: {
        nama: "",
        tgl_lahir: new Date().toISOString(),
        agama: "",
        pendidikan: "",
        pekerjaan: "",
      },
      ayah: {
        nama: "",
        tgl_lahir: new Date().toISOString(),
        agama: "",
        pendidikan: "",
        pekerjaan: "",
      },
      alamat: {
        alamat_rumah: "",
        kecamatan: "",
        kabupaten: "",
        provinsi: "",
        no_telepon: "",
      },
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister() {
    const { ibu, ayah, alamat } = this.state;

    firebase
      .firestore()
      .collection("keluarga")
      .doc(firebase.auth().currentUser.uid)
      .set({
        ibu,
        ayah,
        alamat,
      })
      .then((_) => {
        alert("Data Berhasil Disimpan");
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }
  componentDidMount() {
    firebase
      .firestore()
      .collection("keluarga")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const { ibu, ayah, alamat } = snapshot.data();
          this.setState((prev) => ({ ...prev, ibu, ayah, alamat }));
        }
      });
  }

  render() {
    const maxDate = new Date().toISOString().substr();
    const { ibu, ayah, alamat } = this.state;
    return (
      <ScrollView>
        <View
          style={{
            marginTop: StatusBar.currentHeight,
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24, marginBottom: 15 }}>
            Identitas Keluarga
          </Text>
          {this.state.error && <Text>{this.state.error}</Text>}
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Data Ibu</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nama Ibu"
              defaultValue={ibu.nama}
              onChangeText={(nama) =>
                this.setState((prev) => ({ ibu: { ...prev.ibu, nama } }))
              }
            />
            <DatePicker
              placeholder="Tanggal Lahir"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              maxDate={maxDate}
              date={ibu.tgl_lahir}
              style={{ width: "100%" }}
              onDateChange={(tgl_lahir) =>
                this.setState((prevState) => ({
                  ibu: { ...prevState.ibu, tgl_lahir },
                }))
              }
            />
            <TextInput
              style={styles.textInput}
              placeholder="Agama Ibu"
              defaultValue={ibu.agama}
              onChangeText={(agama) =>
                this.setState((prev) => ({ ibu: { ...prev.ibu, agama } }))
              }
            />
            <TextInput
              style={styles.textInput}
              placeholder="Pendidikan Ibu"
              defaultValue={ibu.pendidikan}
              onChangeText={(pendidikan) =>
                this.setState((prev) => ({ ibu: { ...prev.ibu, pendidikan } }))
              }
            />
            <TextInput
              style={styles.textInput}
              placeholder="Pekerjaan Ibu"
              defaultValue={ibu.pekerjaan}
              onChangeText={(pekerjaan) =>
                this.setState((prev) => ({ ibu: { ...prev.ibu, pekerjaan } }))
              }
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Data Ayah</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nama Ayah"
              defaultValue={ayah.nama}
              onChangeText={(nama) =>
                this.setState((prev) => ({ ayah: { ...prev.ayah, nama } }))
              }
            />
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Tanggal Lahir"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              date={ayah.tgl_lahir}
              maxDate={maxDate}
              onDateChange={(tgl_lahir) =>
                this.setState((prevState) => ({
                  ayah: { ...prevState.ayah, tgl_lahir },
                }))
              }
            />
            <TextInput
              style={styles.textInput}
              placeholder="Agama ayah"
              defaultValue={ayah.agama}
              onChangeText={(agama) =>
                this.setState((prev) => ({ ayah: { ...prev.ayah, agama } }))
              }
            />
            <TextInput
              style={styles.textInput}
              placeholder="Pendidikan ayah"
              defaultValue={ayah.pendidikan}
              onChangeText={(pendidikan) =>
                this.setState((prev) => ({
                  ayah: { ...prev.ayah, pendidikan },
                }))
              }
            />
            <TextInput
              style={styles.textInput}
              placeholder="Pekerjaan ayah"
              defaultValue={ayah.pekerjaan}
              onChangeText={(pekerjaan) =>
                this.setState((prev) => ({ ayah: { ...prev.ayah, pekerjaan } }))
              }
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Alamat Rumah</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Alamat"
              defaultValue={alamat.alamat_rumah}
              onChangeText={(alamat_rumah) =>
                this.setState((prev) => ({
                  alamat: { ...prev.alamat, alamat_rumah },
                }))
              }
            />
            <TextInput
              style={styles.textInput}
              placeholder="Kecamatan"
              defaultValue={alamat.kecamatan}
              onChangeText={(kecamatan) =>
                this.setState((prev) => ({
                  alamat: { ...prev.alamat, kecamatan },
                }))
              }
            />
            <TextInput
              style={styles.textInput}
              placeholder="Kabupaten / kota"
              defaultValue={alamat.kabupaten}
              onChangeText={(kabupaten) =>
                this.setState((prev) => ({
                  alamat: { ...prev.alamat, kabupaten },
                }))
              }
            />
            <TextInput
              style={styles.textInput}
              placeholder="provinsi"
              defaultValue={alamat.provinsi}
              onChangeText={(provinsi) =>
                this.setState((prev) => ({
                  alamat: { ...prev.alamat, provinsi },
                }))
              }
            />
            <TextInput
              style={styles.textInput}
              placeholder="No. Telpon"
              defaultValue={alamat.no_telepon}
              onChangeText={(no_telepon) =>
                this.setState((prev) => ({
                  alamat: { ...prev.alamat, no_telepon },
                }))
              }
            />
          </View>
          <Button title="Simpan" onPress={this.handleRegister} />
        </View>
      </ScrollView>
    );
  }
}

export default Registrasi;
const styles = StyleSheet.create({
  formContainer: {
    width: "80%",
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginVertical: 20,
    backgroundColor: "skyblue",
    overflow: "hidden",
    shadowColor: "blue",
    shadowRadius: 10,
    shadowOpacity: 1,
    borderRadius: 8,
  },
  formLabel: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
  },
  textInput: {
    color: "#fff",
    fontSize: 16,
    width: "100%",
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 10,
  },
});
