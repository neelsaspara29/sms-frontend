import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiPostNoAuth } from "../../../Helpers/Api/ApiData";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const resetPassword = createAsyncThunk(
  "admin/resetPassword",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await ApiPostNoAuth("/admin/reset/password", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const passwordResetSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default passwordResetSlice.reducer;
