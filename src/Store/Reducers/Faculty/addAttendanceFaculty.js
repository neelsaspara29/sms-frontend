import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiPost } from "../../../Helpers/Api/ApiData";

export const addFacultyAttendance = createAsyncThunk(
  "user/addAttendance",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await ApiPost("/attendance/add", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  user: {},
  loading: false,
  error: null,
};

export const addFacultyAttendanceSlice = createSlice({
  name: "facultyAttendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFacultyAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFacultyAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(addFacultyAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { } = addFacultyAttendance.actions;

export default addFacultyAttendance.reducer;
