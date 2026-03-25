import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth-slice";
// import userPermissionsReducer from "../../permissionslice";
import userPermissionsSlice from "../slice/permission-slice/index"
import uiReducer from "../slice/ui-slice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    userPermissions: userPermissionsSlice,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
