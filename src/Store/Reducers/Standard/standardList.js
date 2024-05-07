import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiPost } from "../../../Helpers/Api/ApiData";

export const standardList = createAsyncThunk(
  "standards/fetch",
  async (requestData) => {
    try {
      const response = await ApiPost("/standard/get/all", requestData);
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch standards");
    }
  },
);

const initialState = {
  standards: [],
  loading: false,
  error: null,
};

export const standardListSlice = createSlice({
  name: "standards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(standardList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(standardList.fulfilled, (state, action) => {
        state.standards = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(standardList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch standards";
      });
  },
});

export default standardListSlice.reducer;
