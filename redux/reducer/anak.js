const initialState = {
  daftar_anak: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ANAK":
      return {
        ...state,
        daftar_anak: action.daftar_anak,
      };
    case "ADD_ANAK":
      return {
        ...state,
        daftar_anak: [...daftar_anak, action.anak],
      };
    default:
      return state;
  }
};

export default Reducer;
