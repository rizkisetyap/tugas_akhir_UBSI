import { combineReducers } from "redux";
import userReducer from "./user";

const Reducer = combineReducers({
  userState: userReducer,
});

export default Reducer;
