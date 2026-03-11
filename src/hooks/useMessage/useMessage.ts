import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../components/firebase/firebase.ts";

type Message = {
    id: string;
    senderId: string;
    text: string;
    createdAt: any;
    seenBy: string[];
};

export const useMessage = (conversationId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!conversationId) return; 

        const q = query(
            collection(db, "conversations", conversationId, "messages"),
            orderBy("createdAt")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs: Message[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log("Messages:", msgs);
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [conversationId]);

    return messages;
};
