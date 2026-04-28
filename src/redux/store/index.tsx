import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import permissionReducer from "../slice";
import { persistStore, persistReducer } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, permissionReducer);
export const store = configureStore({
  reducer: {
    permission: persistedReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
