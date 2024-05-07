import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiPost } from "../../../Helpers/Api/ApiData";

export const getAllFacultyUsers = createAsyncThunk(
  "users/getAll",
  async ({ page, limit, search }) => {
    const response = await ApiPost(`/faculty/get/all `, {
      page: page,
      limit: limit,
      search: search,
    });
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
      .addCase(getAllFacultyUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFacultyUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.faculty = action.payload;
      })
      .addCase(getAllFacultyUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default facultyListSlice.reducer;
