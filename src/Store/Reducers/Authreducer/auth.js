import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  access: {},
  profile: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.profile = action.payload.profile;
      state.access = action.payload.access;
    },
    setManagerLogin: (state, action) => {
      state.token = action.payload.token;
      state.access = action.payload.access;
      state.profile = action.payload.profile;
    },
    setLogout: (state) => {
      state.token = null;
    },
  },
});
export const { setLogin, setLogout, setManagerLogin } = authSlice.actions;
export default authSlice.reducer;
