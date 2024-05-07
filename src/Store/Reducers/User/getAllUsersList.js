import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiPost } from "../../../Helpers/Api/ApiData";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (data) => {
  const response = await ApiPost("/user/get/all", data);
  console.log(response);
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
