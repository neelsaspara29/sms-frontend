import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGetNoAuth, ApiGet } from "../../../Helpers/Api/ApiData";

export const fetchStandards = createAsyncThunk(
  "standard/fetchStandards",
  async (data) => {
    console.log("userDAta", data);
    const response = await ApiGet(`/standard/get/list`);
    if (!response.status == 200) {
      throw new Error("Failed to fetch standard list.");
    }
    // const data = await response.json();
    // console.log("data",data)
    return response.data.data;
  },
);

export const standardsSlice = createSlice({
  name: "standard",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStandards.pending, (state, action) => {
        state.loading = true;
        console.log("pending", action.payload);
        state.error = null;
      })
      .addCase(fetchStandards.fulfilled, (state, action) => {
        console.log("fullfilled", action.payload);
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStandards.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default standardsSlice.reducer;
