import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const roleService = {
    getAll: async () => {
        const snapshot = await getDocs(collection(db, "roles"));
        return snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
        }));
    },

    // getByName: async (roleName: string) => {
    //     const q = query(collection(db, "roles"), where("roleName", "==", roleName));
    //     const snapshot = await getDocs(q);
    //     if (!snapshot.empty) {
    //         return snapshot.docs[0].data();
    //     }
    //     return null;
    // },
    getByName: async (roleName: string) => {
        const q = query(collection(db, "roles"), where("roleName", "==", roleName));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            return snapshot.docs[0].data();
        }
    },

    create: async (data: { roleName: string; permissions?: Record<string, boolean> }) => {
        return await addDoc(collection(db, "roles"), {
            roleName: data.roleName,
            permissions: data.permissions || {},
        });
    },

    update: async (id: string, data: any) => {
        return await updateDoc(doc(db, "roles", id), data);
    },

    delete: async (id: string) => {
        return await deleteDoc(doc(db, "roles", id));
    },
};