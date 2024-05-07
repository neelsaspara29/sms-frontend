import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./Reducers/Authreducer/auth";
import { forgetPasswordSlice } from "./Reducers/Authreducer/forgetPassword";
import { passwordResetSlice } from "./Reducers/Authreducer/resetPassword";
import { standardsSlice } from "./Reducers/User/getStdList";
import { userSlice } from "./Reducers/User/getAllUsersList";
import { adduserSlice } from "./Reducers/User/addUser";
import { getUserSlice } from "./Reducers/User/getUserById";
import { editSlice } from "./Reducers/User/editUser";
import { deleteUserSlice } from "./Reducers/User/deleteUserById";
import { addFacultySlice } from "./Reducers/Faculty/addFaculty";
import { facultyListSlice } from "./Reducers/Faculty/facultyList";
import { getFacultyByIdSlice } from "./Reducers/Faculty/getFacultyById";
import { editFacultySlice } from "./Reducers/Faculty/editFaculty";
import { deleteFacultySlice } from "./Reducers/Faculty/deleteFaculty";
import { addStandardSlice } from "./Reducers/Standard/addStandard";
import { standardListSlice } from "./Reducers/Standard/standardList";
import { deleteStandardSlice } from "./Reducers/Standard/deleteStandardById";
import { getStandardByIdSlice } from "./Reducers/Standard/getStandardById";
import { attendanceSlice } from "./Reducers/User/getAttendence";
import { editStandardSlice } from "./Reducers/Standard/editStandardTimetable";
import { feesPendingSlice } from "./Reducers/Fees/pendingFeesUserList";
import { feesStructureSlice } from "./Reducers/Fees/feeStructureList";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { attendanceFacultySlice } from "./Reducers/Faculty/getAttendanceFaculty";
import { addFacultyAttendanceSlice } from "./Reducers/Faculty/addAttendanceFaculty";
import { userFilterSlice } from "./Reducers/User/getAllFilterStudents";

const persistConfigAuth = { key: "adminAuth_satdham", storage, version: 1 };
const persistedReducerAuth = persistReducer(persistConfigAuth, authSlice);

const combineReducer = combineReducers({
  adminAuth: persistedReducerAuth,
  forgetPassword: forgetPasswordSlice.reducer,
  passwordReset: passwordResetSlice.reducer,
  users: userSlice.reducer,
  userFilter: userFilterSlice.reducer,
  attendance: attendanceSlice.reducer,
  standard: standardsSlice.reducer,
  addUser: adduserSlice.reducer,
  getUser: getUserSlice.reducer,
  deleteUser: deleteUserSlice.reducer,
  editUser: editSlice.reducer,
  addFaculty: addFacultySlice.reducer,
  facultyList: facultyListSlice.reducer,
  getFacultyById: getFacultyByIdSlice.reducer,
  editFaculty: editFacultySlice.reducer,
  deleteFaculty: deleteFacultySlice.reducer,
  addStandard: addStandardSlice.reducer,
  standardList: standardListSlice.reducer,
  deleteStandard: deleteStandardSlice.reducer,
  getStandardById: getStandardByIdSlice.reducer,
  attendanceFaculty: attendanceFacultySlice.reducer,
  addFacultyAttendance: addFacultyAttendanceSlice.reducer,
  editStandard: editStandardSlice.reducer,
  feesPending: feesPendingSlice.reducer,
  feesStructure: feesStructureSlice.reducer,
});
const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
