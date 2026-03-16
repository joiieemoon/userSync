import React, { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { Avatar } from "flowbite-react";
import { IoMdClose } from "react-icons/io";
import FormController from "../../../../../components/form-controller";
import EditBtn from "../../../../../components/button/editbutton/Editbtn";
import { createConversation } from "../../../../../services/createConversation/CreateConversation";
import { sendMessage } from "../../../../../services/newMessage/sendMessage";
import useChats from "../../../../../hooks/use-chat/useChat";
import useMessages from "../../../../../hooks/use-message/useMessage";
import { Virtuoso } from "react-virtuoso";
import type { conversationProps } from "../Conversation";

const ConversationLayout: React.FC<conversationProps> = ({
  selectedUser,
  onClose,
  currentUid,
  onUnreadCountChange,
}) => {
  const { chats } = useChats();

  const [searchTerm, setSearchTerm] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);

  const { messages, unreadCount } = useMessages(chatId, currentUid);

  // Update parent with unread count whenever it changes
  // useEffect(() => {
  //   if (onUnreadCountChange && chatId !== null) {
  //     onUnreadCountChange(chatId, unreadCount);
  //   }
  // }, [unreadCount, chatId, onUnreadCountChange]);

  useEffect(() => {
    if (!selectedUser) return;
    const existing = chats.find((chat) =>
      chat.participants.includes(selectedUser.uid),
    );
    setChatId(existing?.id || null);
  }, [selectedUser, chats]);

  const handleSendMessage = async () => {
    if (!selectedUser || !searchTerm.trim()) return;

    if (chatId) {
      await sendMessage(chatId, currentUid, searchTerm);
    } else {
      const result = await createConversation(
        currentUid,
        selectedUser.uid,
        searchTerm,
      );
      setChatId(result.chatId);
    }
    setSearchTerm("");
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col bg-gray-100 h-[calc(100vh-130px)] relative">
      <header className="flex items-center p-4 shadow w-full">
        <Avatar alt="User" img={selectedUser?.profilePhoto} rounded />
        <div className="ml-3 flex justify-between w-full">
          <h2 className="font-semibold text-lg">
            {selectedUser?.firstName} {selectedUser?.lastName}
            <p className="font-light text-sm text-gray-600">
              {selectedUser?.email}
            </p>
          </h2>
          <div
            onClick={onClose}
            className="hover:font-amber-200 cursor-pointer"
          >
            <IoMdClose className="text-3xl hover:text-gray-600" />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4">
        {!messages.length ? (
          <h1 className="text-center text-gray-400 mt-10">
            Start conversation
          </h1>
        ) : (
          <Virtuoso
            style={{ flex: 1 }}
            data={messages}
            followOutput="auto"
            itemContent={(index, msg) => (
              <div
                className={`flex mt-2 ${
                  msg.senderId === currentUid ? "justify-end" : "justify-start"
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

      <footer className="p-4 bg-gray-100 flex items-center gap-2 shadow">
        <div className="w-full p-2 flex items-center gap-2 rounded">
          <FormController
            control="textarea"
            rows={1}
            name="search"
            placeholder="Type a message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="w-full border-none rounded-3xl"
          />
          <EditBtn label="" icon={<IoSend />} onClick={handleSendMessage} />
        </div>
      </footer>
    </div>
  );
};

export default ConversationLayout;
