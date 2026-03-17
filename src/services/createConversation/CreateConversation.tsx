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

export const createChat = async (
  chatType: "private" | "group",
  participants: string[],
  creatorId: string,
  lastMessage: string = "",
  groupName?: string,
) => {
  try {
    const chatData: any = {
      type: chatType,
      participants,
      lastMessage,
      lastMessageAt: Timestamp.now(),
      createdAt: Timestamp.now(),
      createdBy: creatorId,
    };

    if (chatType === "group") {
      chatData.groupName = groupName || "New Group";
    }

    const chatRef = await addDoc(collection(db, "chats"), chatData);

    const messageRef = await addDoc(
      collection(db, "chats", chatRef.id, "messages"),
      {
        senderId: creatorId,
        text: lastMessage || "Group created",
        createdAt: Timestamp.now(),
        seenBy: [creatorId],
      },
    );

    return { chatId: chatRef.id, messageId: messageRef.id };
  } catch (err) {
    console.error("Error creating chat:", err);
    throw err;
  }
};
