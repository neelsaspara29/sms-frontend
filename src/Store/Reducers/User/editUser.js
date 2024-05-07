import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiPost } from "../../../Helpers/Api/ApiData";
import axios from "axios";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (requestData) => {
    const response = await ApiPost("/user/edit", requestData);
    return response.data;
  },
);

export const editSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default editSlice.reducer;
