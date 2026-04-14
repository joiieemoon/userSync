import { useEffect, useState } from "react";
import { getSocket } from "../../services/socket";

const useMessages = (chatId: string, currentUid: string) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const socket = getSocket();

        if (!chatId || !socket) return;

        const previousHandler = socket.onmessage;

        socket.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);


            if (previousHandler) previousHandler(event);

            switch (data.event) {
                case "messagesList": {
                    setMessages(data.data || []);
                    break;
                }

                case "newMessage": {    
                    const msg = data.data;

                    if (msg.conversationId !== chatId) return;

                    setMessages((prev) => [...prev, msg]);

                    if (msg.senderId !== currentUid) {
                        setUnreadCount((prev) => prev + 1);
                    }

                    break;
                }

                case "messagesRead": {
                    setUnreadCount(0);
                    break;
                }

                default:
                    break;
            }
        };

      
        const joinConversation = () => {
            socket.send(
                JSON.stringify({
                    event: "joinConversation",
                    conversationId: chatId,
                })
            );

           
        };

        if (socket.readyState === WebSocket.OPEN) {
            joinConversation();
        } else {
            socket.onopen = () => {
                joinConversation();
            };
        }

        return () => {
            
            socket.onmessage = previousHandler;
        };
    }, [chatId, currentUid]);

    const markAsSeen = () => {
        const socket = getSocket();

        if (!chatId || !socket) return;

        socket.send(
            JSON.stringify({
                event: "markAsRead",
                conversationId: chatId,
                userId: currentUid,
            })
        );
    };

    return { messages, unreadCount, markAsSeen };
};

export default useMessages;
