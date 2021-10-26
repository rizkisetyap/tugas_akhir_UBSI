import firebase from "firebase";
require("firebase/firestore");
require("firebase/auth");
import { USER_LOGIN } from "../constants/index";
const baseUrl = "http://192.168.43.152:5000";
export function fetchUser(uid) {
  return (dispatch) => {
    fetch(`${baseUrl}/auth/user/${uid}`)
      .then((res) => res.json())
      .then((user) =>
        dispatch({
          type: USER_LOGIN,
          currentUser: { ...user, uid },
          isLoggedin: true,
        })
      );
  };
}
export function fetchAnak(userRef) {
  return (dispatch) => {
    fetch(`${baseUrl}/anak/${userRef}`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "FETCH_ANAK", daftar_anak: data }))
      .catch((error) => console.log(error));
  };
}

export default function addAnak(data) {
  return (dispatch) => {};
}
