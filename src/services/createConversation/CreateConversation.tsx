import { db } from "../firebase/firebase.ts";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export const createConversation = async (
  user1: string,
  user2: string,
  lastMessage: string,
) => {
  const docRef = await addDoc(collection(db, "chats"), {
    type: "private",
    participants: [user1, user2],
    lastMessage: lastMessage,
    lastMessageAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    createdBy: user1,
  });

  const messageRef = await addDoc(
    collection(db, "chats", docRef.id, "messages"),
    {
      senderId: user1,
      text: lastMessage,
      createdAt: Timestamp.now(),
      seenBy: [user1],
    },
  );

  return {
    chatId: docRef.id,
    messageId: messageRef.id,
  };
};
