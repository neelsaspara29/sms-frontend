import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiPost } from "../../../Helpers/Api/ApiData";

export const fetchFilterFaculty = createAsyncThunk(
  "users/getAll",
  async (body) => {
    const response = await ApiPost(`/faculty/get/all `, body);
    const data = await response.data;
    return data;
  },
);

export const facultyListSlice = createSlice({
  name: "users",
  initialState: {
    faculty: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterFaculty.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilterFaculty.fulfilled, (state, action) => {
        state.loading = false;
        state.faculty = action.payload;
      })
      .addCase(fetchFilterFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default facultyListSlice.reducer;
