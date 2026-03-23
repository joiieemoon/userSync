import { collection, getDocs, getDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const usersService = {
    getAll: async () => {
        const snapshot = await getDocs(collection(db, 'Users'));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    update: async (id: string, data: any) => {
        return updateDoc(doc(db, 'Users', id), data);
    },

    create: async (id: string, data: any) => {
        return setDoc(doc(db, 'Users', id), data);
    },

    delete: async (id: string) => {
        return deleteDoc(doc(db, 'Users', id));
    },
    getById: async (id: string) => {
        const docRef = doc(db, "Users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    },

};