import { USER_LOGIN } from "../constants/index";

const initialState = {
  currentUser: null,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    default:
      return state;
  }
};

export default Reducer;
