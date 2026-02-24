import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface Permissions {
    [module: string]: {
        canAdd: boolean;
        canEdit: boolean;
        canDelete: boolean;
        canView: boolean;
    };
}

interface UserPermissionsState {
    username: string;
    permissions: Permissions;
}

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