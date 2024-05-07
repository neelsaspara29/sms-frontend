import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiPostNoAuth } from "../../../Helpers/Api/ApiData";

export const forgetPassword = createAsyncThunk(
  "forgetPassword",
  async ({ email }, thunkAPI) => {
    try {
      const response = await ApiPostNoAuth("/admin/forget/password", { email });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const initialState = {
  loading: false,
  error: null,
  otpSent: false,
  data: null,
};

export const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {
    forgetPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.otpSent = false;
      state.data = null;
    },
    forgetPasswordSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.otpSent = true;
    },
    forgetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.otpSent = false;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpSent = false;
        state.data = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.otpSent = true;
        state.data = action.payload;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.otpSent = false;
        state.data = null;
      });
  },
});

export const {
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFailure,
} = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;
