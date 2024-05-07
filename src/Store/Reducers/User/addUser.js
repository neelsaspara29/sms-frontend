import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiPost } from "../../../Helpers/Api/ApiData";

const initialState = {
  user: {},
  status: "idle",
  error: null,
};

export const addUser = createAsyncThunk("user/addUser", async (user) => {
  const response = await ApiPost("/user/add", user);
  return response.data;
});

export const adduserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default adduserSlice.reducer;
