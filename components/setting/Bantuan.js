import "react-native-get-random-values";
import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";

export default function KMS({ navigation }) {
  const [fetching, setFetching] = useState(false);

  const fetchPage = async () => {
    try {
      const res = await fetch(`http://192.168.43.152:5000/artikel/anak`);
      if (res.status === 200 || res.status === 304) setFetching(false);
    } catch (error) {
      setFetching(false);
    }
  };
  // const refreshPage = useCallback(() => {
  //   setRefreshing(true);
  //   fetchPage();
  //   setRefreshing(false);
  // }, []);
  // useEffect(() => {
  //   setFetching(true);
  //   fetchPage();
  //   setFetching(false);
  // }, []);
  return (
    <>
      <View style={{ backgroundColor: "#fff" }}>
        <Text style={{ textAlign: "center", fontSize: 22, marginVertical: 15 }}>
          Panduan
        </Text>
      </View>
      {/* {fetching && (
        <ActivityIndicator animating={fetching} color="#000" size={30} />
      )} */}
      <WebView
        style={{ opacity: 0.99 }}
        source={{
          uri: `http://192.168.43.152:5000/artikel/anak`,
        }}
      />
    </>
  );
}
