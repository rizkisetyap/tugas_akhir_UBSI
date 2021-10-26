import React, { Component, useState, useEffect } from "react";
import { fetchUser } from "../../redux/actions/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { useTheme } from "@react-navigation/native";
const baseUrl = "http://192.168.43.152:5000";
function Register({ navigation, fetchUser }) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const maxDate = new Date();
  // api lokasi
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  // data user
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [tanggal_lahir, setTanggal_lahir] = useState(new Date());
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [telepone, setTelepone] = useState("");
  const [role, setRole] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // user alamat
  const [userProv, setUserProv] = useState("");
  const [userKab, setUserKab] = useState("");
  const [userKec, setUserKec] = useState("");
  useEffect(() => {
    let isMounted = true;
    const fetchProvinsi = async () => {
      const res = await fetch(
        "https://dev.farizdotid.com/api/daerahindonesia/provinsi"
      );
      const jsonProvinsi = await res.json();
      setProvinsi(jsonProvinsi?.provinsi);
    };
    if (isMounted) {
      fetchProvinsi();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchKab = async () => {
      const res = await fetch(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${userProv}`
      );
      const { kota_kabupaten } = await res.json();
      setKabupaten(kota_kabupaten);
    };
    if (isMounted) {
      fetchKab();
    }
    return () => {
      isMounted = false;
    };
  }, [userProv]);

  useEffect(() => {
    let isMounted = true;
    const fetchKec = async () => {
      const res = await fetch(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${userKab}`
      );
      const jsonKec = await res.json();
      setKecamatan(jsonKec?.kecamatan);
    };
    if (isMounted) {
      fetchKec();
    }

    return () => {
      isMounted = false;
    };
  }, [userKab]);

  async function onSignUp() {
    setIsLoading(true);
    if (
      nik.length <= 0 ||
      nama.length <= 0 ||
      jenisKelamin <= 0 ||
      telepone.length <= 0 ||
      email.length <= 0 ||
      password.length <= 0 ||
      userProv.length <= 0 ||
      userKab.length <= 0 ||
      userKec.length <= 0
    ) {
      Alert.alert("Gagal Mendaftar", "Pastikan semua field sudah diisi");
      setIsLoading(false);
      return;
    }

    const userData = {
      nama: nama,
      nik: nik,
      tanggal_lahir: tanggal_lahir,
      hp: telepone,
      provinsi: provinsi.filter(({ id }) => id === userProv)[0].nama,
      kabupaten: kabupaten.filter(({ id }) => id === userKab)[0].nama,
      kecamatan: kecamatan.filter(({ id }) => id === userKec)[0].nama,
      email,
    };
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, data: userData }),
    });
    if (res.status === 200) {
      setIsLoading(false);
      const uid = await res.json();
      fetchUser(uid);
      navigation.navigate("Home", { uid });
    }
    setIsLoading(false);
  }
  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View
          style={{
            backgroundColor: "#FFF",
            minWidth: "90%",
            paddingHorizontal: 24,
            paddingTop: 28,
            marginTop: 48,
            marginBottom: 24,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              textAlign: "center",
              marginBottom: 24,
              color: colors.text,
              fontWeight: "500",
            }}
          >
            Register
          </Text>

          <View style={styles.login_container}>
            {/* Input Nik */}
            <TextInput
              placeholder="Nik"
              style={styles.input}
              onChangeText={(nik) => setNik(nik)}
              keyboardType="number-pad"
            />
            {/* Input Nama */}
            <TextInput
              placeholder="Nama"
              style={styles.input}
              onChangeText={(nama) => setNama(nama)}
            />
            <Button
              title="Input Tanggal Lahir"
              onPress={() => setShowDate(true)}
            />
            {/* Input tanggal Lahir */}
            {showDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={tanggal_lahir}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || maxDate;
                  setTanggal_lahir(currentDate);
                  setShowDate(false);
                }}
              />
            )}

            {/* Kelamin Picker */}
            <View style={styles.picker}>
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
            {/* end kelamin picker */}
            {/* Role Picker */}
            <View style={styles.picker}>
              <Text style={{ fontSize: 20, color: "#333" }}>
                {role === 1 ? "User" : "Petugas"}
              </Text>
              <RNPickerSelect
                onValueChange={(value) => setRole(value)}
                placeholder={{ label: "Role", value: null }}
                useNativeAndroidPickerStyle={false}
                value={role}
                items={[
                  { label: "user", value: 1 },
                  { label: "petugas", value: 2 },
                ]}
              />
            </View>
            {/* end Role Picker */}
            {/* Provinsi picker */}
            {provinsi?.length > 0 && (
              <View style={styles.picker}>
                <Text style={{ fontSize: 20, color: "#333" }}>
                  {userProv
                    ? provinsi?.filter(({ id }) => id === userProv)[0].nama
                    : "Provinsi"}
                </Text>
                <RNPickerSelect
                  onValueChange={(value) => setUserProv(value)}
                  placeholder={{
                    label: "Provinsi",
                    value: null,
                  }}
                  useNativeAndroidPickerStyle={false}
                  value={userProv}
                  items={provinsi?.map((prov) => ({
                    label: prov.nama,
                    value: prov.id,
                  }))}
                />
              </View>
            )}
            {/* end prov picker */}
            {/* kab picker */}
            {kabupaten?.length > 0 && (
              <View style={styles.picker}>
                <Text style={{ fontSize: 20, color: "#333" }}>
                  {userKab
                    ? kabupaten?.filter(({ id }) => id === userKab)[0].nama
                    : "Kabupaten"}
                </Text>
                <RNPickerSelect
                  onValueChange={(value) => setUserKab(value)}
                  placeholder={{
                    label: "Kabupaten",
                    value: null,
                  }}
                  useNativeAndroidPickerStyle={false}
                  value={userKab}
                  items={kabupaten?.map((kab) => ({
                    label: kab.nama,
                    value: kab.id,
                  }))}
                />
              </View>
            )}
            {/* end kab picker */}
            {/* kecamatan picker */}
            {kecamatan?.length > 0 && (
              <View style={styles.picker}>
                <Text style={{ fontSize: 20, color: "#333" }}>
                  {userKec
                    ? kecamatan?.filter(({ id }) => id === userKec)[0].nama
                    : "Kecamatan"}
                </Text>
                <RNPickerSelect
                  onValueChange={(value) => setUserKec(value)}
                  placeholder={{
                    label: "Kecamatan",
                    value: null,
                  }}
                  useNativeAndroidPickerStyle={false}
                  value={userKec}
                  items={kecamatan?.map((kec) => ({
                    label: kec.nama,
                    value: kec.id,
                  }))}
                />
              </View>
            )}
            {/* end kecamatan picker */}
            {/* input no HP */}
            <TextInput
              placeholder="No. Telepon/HP"
              keyboardType="phone-pad"
              style={styles.input}
              onChangeText={(nohp) => setTelepone(nohp)}
            />
            {/* Input email */}
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              style={styles.input}
              onChangeText={(email) => setEmail(email)}
            />
            {/* Input Password */}
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.input}
              onChangeText={(pass) => setPassword(pass)}
            />
            <View
              style={{
                width: "100%",
                marginTop: 25,
                marginBottom: 13,
              }}
            >
              <TouchableOpacity
                style={{ backgroundColor: "#4285f4", paddingVertical: 10 }}
                disabled={isLoading}
                onPress={onSignUp}
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
                    Daftar
                  </Text>
                )}
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 12,
                  fontSize: 24,
                }}
              >
                <Text style={{ fontSize: 18 }}>Sudah Punya akun? </Text>
                <TouchableHighlight
                  activeOpacity={0.5}
                  underlayColor={colors.background}
                  onPress={() => navigation.navigate("Landing")}
                >
                  <Text style={{ color: "#17a2b8", fontSize: 18 }}>Login</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);
export default connect(null, mapDispatchToProps)(Register);
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 24,
  },
  login_container: {
    minWidth: "75%",
  },
  input: {
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
  picker: {
    marginVertical: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    fontSize: 18,
  },
});
