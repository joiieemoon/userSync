// src/hooks/use-message/useMessage.ts
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../services/firebase/firebase";

export interface Message {
    id: string;
    senderId: string;
    text: string;
    createdAt: any;
    seenBy?: string[];
}

const useMessages = (
    chatId: string | null,
    currentUid: string | null
): { messages: Message[]; unreadCount: number; markAsSeen: () => void } => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!chatId || !currentUid) {
            setMessages([]);
            setUnreadCount(0);
            return;
        }

        const q = query(
            collection(db, "chats", chatId, "messages"),
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Message),
            }));
            setMessages(msgs);

            const unread = msgs.filter(
                (msg) =>
                    msg.senderId !== currentUid &&
                    (!msg.seenBy || !msg.seenBy.includes(currentUid))
            ).length;

            setUnreadCount(unread);
        });

        return () => unsubscribe();
    }, [chatId, currentUid]);

    //
    const markAsSeen = async () => {
        if (!chatId || !currentUid) return;

        const batchUpdate = messages
            .filter(msg => msg.senderId !== currentUid && (!msg.seenBy || !msg.seenBy.includes(currentUid)))
            .map(msg => {
                const messageRef = doc(db, "chats", chatId, "messages", msg.id);
                return updateDoc(messageRef, {
                    seenBy: arrayUnion(currentUid),
                });
            });

        await Promise.all(batchUpdate);
    };

    return { messages, unreadCount, markAsSeen };
};

export default useMessages;