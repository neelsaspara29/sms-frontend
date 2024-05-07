import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiPost } from "../../../Helpers/Api/ApiData";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchFilterStudents = createAsyncThunk(
  "users/fetchUsers",
  async (data) => {
    const response = await ApiPost("/user/get/all", data);
    console.log(response);
    return response.data;
  },
);

export const userFilterSlice = createSlice({
  name: "user_filter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterStudents.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchFilterStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchFilterStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userFilterSlice.reducer;
