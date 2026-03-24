import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    query,
    where, Timestamp
} from "firebase/firestore";
import { db } from "../firebase";

export const roleService = {
    // getAll: async () => {
    //     const snapshot = await getDocs(collection(db, "roles"));
    //     return snapshot.docs.map((docSnap) => ({
    //         id: docSnap.id,
    //         ...docSnap.data(),
    //     }));
    // },



    getAll: async () => {
        const snapshot = await getDocs(collection(db, "roles"));

        return snapshot.docs.map((docSnap) => {
            const data = docSnap.data();

            return {
                id: docSnap.id,
                ...data,
                createdAt:
                    data.createdAt instanceof Timestamp
                        ? data.createdAt.toDate()
                        : data.createdAt || null,
            };
        });
    },
    getById: async (id: string) => {
        const snap = await getDoc(doc(db, "roles", id));
        return snap.exists() ? { id: snap.id, ...snap.data() } : null;
    },

    create: async (data: any) => {
        return addDoc(collection(db, "roles"), data);
    },

    update: async (id: string, data: any) => {
        return updateDoc(doc(db, "roles", id), data);
    },

    delete: async (id: string) => {
        return deleteDoc(doc(db, "roles", id));
    },


    getUsersByRole: async (roleName: string) => {
        const q = query(collection(db, "Users"), where("role", "==", roleName));
        const snapshot = await getDocs(q);
        return snapshot.docs;
    },
};