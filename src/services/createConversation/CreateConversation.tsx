import { db } from "../firebase/firebase.ts";
import {
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";

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

    if (chatType === "group" || lastMessage?.trim()) {
      await addDoc(collection(db, "chats", chatRef.id, "messages"), {
        senderId: creatorId,
        text: chatType === "group" ? "Group created" : lastMessage?.trim(),
        createdAt: Timestamp.now(),
        seenBy: [creatorId],
      });
    }

    return { chatId: chatRef.id, messageId: messageRef.id };
  } catch (err) {
    console.error("Error creating chat:", err);
    throw err;
  }
};
export const sendMessage = async (
  chatId: string,
  senderId: string,
  text: string,
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

export const addMembersToGroup = async (
  chatId: string,
  newUserIds: string[],
  addedBy: string,
) => {
  try {
    console.log("this function is call add member");
    const chatRef = doc(db, "chats", chatId);

    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
      throw new Error("Chat not found");
    }

    const chatData = chatSnap.data();

    const updatedParticipants = [
      ...new Set([...chatData.participants, ...newUserIds]),
    ];

    await updateDoc(chatRef, {
      participants: updatedParticipants,
    });

    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId: addedBy,
      text: "New members added",
      createdAt: Timestamp.now(),
      seenBy: [addedBy],
    });

    return true;
  } catch (err) {
    console.error("Error adding members:", err);
    throw err;
  }
};
