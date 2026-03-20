import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Permissions, UserPermissionsState } from "../../types/interfaces"


const initialState: UserPermissionsState = {
    username: "",
    permissions: {},
};

const userPermissionsSlice = createSlice({
    name: "userPermissions",
    initialState,
    reducers: {
        setUserPermissions: (
            state,
            action: PayloadAction<{ username: string; permissions: Permissions }>
        ) => {
            state.username = action.payload.username;
            state.permissions = action.payload.permissions;
        },
        clearUserPermissions: (state) => {
            state.username = "";
            state.permissions = {};
        },
    },
});

export const { setUserPermissions, clearUserPermissions } =
    userPermissionsSlice.actions;

export default userPermissionsSlice.reducer;