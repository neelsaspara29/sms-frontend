import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiPost } from "../../../Helpers/Api/ApiData";

export const feesPendingUsers = createAsyncThunk(
  "users/getUsers",
  async (params) => {
    const { page, limit, userTypeFilter, search, pendingFeesFilter } = params;

    try {
      const response = await ApiPost("/user/get/all", {
        page,
        limit,
        userTypeFilter,
        search,
        pendingFeesFilter,
      });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },
);

const initialState = {
  pendingUsers: [],
  isLoading: false,
  error: null,
};

export const feesPendingSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsersStart: (state) => {
      state.isLoading = true;
    },
    getUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.pendingUsers = action.payload;
      state.error = null;
    },
    getUsersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(feesPendingUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(feesPendingUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingUsers = action.payload;
        state.error = null;
      })
      .addCase(feesPendingUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { getUsersStart, getUsersSuccess, getUsersFailure } =
  feesPendingSlice.actions;

export default feesPendingSlice.reducer;
