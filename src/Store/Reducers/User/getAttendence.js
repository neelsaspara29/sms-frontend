import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiPost } from "../../../Helpers/Api/ApiData";

export const getAttendence = createAsyncThunk(
  "Student/getAttendence",
  async (data) => {
    const response = await ApiPost(`/user/attendance`, data);
    if (!response.status == 200) {
      throw new Error("Failed to fetch standard list.");
    }
    // const data = await response.json();
    // console.log("data",data)
    return response.data.data;
  },
);

export const attendanceSlice = createSlice({
  name: "student",
  initialState: {
    attendence2: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAttendence.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendence.fulfilled, (state, action) => {
        state.loading = false;
        state.attendence2 = action.payload;
      })
      .addCase(getAttendence.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default attendanceSlice.reducer;
