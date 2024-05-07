import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiDelete } from "../../../Helpers/Api/ApiData";

// export const deleteFaculty = createAsyncThunk(
//     'admin/deleteFaculty',
//     async (userId) => {
//       const response = await ApiDelete('/admin/user/delete/641011251035fe8a39f116b4')
//       return response.data
//     }
//   )

export const deleteFaculty = createAsyncThunk(
  "admin/deleteFaculty",
  async (facultyId) => {
    const response = await axios.delete(`/admin/user/delete/${facultyId}`);
    return response.data;
  },
);

export const deleteFacultySlice = createSlice({
  name: "admin",
  initialState: {
    deletedUser: null,
    deleteUserStatus: "idle",
    deleteUserError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteFaculty.pending, (state) => {
        state.deleteUserStatus = "loading";
        state.deleteUserError = null;
      })
      .addCase(deleteFaculty.fulfilled, (state, action) => {
        state.deleteUserStatus = "succeeded";
        state.deletedUser = action.payload;
      })
      .addCase(deleteFaculty.rejected, (state, action) => {
        state.deleteUserStatus = "failed";
        state.deleteUserError = action.error.message;
      });
  },
});

export default deleteFacultySlice.reducer;
