import { combineReducers } from "redux";
import userReducer from "./user";
import anakReducer from "./anak";
const Reducer = combineReducers({
  userState: userReducer,
  anakState: anakReducer,
});

export default Reducer;
