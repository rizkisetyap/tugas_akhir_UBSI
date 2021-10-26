import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MenuAnak from "./MenuAnak";
import ProfileAnak from "./ProfileAnak";
import KMS from "./KMS";
import Pertumbuhan from "./Pertumbuhan";
import TambahDataPertumbuhan from "./TambahDataPertumbuhan";
const Stack = createStackNavigator();

function AnakScreen({ route, navigation }) {
  const { data } = route.params;
  return (
    <Stack.Navigator initialRouteName="Menu Anak">
      <Stack.Screen
        name="Menu Anak"
        options={() => ({
          title: data.nama,
          headerStyle: {
            backgroundColor: "#0275d8",
          },
          headerTintColor: "#fff",
        })}
        component={MenuAnak}
      />
      <Stack.Screen
        name="Profile Anak"
        options={() => ({
          title: data.nama,
          headerStyle: {
            backgroundColor: "#0275d8",
          },
          headerTintColor: "#fff",
        })}
        component={ProfileAnak}
        initialParams={{ data }}
      />
      <Stack.Screen
        name="KMS"
        options={() => ({
          title: data.nama,
          headerStyle: {
            backgroundColor: "#0275d8",
          },
          headerTintColor: "#fff",
        })}
        component={KMS}
        initialParams={{ data }}
      />
      <Stack.Screen
        name="Pertumbuhan"
        options={() => ({
          title: data.nama,
          headerStyle: {
            backgroundColor: "#0275d8",
          },
          headerTintColor: "#fff",
        })}
        component={Pertumbuhan}
        initialParams={{ data }}
      />
      <Stack.Screen
        name="TambahDataPertumbuhan"
        options={() => ({
          title: `Pertumbuhan ${data.nama}`,
          headerStyle: {
            backgroundColor: "#0275d8",
          },
          headerTintColor: "#fff",
        })}
        component={TambahDataPertumbuhan}
        initialParams={{ data }}
      />
    </Stack.Navigator>
  );
}

export default AnakScreen;
