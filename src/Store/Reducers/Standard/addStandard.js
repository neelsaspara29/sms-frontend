import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiPost } from "../../../Helpers/Api/ApiData";

export const addStandard = createAsyncThunk(
  "standard/add",
  async (standardData, { rejectWithValue }) => {
    try {
      const response = await ApiPost("/standard/add", standardData);
      return response.data;
    } catch (error) {
      console.log(error, "erro");
      return rejectWithValue(error.message);
    }
  },
);
export const editStandard = createAsyncThunk(
  "standard/editStandard",
  async (standardData, { rejectWithValue }) => {
    try {
      const response = await ApiPost("/standard/edit", standardData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  status: "idle",
  error: null,
  success: null,
};

export const addStandardSlice = createSlice({
  name: "standard",
  initialState,
  reducers: {
    addStandardPending: (state) => {
      state.status = "loading";
    },
    addStandardSuccess: (state, action) => {
      state.status = "succeeded";
      state.success = action.payload;
    },
    addStandardFailed: (state, action) => {
      state.status = "failed";
      console.log(action, "error");
      state.error = action.error.message;
    },
  },
});

export const { addStandardPending, addStandardSuccess, addStandardFailed } =
  addStandardSlice.actions;
export default addStandardSlice.reducer;
