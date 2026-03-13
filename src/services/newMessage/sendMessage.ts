import { doc, collection, addDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.ts";

export const sendMessage = async (
  chatId: string,
  senderId: string,
  text: string
) => {
  
  await addDoc(collection(db, "chats", chatId, "messages"), {
    senderId,
    text,
    createdAt: Timestamp.now(),
    seenBy: [senderId],
  });


  await updateDoc(doc(db, "chats", chatId), {
    lastMessage: text,
    lastMessageAt: Timestamp.now(),
  });
};