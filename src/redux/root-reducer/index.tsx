import { combineReducers } from "@reduxjs/toolkit";
import permissionsReducer from "../slice";

const rootReducer = combineReducers({
  permissions: permissionsReducer,
});

export default rootReducer;