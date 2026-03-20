import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../store/auth-slice";
import userPermissionsReducer from "../../permissionslice";
import uiReducer from "../../slice/uiSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    userPermissions: userPermissionsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
