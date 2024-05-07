import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../../Helpers/Api/ApiData";

export const getStandardById = createAsyncThunk(
  "api/getStandardById",
  async (id) => {
    const response = await ApiGet(`/standard/${id}`);
    const data = await response.json();
    return data;
  },
);

export const getStandardByIdSlice = createSlice({
  name: "api",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStandardById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStandardById.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getStandardById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getStandardByIdSlice.reducer;
