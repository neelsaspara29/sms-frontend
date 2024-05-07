import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiPut } from "../../../Helpers/Api/ApiData";

export const editFaculty = createAsyncThunk(
  "user/editFaculty",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await ApiPut("/user/edit", userData);
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

export const editFacultySlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editFaculty.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(editFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = editFacultySlice.actions;

export default editFacultySlice.reducer;
