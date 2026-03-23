import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/interfaces";
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
    selectedUsers: User[];

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
        selectedUsers: [],

    },
};



const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {

        setSelectedUsers(state, action: PayloadAction<User[]>) {
            state.users.selectedUsers = action.payload;
        },
        addSelectedUser(state, action: PayloadAction<User>) {
            if (!state.users.selectedUsers.find(u => u.uid === action.payload.uid)) {
                state.users.selectedUsers.push(action.payload);
            }
        },
        removeSelectedUser(state, action: PayloadAction<string>) {
            state.users.selectedUsers = state.users.selectedUsers.filter(
                u => u.uid !== action.payload
            );
        },
        clearSelectedUsers(state) {
            state.users.selectedUsers = [];
        },


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
    setSelectedUsers,
    addSelectedUser,
    removeSelectedUser,
    clearSelectedUsers,
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