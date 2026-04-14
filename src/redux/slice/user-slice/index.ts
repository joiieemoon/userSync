import { createSlice } from "@reduxjs/toolkit";

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

});

export default usersSlice.reducer;