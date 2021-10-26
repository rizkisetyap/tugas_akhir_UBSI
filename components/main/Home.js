import React, { useEffect, useState, useCallback } from "react";
import firebase from "firebase";
import "firebase/firebase-firestore";
import "firebase/firebase-auth";
//redux
import { fetchAnak, fetchUser } from "../../redux/actions/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
  TouchableHighlight,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
function Home({
  route,
  navigation,
  fetchAnak,
  daftar_anak,
  currentUser,
  fetchUser,
}) {
  const [refreshing, setRefreshing] = useState(false);
  const { uid } = route.params;
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (!currentUser) {
        navigation.navigate("Landing");
        return () => {
          isMounted = false;
        };
      }
    }
    fetchAnak(uid);
    // fetchUser(uid);

    return () => {
      isMounted = false;
    };
  }, []);
  const refreshPage = useCallback(() => {
    setRefreshing(true);
    fetchAnak(uid);
    setRefreshing(false);
  }, []);
  return (
    <View style={{ minHeight: "100%" }}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshPage} />
        }
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            marginHorizontal: 14,
            marginVertical: 16,
            padding: 10,
          }}
        >
          {daftar_anak?.length > 0 &&
            daftar_anak?.map((an, i) => (
              <CardAnak
                onPress={() => navigation.navigate("AnakScreen", { data: an })}
                key={i}
                an={an}
              />
            ))}
        </View>
      </ScrollView>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Tambah Anak")}
        style={{
          width: "100%",
        }}
      >
        <View style={styles.float_btn}>
          <MaterialCommunityIcons name="plus-thick" size={36} color="#fff" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

function CardAnak({ an, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            marginVertical: 5,
            marginLeft: 20,
          }}
        >
          {an.nama}
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginVertical: 5,
            color: "#6c757d",
            marginLeft: 20,
          }}
        >
          Token : {an.token}
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginVertical: 5,
            color: "#6c757d",
            marginLeft: 20,
          }}
        >
          Tgl Lahir : {new Date(an.tanggalLahir.seconds * 1000).toDateString()}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
const mapStateToProps = (store) => ({
  daftar_anak: store.anakState.daftar_anak,
  currentUser: store.userState.currentUser,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchAnak, fetchUser }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    position: "relative",
  },
  cardContainer: {
    width: "75%",
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
  float_btn: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#0275d8",
    position: "absolute",
    right: 25,
    bottom: 100,
  },
});

function FloatingButton({ onPress }) {
  return (
    <TouchableHighlight onPress={() => console.log("okk")} activeOpacity={0.6}>
      <View style={styles.float_btn}>
        <MaterialCommunityIcons name="plus-thick" size={36} color="#fff" />
      </View>
    </TouchableHighlight>
  );
}
