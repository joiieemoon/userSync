import React, { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { Avatar } from "flowbite-react";
import { IoMdClose } from "react-icons/io";
import FormController from "../../../common/input/form-controller";
import Commonbutton from "../../../common/button";
import { createConversation } from "../../../../services/create-conversation";
import useMessages from "../../../../hooks/use-message";
import { Virtuoso } from "react-virtuoso";
import type { conversationProps } from "../../../../types/interfaces";
import useChats from "../../../../hooks/use-chat";
import Spinnerring from "../../../common/spinner";

import { getSocket } from "../../../../services/socket";

const Conversation: React.FC<conversationProps> = ({
  selectedUser,
  onClose,
  currentUid,
}) => {
  const [chatId, setChatId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { messages, markAsSeen } = useMessages(chatId, currentUid);
  const { chats, loading } = useChats();
console.log(messages,"messages");
  useEffect(() => {
    if (!selectedUser || chats.length === 0 || !currentUid) return;

    const existingChat = chats.find(
      (chat) =>
        chat.participants?.includes(selectedUser.uid) &&
        chat.participants?.includes(currentUid)
    );

    if (existingChat) {
      setChatId(existingChat.id);
    }
  }, [selectedUser, chats, currentUid]);
console.log(selectedUser);
  useEffect(() => {
    const socket=getSocket();
    if (!chatId) return;
    if (!socket) return;
    if (socket.readyState !== WebSocket.OPEN) return;

    socket.send(
      JSON.stringify({
        event: "joinConversation",
        conversationId: chatId,
      })
    );
  }, [chatId]);

 
  useEffect(() => {
    if (!chatId || !currentUid) return;
    if (messages.length > 0) {
      markAsSeen();
    }
  }, [chatId, messages, currentUid]);


  const handleSendMessage = async () => {
    if (!searchTerm.trim()) return;
    const socket = getSocket();
if (!socket || socket.readyState !== WebSocket.OPEN) return;
 

    const payload = {
      text: searchTerm,
      senderId: currentUid,
      seenBy: [],
    };

    if (chatId) {
      socket.send(
        JSON.stringify({
          event: "sendMessage",
          conversationId: chatId,
          message: payload,
        })
      );
    } else {
      const result = await createConversation(
        currentUid,
        selectedUser.uid,
        searchTerm
      );

      setChatId(result.chatId);

      socket.send(
        JSON.stringify({
          event: "sendMessage",
          conversationId: result.chatId,
          message: payload,
        })
      );
    }

    setSearchTerm("");
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp?.toDate?.() || new Date(timestamp);

    return date.toLocaleTimeString([], {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <Spinnerring />;
  }

  return (
    <div className="flex flex-col bg-gray-100 h-[calc(100vh-130px)] relative">

      {/* HEADER */}
      <header className="flex items-center p-4 shadow w-full bg-white z-10">
        <Avatar
          alt="User"
          img={!selectedUser?.isGroup ? selectedUser?.profilePhoto : undefined}
          rounded
        />

        <div className="ml-3 flex justify-between w-full items-center">
          <div>
            <h2 className="font-semibold text-lg">
              {selectedUser?.firstName}
            </h2>

            {!selectedUser?.isGroup && (
              <p className="font-light text-sm text-gray-600">
                {selectedUser?.email}
              </p>
            )}
          </div>

          <div onClick={onClose} className="cursor-pointer">
            <IoMdClose className="text-3xl hover:text-gray-600" />
          </div>
        </div>
      </header>

      {/* MESSAGES */}
      <main className="flex-1 flex flex-col p-4 min-h-0">
        {!messages.length ? (
          <h1 className="text-center text-gray-400 mt-10">
            Start conversation
          </h1>
        ) : (
          <Virtuoso
            style={{ flex: 1, minHeight: 0 }}
            data={messages}
            followOutput="auto"
            itemContent={(index, msg) => (
              <div
                className={`flex mt-2 ${
                  msg.senderId === currentUid
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="inline-flex flex-col max-w-[70%]">
                  <span className="text-gray-400 text-[10px] mb-1">
                    {formatTime(msg.createdAt)}
                  </span>

                  <div
                    className={`p-3 rounded-xl break-words w-fit ${
                      msg.senderId === currentUid
                        ? "bg-amber-200 self-end !rounded-br-none"
                        : "bg-white !rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            )}
          />
        )}
      </main>

      {/* INPUT */}
      <footer className="p-4 bg-gray-100 flex items-center gap-2 shadow">
        <div className="flex-1">
          <FormController
            control="input"
            name="message"
            placeholder="Type a message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="w-full border-none !rounded-3xl"
          />
        </div>

        <Commonbutton
          label=""
          icon={<IoSend />}
          onClick={handleSendMessage}
          disabled={!searchTerm.trim()}
        />
      </footer>
    </div>
  );
};

export default Conversation;