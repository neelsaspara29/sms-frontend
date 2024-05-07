import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ApiDelete } from "../../../Helpers/Api/ApiData";

export const deleteUser = createAsyncThunk(
  "enquiry/deleteUser",
  async (userId, thunkAPI) => {
    try {
      const response = await ApiDelete(`/user/delete/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  isLoading: false,
  error: null,
};

export const deleteUserSlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {
    deleteUserPending(state) {
      state.isLoading = true;
      state.error = null;
    },
    deleteUserSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    deleteUserFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { deleteUserPending, deleteUserSuccess, deleteUserFailed } =
  deleteUserSlice.actions;
