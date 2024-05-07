import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiDelete } from "../../../Helpers/Api/ApiData";

export const deleteStandard = createAsyncThunk(
  "deleteStandard/delete",
  async (id, thunkAPI) => {
    try {
      const response = await ApiDelete(`/standard/delete/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  loading: false,
  error: null,
  success: false,
};

export const deleteStandardSlice = createSlice({
  name: "deleteStandard",
  initialState,
  reducers: {
    deleteStandardStart(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    deleteStandardSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    deleteStandardFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  deleteStandardStart,
  deleteStandardSuccess,
  deleteStandardFailure,
} = deleteStandardSlice.actions;

export default deleteStandardSlice.reducer;
