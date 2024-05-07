import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../../Helpers/Api/ApiData";

export const getUser = createAsyncThunk("user/getUser", async (id) => {
  const response = await ApiGet(`/user/${id}`);

  if (response.error) {
    throw new Error("Failed to get user");
  }
  // const data = await response.json();
  return response;
});
const initialState = {
  user: [],
  status: "idle",
  error: null,
};
export const getUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default getUserSlice.reducer;
