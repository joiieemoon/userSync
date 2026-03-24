import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersService } from "../../services/firebase/user-services/index.ts";


export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const data = await usersService.getAll();
    return data;
});


export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (uid: string) => {
        await usersService.delete(uid);
        return uid;
    }
);  