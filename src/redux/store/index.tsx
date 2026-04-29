// import { configureStore } from "@reduxjs/toolkit";

// import permissionReducer from "../slice";

// export const store = configureStore({
//   reducer: {
//     permission: permissionReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import permissionsReducer from "../slice";

export const store = configureStore({
  reducer: {
    permissions: permissionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
