import { createSlice,  } from "@reduxjs/toolkit";
import type { PayloadAction  } from "@reduxjs/toolkit";

interface UsersUIState {
    searchTerm: string;
    sortOrder: "asc" | "desc";
    currentPage: number;
}

interface UIState {
    users: UsersUIState;
}

const initialState: UIState = {
    users: {
        searchTerm: "",
        sortOrder: "asc",
        currentPage: 1,
    },
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setUserSearch(state, action: PayloadAction<string>) {
            state.users.searchTerm = action.payload;
            state.users.currentPage = 1; // reset page on search
        },
        setSortOrder(state, action: PayloadAction<"asc" | "desc">) {
            state.users.sortOrder = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.users.currentPage = action.payload;
        },
        resetUsersUI(state) {
            state.users = initialState.users;
        },
    },
});

export const {
    setUserSearch,
    setSortOrder,
    setCurrentPage,
    resetUsersUI,
} = uiSlice.actions;

export default uiSlice.reducer;