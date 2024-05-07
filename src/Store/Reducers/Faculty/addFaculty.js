import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiPost } from "../../../Helpers/Api/ApiData";

export const addUserFaculty = createAsyncThunk(
  "user/add",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await ApiPost("/user/add", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addFacultySlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    error: null,
  },
  reducers: {
    userRequest: (state) => {
      state.isLoading = true;
    },
    userSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    userFailure: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
  },
});

export const { userRequest, userSuccess, userFailure } =
  addFacultySlice.actions;
export default addFacultySlice.reducer;
