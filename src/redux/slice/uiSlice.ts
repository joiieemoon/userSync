import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UsersUIState {
    sortOrder: "asc" | "desc";
    currentPage: number;
    loading: boolean;
    showModal: {
        add: boolean;
        edit: boolean;
        delete: boolean;
    };
    sidebarOpen: boolean;
}

interface UIState {
    users: UsersUIState;
}

const initialState: UIState = {
    users: {
        sortOrder: "asc",
        currentPage: 1,
        loading: true,
        showModal: {
            add: false,
            edit: false,
            delete: false,
        },
        sidebarOpen: false,
    },
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setUserSearch(state, action: PayloadAction<string>) {
            state.users.currentPage = 1;
        },
        setSortOrder(state, action: PayloadAction<"asc" | "desc">) {
            state.users.sortOrder = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.users.currentPage = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.users.loading = action.payload;
        },
      
        toggleSidebar(state) {
            state.users.sidebarOpen = !state.users.sidebarOpen;
        },
        setSidebar(state, action: PayloadAction<boolean>) {
            state.users.sidebarOpen = action.payload;
        },
        setShowModal(
            state,
            action: PayloadAction<{ type: "add" | "edit" | "delete"; value: boolean }>
        ) {
            state.users.showModal[action.payload.type] = action.payload.value;
        },
        resetUsersUI(state) {
            state.users = { ...initialState.users };
        },
    },
});

export const {
    setUserSearch,
    setSortOrder,
    setCurrentPage,
    setLoading,
    setShowModal,
    resetUsersUI,
    toggleSidebar,
    setSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;