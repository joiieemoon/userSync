import { configureStore } from "@reduxjs/toolkit";
import permissionsReducer from "../slice";
import rootReducer from "../root-reducer";

export const store = configureStore({
  reducer: {
    permissions: permissionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
