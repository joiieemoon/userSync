
import { db } from "../firebase";
import { collection, getDoc, addDoc, updateDoc, doc, } from "firebase/firestore";

export const chatService = {

    add: async (collectionName: string, data: any) => {
        return addDoc(collection(db, collectionName), data);
    },


    update: async (collectionName: string, docId: string, data: any) => {
        return updateDoc(doc(db, collectionName, docId), data);
    },


    getById: async (collectionName: string, docId: string) => {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    },
};