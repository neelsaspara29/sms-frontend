import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiPost } from "../../../Helpers/Api/ApiData";

export const editStandard = async (body) => {
  const response = await ApiPost(`/standard/edit`, body);
  console.log("edit standard", response);
  return response;
};

const initialState = {
  editing: false,
  currentStandard: null, // initialize currentStandard to null
};

export const editStandardSlice = createSlice({
  name: "standard",
  initialState,
  reducers: {
    startEditing: (state) => {
      state.editing = true;
    },
    editStandardSuccess: (state, action) => {
      state.editing = false;
      state.currentStandard = action.payload; // update the state with the edited standard
    },
    editStandardFailure: (state) => {
      state.editing = false;
    },
  },
});

export const { startEditing, editStandardSuccess, editStandardFailure } =
  editStandardSlice.actions;

export default editStandardSlice.reducer;
