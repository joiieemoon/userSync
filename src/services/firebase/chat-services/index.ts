import { db } from "../firebase";
import {
    collection,
    getDoc,
    addDoc,
    updateDoc,
    doc,
    query,
    where,
    orderBy, arrayUnion,
    serverTimestamp,
} from "firebase/firestore";

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


    createChat: async (participants: string[], createdBy: string) => {
        return addDoc(collection(db, "chats"), {
            participants,
            createdBy,
            lastMessage: "",
            lastMessageAt: serverTimestamp(),
        });
    },

    getChatsQuery: (uid: string) => {
        return query(
            collection(db, "chats"),
            where("participants", "array-contains", uid),
            orderBy("lastMessageAt", "desc")
        );
    },
    getMessageQuery: (chatId: string) => {
        return query(
            collection(db, "chats", chatId, "messages"),
            orderBy("createdAt", "asc")
        );
    },


    markMessagesAsSeen: async (chatId: string, messageIds: string[], uid: string) => {
        const updates = messageIds.map((msgId) => {
            const ref = doc(db, "chats", chatId, "messages", msgId);
            return updateDoc(ref, {
                seenBy: arrayUnion(uid),
            });
        });

        return Promise.all(updates);
    }
};
