import firebase from "firebase";
import { USER_LOGIN } from "../constants/index";
export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_LOGIN, currentUser: snapshot.data() });
        } else {
          console.log("data doesnt exist");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}
