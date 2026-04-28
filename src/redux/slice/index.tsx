import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
  access: {},
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    setPermissions: (state, action) => {
      const { role, permissions } = action.payload;

      state.role = role;

      const formatted = {};

      permissions.forEach((perm) => {
        formatted[perm.moduleSlug] = {
          list: !!perm.list,
          view: !!perm.view,
          add: !!perm.add,
          edit: !!perm.edit,
          delete: !!perm.delete,
        };
      });

      state.access = formatted;
    },

    clearPermissions: (state) => {
      state.role = null;
      state.access = {};
    },
  },
});

export const { setPermissions, clearPermissions } = permissionSlice.actions;
export default permissionSlice.reducer;
