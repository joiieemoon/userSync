import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../slice/auth-slice";
// import userPermissionsReducer from "../../permissionslice";
import userPermissionsSlice from "../../slice/permissionslice/index"
import uiReducer from "../../slice/uiSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    userPermissions: userPermissionsSlice,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
