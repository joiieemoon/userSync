import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PermissionState = {
  role: string;
  permissions: Record<string, any>;
};

const initialState: PermissionState = {
  role: "",
  permissions: {},
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setPermissions: (state, action: PayloadAction<PermissionState>) => {
      state.role = action.payload.role;
      state.permissions = action.payload.permissions;
    },
    clearPermissions: (state) => {
      state.role = "";
      state.permissions = {};
    },
  },
});

export const { setPermissions, clearPermissions } = permissionsSlice.actions;

export default permissionsSlice.reducer;
