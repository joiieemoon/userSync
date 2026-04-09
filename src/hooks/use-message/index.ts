import { useEffect, useState } from "react";
import { socket } from "../../services/socket";

const useMessages = (
    chatId: string | null,
    currentUid: string | null
) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // JOIN + FETCH OLD MESSAGES
    useEffect(() => {
        if (!chatId) return;

        setMessages([]); // reset on chat change

        socket.emit("joinConversation", chatId);

        socket.on("messagesList", (msgs) => {
            setMessages(msgs);

            const unread = msgs.filter(
                (msg: Message) =>
                    msg.senderId !== currentUid &&
                    (!msg.seenBy || !msg.seenBy.includes(currentUid))
            ).length;

            setUnreadCount(unread);
        });

        return () => {
            socket.off("messagesList");
        };
    }, [chatId]);

    // REAL-TIME NEW MESSAGE
    useEffect(() => {
        if (!chatId) return;

        const handleNewMessage = (data: any) => {
            if (data.conversationId !== chatId) return;

            setMessages((prev) => {
                const exists = prev.find((m) => m.id === data.id);
                if (exists) return prev;

                return [...prev, data];
            });

            if (
                data.senderId !== currentUid &&
                (!data.seenBy || !data.seenBy.includes(currentUid))
            ) {
                setUnreadCount((prev) => prev + 1);
            }
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [chatId, currentUid]);

    const markAsSeen = async () => {
        if (!chatId || !currentUid) return;

        socket.emit("markAsRead", {
            conversationId: chatId,
            userId: currentUid,
        });
    };

    return { messages, unreadCount, markAsSeen };
};

export default useMessages;