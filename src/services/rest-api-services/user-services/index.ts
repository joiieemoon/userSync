import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import type { User } from "../../../types/interfaces";
import { apiClient } from "../../api/api-client";
import { ENDPOINTS } from "../../api/end-point";
import { db } from '../../firebase/firebase';


export const usersService = {
    //firebase just for login
    getById: async (id: string) => {
        const docRef = doc(db, "Users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            return null;
        }
    },

    getAlluser: async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Users"));

            const users = querySnapshot.docs.map(doc => ({
                uid: doc.id,
                ...doc.data(),
            }));

            return users;
        } catch (error) {
            console.error("fail to get firebase users", error);
            return [];
        }
    },

    getUsers: async () => {
        try {
            const res = await apiClient.get(ENDPOINTS.USER);
            return Array.isArray(res.data) ? res.data : [];
        } catch (error) {
            console.error("fail to get users", error);
            return [];
        }
    },
    getUserById: async (id: string) => {
        try {
            const res = await apiClient.get(`${ENDPOINTS.USER}/${id}`);
            return res.data;
        } catch (error) {
            console.error("fail to get user by id", error);
            return null;
        }
    },

    addUser: async (userData: User) => {
        try {
            const response = await apiClient.post(ENDPOINTS.USER, userData);
            return response.data;
        } catch (error) {
            console.error("fail to add user", error);
            return null;
        }
    },

    updateUser: async (id: string, updatedData: User) => {
        const response = await apiClient.put(`${ENDPOINTS.USER}/${2}`, updatedData);
        return response.data;
    },


    deleteUser: async (id: string) => {
        const response = await apiClient.delete(`${ENDPOINTS.USER}/${id}`);
        return response.data;
    },
}

