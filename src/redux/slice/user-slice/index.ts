import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, deleteUser, } from "../../thunks";

import type { User } from "../../../types/interfaces";

interface UsersState {
    users: User[];
    loading: boolean;
}

const initialState: UsersState = {
    users: [],
    loading: false,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => { state.loading = true; })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state) => { state.loading = false; })

            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(u => u.id !== action.payload);
            })

        // .addCase(updateUser.fulfilled, (state, action) => {
        //     const index = state.users.findIndex(u => u.id === action.payload.id);
        //     if (index !== -1) {
        //         state.users[index] = { ...state.users[index], ...action.payload.data };
        //     }
        // })

        // .addCase(createUser.fulfilled, (state, action) => {
        //     state.users.push({ id: action.payload.id, ...action.payload.data });
        // });
    },
});

export default usersSlice.reducer;