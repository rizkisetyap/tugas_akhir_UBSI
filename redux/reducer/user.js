import { USER_LOGIN, USER_LOGOUT } from "../constants/index";

const initialState = {
  currentUser: null,
  isLoggedin: false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        currentUser: action.currentUser,
        isLoggedin: action.isLoggedin,
      };
    case USER_LOGOUT:
      return {
        ...state,
        currentUser: null,
        isLoggedin: false,
      };
    default:
      return state;
  }
};

export default Reducer;
