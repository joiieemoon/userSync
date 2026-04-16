import admin from "../../firebase/index.js";
import { db } from "../../firebase/index.js";
let onlineUsers = new Set();

let activeChatUsers = new Map();
export const registerSocketHandlers = (io) => {
    io.on("connection", (socket) => {

        socket.on("joinConversation", async (conversationId) => {
            socket.join(conversationId);

            try {
                const snapshot = await db
                    .collection("chats")
                    .doc(conversationId)
                    .collection("messages")
                    .orderBy("createdAt", "asc")
                    .get();

                const messages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));


                socket.emit("messagesList", messages);

            } catch (err) {
                console.error("fetch messages error:", err);
            }
        });


        socket.on("sendMessage", async ({ conversationId, message }) => {
            console.log(" sendMessage event");
            console.log(" conversationId:", conversationId);
            console.log(" message:", message);

            try {
                const ref = db
                    .collection("chats")
                    .doc(conversationId)
                    .collection("messages");

                const doc = await ref.add({
                    ...message,
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                });

                console.log(" Message saved:", doc.id);

                const newMessage = {
                    ...message,
                    conversationId,
                    id: doc.id,
                    createdAt: new Date(),
                };

                // Emit message
                io.to(conversationId).emit("newMessage", newMessage);
                console.log(` Emitted newMessage  ${conversationId}`);

                // Update last message
                await db.collection("chats")
                    .doc(conversationId)
                    .update({
                        lastMessage: message.text,
                        lastMessageAt: admin.firestore.FieldValue.serverTimestamp(),
                    });


            } catch (err) {
                console.error(" sendMessage error:", err);
            }
        });


        socket.on("createConversation", async (data, callback) => {
            console.log("createConversation");

            try {
                const doc = await db.collection("chats")
                    .add({
                        ...data,
                        createdAt: admin.firestore.FieldValue.serverTimestamp(),
                        lastMessage: "",
                        lastMessageAt: admin.firestore.FieldValue.serverTimestamp(),
                    });

                console.log(" Chat created:", doc.id);

                callback({ id: doc.id });
            } catch (err) {
                console.error(" createConversation error:", err);
                callback({ error: true });
            }
        });


        socket.on("markAsRead", async ({ conversationId, userId }) => {

            try {
                const ref = db
                    .collection("chats")
                    .doc(conversationId)
                    .collection("messages");

                const snapshot = await ref.get();
                const batch = db.batch();

                let count = 0;

                snapshot.docs.forEach((doc) => {
                    const data = doc.data();
                    const seenBy = data.seenBy || [];


                    if (!seenBy.includes(userId) && data.senderId !== userId) {
                        batch.update(doc.ref, {
                            seenBy: admin.firestore.FieldValue.arrayUnion(userId),
                            read: true,
                        });
                        count++;
                    }
                });


                if (count > 0) {
                    await batch.commit();
                }




                io.to(conversationId).emit("messagesRead", {
                    conversationId,
                    userId,
                });

            } catch (err) {
                console.error("markAsRead error:", err);
            }
        });

        socket.on("leaveDashboard", (soceket) => {
            console.log("leave dashboard ", soceket);
        });
        socket.on("disconnect", () => {
            console.log(" User disconnected:", socket.id);
        });
    });
    io.of("/chat").on("connection", (socket) => {
        console.log("chat connected:", socket.id);
        socket.on("chat-active", (data) => {
            const userId = data.currentUid;

            const count = activeChatUsers.get(userId) || 0;
            activeChatUsers.set(userId, count + 1);

            io.of("/chat").emit("activeCount", activeChatUsers.size);
        });
      

        socket.on("chat-inactive", (data) => {
            const userId = data.currentUid;

            const count = activeChatUsers.get(userId);

            if (count <= 1) {
                activeChatUsers.delete(userId);
            } else {
                activeChatUsers.set(userId, count - 1);
            }

            io.of("/chat").emit("activeCount", activeChatUsers.size);
        });
        socket.on("disconnect", () => {
            if (socket.userId) {
                activeChatUsers.delete(socket.userId);

                io.of("/chat").emit("activeCount", activeChatUsers.size);
            }

            console.log("chat disconnected:", socket.id);
        });
    });




};