import { createSlice } from "@reduxjs/toolkit";
import { ApiPostNoAuth } from "../../../Helpers/Api/ApiData";

export const verifyOtp = async ({ email, otp }) => {
  const response = await ApiPostNoAuth("/admin/otp/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message);
  }

  return await response.json();
};

const initialState = {
  isVerifyingOtp: false,
  verificationError: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startVerification: (state) => {
      state.isVerifyingOtp = true;
    },
    verificationSuccess: (state) => {
      state.isVerifyingOtp = false;
      state.isAuthenticated = true;
      state.verificationError = null;
    },
    verificationFailure: (state, action) => {
      state.isVerifyingOtp = false;
      state.isAuthenticated = false;
      state.verificationError = action.payload;
    },
  },
});

export const { startVerification, verificationSuccess, verificationFailure } =
  authSlice.actions;

export const verifyOtpThunk =
  ({ email, otp }) =>
  async (dispatch) => {
    try {
      dispatch(startVerification());

      const response = await verifyOtp({ email, otp });

      if (response.success) {
        dispatch(verificationSuccess());
      } else {
        dispatch(verificationFailure(response.message));
      }
    } catch (error) {
      dispatch(verificationFailure(error.message));
    }
  };

export default authSlice.reducer;
