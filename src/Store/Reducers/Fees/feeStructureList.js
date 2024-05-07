import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiPost } from "../../../Helpers/Api/ApiData";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const feesStructure = createAsyncThunk(
  "/standard/get/all",
  async (params) => {
    const { page, limit, search } = params;

    try {
      const response = await ApiPost("/standard/get/all", {
        page,
        limit,
        search,
      });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },
);
export const feesStructureSlice = createSlice({
  name: "standards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(feesStructure.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(feesStructure.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(feesStructure.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.error.message;
      });
  },
});

export default feesStructureSlice.reducer;
