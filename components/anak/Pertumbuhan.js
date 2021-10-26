import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
  RefreshControl,
  ActivityIndicator,
  Button,
} from "react-native";
import MyButton from "../parts/Button";
function Pertumbuhan({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const { data } = route.params;
  const { token } = data;
  const [dataPertumbuhan, setDataPertumbuhan] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const getData = async () => {
    try {
      const res = await fetch(
        `http://192.168.43.152:5000/pertumbuhan/${token}`
      );
      console.log(res);
      if (res.status !== 200)
        return Alert.alert("Failed to fetching Data", "Internal server error");
      const data_array = await res.json();

      setDataPertumbuhan(data_array);
      setFetching(false);
    } catch (error) {
      setFetching(false);
      return Alert.alert("Failed to fetch", error.message);
    }
  };
  const refreshPage = useCallback(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  }, []);
  useEffect(() => {
    setFetching(true);

    getData();
  }, []);
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshPage} />
      }
    >
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>Data Pertumbuhan anak</Text>

        <View
          style={{
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Button
            title="Tambah Pertumbuhan"
            onPress={() => navigation.push("TambahDataPertumbuhan")}
          />
        </View>
        {fetching && (
          <ActivityIndicator animating={fetching} color="#000" size={30} />
        )}
      </View>
      <View>
        {dataPertumbuhan.length > 0 &&
          dataPertumbuhan.map((tumbuh, index) => (
            <Card data={tumbuh} key={index} />
          ))}
      </View>
    </ScrollView>
  );
}

export default Pertumbuhan;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    width: "100%",
    borderLeftWidth: 5,
    borderLeftColor: "#17a2b8",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.54,
    marginVertical: 15,

    elevation: 5,
  },
  textCard: {
    fontSize: 18,
    marginVertical: 5,
  },
});

function Card({ data }) {
  const { umur, tanggal, bb, tb, lika } = data;
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.textCard}>
          Tanggal = {new Date(tanggal.seconds * 1000).toDateString()}
        </Text>
        <Text style={styles.textCard}>
          Umur = {parseInt(umur) < 1 ? "Kurang dari 1 Bulan" : `${umur} bulan`}
        </Text>
        <Text style={styles.textCard}>Berat Badan = {bb} kg</Text>
        <Text style={styles.textCard}>Tinggi Badan = {tb} cm</Text>
        <Text style={styles.textCard}>Lingkar Kepala {lika} cm</Text>
      </View>
    </View>
  );
}
