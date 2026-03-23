import { chatService } from "../firebase/chat-services";
import { Timestamp } from "firebase/firestore";

export const createConversation = async (
  user1: string,
  user2: string,
  lastMessage: string,
) => {
  const docRef = await chatService.add("chats", {
    type: "private",
    participants: [user1, user2],
    lastMessage,
    lastMessageAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    createdBy: user1,
  });

  const messageRef = await chatService.add(`chats/${docRef.id}/messages`, {
    senderId: user1,
    text: lastMessage,
    createdAt: Timestamp.now(),
    seenBy: [user1],
  });

  return { chatId: docRef.id, messageId: messageRef.id };
};

export const createChat = async (
  chatType: "private" | "group",
  participants: string[],
  creatorId: string,
  lastMessage: string = "",
  groupName?: string,
) => {
  const chatData: any = {
    type: chatType,
    participants,
    lastMessage,
    lastMessageAt: Timestamp.now(),
    createdAt: Timestamp.now(),
    createdBy: creatorId,
  };

  if (chatType === "group") chatData.groupName = groupName || "New Group";

  const chatRef = await chatService.add("chats", chatData);

  if (chatType === "group" || lastMessage?.trim()) {
    await chatService.add(`chats/${chatRef.id}/messages`, {
      senderId: creatorId,
      text: chatType === "group" ? "Group created" : lastMessage?.trim(),
      createdAt: Timestamp.now(),
      seenBy: [creatorId],
    });
  }

  return { chatId: chatRef.id };
};

export const sendMessage = async (
  chatId: string,
  senderId: string,
  text: string,
) => {
  await chatService.add(`chats/${chatId}/messages`, {
    senderId,
    text,
    createdAt: Timestamp.now(),
    seenBy: [senderId],
  });

  await chatService.update("chats", chatId, {
    lastMessage: text,
    lastMessageAt: Timestamp.now(),
  });
};

export const addMembersToGroup = async (
  chatId: string,
  newUserIds: string[],
  addedBy: string,
) => {
  const chatData: any = await chatService.getById("chats", chatId);
  if (!chatData) throw new Error("Chat not found");

  const updatedParticipants = [
    ...new Set([...chatData.participants, ...newUserIds]),
  ];

  await chatService.update("chats", chatId, {
    participants: updatedParticipants,
  });

  await chatService.add(`chats/${chatId}/messages`, {
    senderId: addedBy,
    text: "New members added",
    createdAt: Timestamp.now(),
    seenBy: [addedBy],
  });

  return true;
};
