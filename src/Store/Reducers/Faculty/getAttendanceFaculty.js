import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiPost } from "../../../Helpers/Api/ApiData";

export const getAttendenceFaculty = createAsyncThunk(
  "Student/getAttendence",
  async (data) => {
    const response = await ApiPost(`/attendance/get`, data);
    if (!response.status == 200) {
      throw new Error("Failed to fetch standard list.");
    }
    // const data = await response.json();
    // console.log("data",data)
    return response.data.data;
  },
);

export const attendanceFacultySlice = createSlice({
  name: "faculty",
  initialState: {
    attendenceFaculty: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAttendenceFaculty.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendenceFaculty.fulfilled, (state, action) => {
        state.loading = false;
        state.attendenceFaculty = action.payload;
      })
      .addCase(getAttendenceFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default attendanceFacultySlice.reducer;
