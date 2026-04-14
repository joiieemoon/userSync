import admin from "../../firebase/index.js";
import { db } from "../../firebase/index.js";

export const registerSocketHandlers = (ws, wss) => {

  ws.conversationId = null;

  console.log("User connected");

  ws.on("message", async (msg) => {
    let data;

    // safe parsing
    try {
      data = JSON.parse(msg.toString());
    } catch (err) {
      console.log("Invalid JSON");
      return;
    }

    const { event } = data;

    switch (event) {

      case "joinConversation": {
        const { conversationId } = data;

        ws.conversationId = conversationId;

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

          ws.send(JSON.stringify({
            event: "messagesList",
            data: messages
          }));

        } catch (err) {
          console.error(err);
        }

        break;
      }

    
      case "sendMessage": {
        const { conversationId, message } = data;

        try {
          const ref = db
            .collection("chats")
            .doc(conversationId)
            .collection("messages");

          const doc = await ref.add({
            ...message,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          const newMessage = {
            ...message,
            id: doc.id,
            conversationId,
            createdAt: new Date(),
          };

          // broadcast
          wss.clients.forEach(client => {
            if (
              client.readyState === 1 &&
              client.conversationId === conversationId
            ) {
              client.send(JSON.stringify({
                event: "newMessage",
                data: newMessage
              }));
            }
          });

          // update last message
          await db.collection("chats")
            .doc(conversationId)
            .update({
              lastMessage: message.text,
              lastMessageAt: admin.firestore.FieldValue.serverTimestamp(),
            });

        } catch (err) {
          console.error(err);
        }

        break;
      }

     
      case "createConversation": {
        const { data: chatData } = data;

        try {
          const doc = await db.collection("chats").add({
            ...chatData,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            lastMessage: "",
            lastMessageAt: admin.firestore.FieldValue.serverTimestamp(),
          });

          ws.send(JSON.stringify({
            event: "createConversation",
            data: { id: doc.id }
          }));

        } catch (err) {
          ws.send(JSON.stringify({
            event: "createConversation",
            data: { error: true }
          }));
        }

        break;
      }


      case "markAsRead": {
        const { conversationId, userId } = data;

        try {
          const ref = db
            .collection("chats")
            .doc(conversationId)
            .collection("messages");

          const snapshot = await ref.get();
          const batch = db.batch();

          let count = 0;

          snapshot.docs.forEach(doc => {
            const msg = doc.data();
            const seenBy = msg.seenBy || [];

            if (!seenBy.includes(userId) && msg.senderId !== userId) {
              batch.update(doc.ref, {
                seenBy: admin.firestore.FieldValue.arrayUnion(userId),
                read: true,
              });
              count++;
            }
          });

          if (count > 0) await batch.commit();

  
          wss.clients.forEach(client => {
            if (client.readyState === 1) {
              client.send(JSON.stringify({
                event: "messagesRead",
                data: { conversationId, userId }
              }));
            }
          });

        } catch (err) {
          console.error(err);
        }

        break;  
      }

    
      default:
        console.log("Unknown event:", event);
        break;
    }
  });

  ws.on("close", () => {
    console.log("User disconnected");
  });
};
