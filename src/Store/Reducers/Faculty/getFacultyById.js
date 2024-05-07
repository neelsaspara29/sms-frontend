import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiGet } from "../../../Helpers/Api/ApiData";

export const getFacultyById = createAsyncThunk(
  "users/getById",
  async (userId) => {
    const response = await ApiGet("/user/64070eea34eb40e9de3acc6b");
    const data = await response.json();
    return data;
  },
);
// using dynamic id
// export const getFacultyById = createAsyncThunk(
//     'users/getById',
//     async (userId) => {
//       const response = await ApiGet(`/user/${userId}`);
//       const data = await response.json();
//       return data;
//     }
//   );

export const getFacultyByIdSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFacultyById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFacultyById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getFacultyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getFacultyByIdSlice.reducer;
