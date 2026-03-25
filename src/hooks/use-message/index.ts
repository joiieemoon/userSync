
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

import { chatService } from "../../services/firebase/chat-services";



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



        const q = chatService.getMessageQuery(chatId);
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



    const markAsSeen = async () => {
        if (!chatId || !currentUid) return;

        const unseenIds = messages
            .filter(msg => msg.senderId !== currentUid && (!msg.seenBy || !msg.seenBy.includes(currentUid)))
            .map(msg => msg.id);

        await chatService.markMessagesAsSeen(chatId, unseenIds, currentUid);
    };
    return { messages, unreadCount, markAsSeen };
};

export default useMessages;