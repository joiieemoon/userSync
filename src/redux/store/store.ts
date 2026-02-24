import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import userPermissionsReducer from "../permissionslice/permissionslice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    userPermissions: userPermissionsReducer,
  },
});

// types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
