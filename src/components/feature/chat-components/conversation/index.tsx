import React, { useState, useEffect, use } from "react";
import { IoSend } from "react-icons/io5";
import { Avatar } from "flowbite-react";
import { IoMdClose } from "react-icons/io";
import FormController from "../../../form-controller";

import EditBtn from "../../../common/button/edit-button";
import { createConversation } from "../../../../services/create-conversation";
import { sendMessage } from "../../../../services/create-conversation";
import useMessages from "../../../../hooks/use-message";
import { Virtuoso } from "react-virtuoso";

import type { conversationProps } from "../../../../types/interfaces";
import useChats from "../../../../hooks/use-chat";

import Spinnerring from "../../../common/spinner";
import AddNewSpaceModal from "../../../../modals/add-newchat-modal";

const Conversation: React.FC<conversationProps> = ({
  selectedUser,
  onClose,
  currentUid,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);

  const { messages, markAsSeen } = useMessages(chatId, currentUid);
  const { chats, loading, getCreatedBy } = useChats();

  if (loading) {
    <div className="border">
      <Spinnerring />;
    </div>;
  }

  useEffect(() => {
    if (!selectedUser) return;

    if (selectedUser.chatId) {
      setChatId(selectedUser.chatId);
      return;
    }

    if (selectedUser.isGroup) {
      setChatId(selectedUser.uid);
      return;
    }

    const existingChat = chats.find(
      (chat) =>
        chat.type === "private" &&
        chat.participants.includes(selectedUser.uid) &&
        chat.participants.includes(currentUid),
    );

    if (existingChat) {
      setChatId(existingChat.id);
    }
  }, [selectedUser, chats]);

  useEffect(() => {
    if (!chatId || !currentUid || messages.length === 0) return;
    markAsSeen();
  }, [chatId, messages, currentUid]);

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
      <header className="flex items-center p-4 shadow w-full bg-white z-10">
        <Avatar
          alt="User"
          img={!selectedUser?.isGroup ? selectedUser?.profilePhoto : undefined}
          rounded
        />
        <div className="ml-3 flex justify-between w-full  items-center">
          <div>
            <h2 className="font-semibold text-lg">{selectedUser?.firstName}</h2>
            {!selectedUser?.isGroup && (
              <p className="font-light text-sm text-gray-600">
                {selectedUser?.email}
              </p>
            )}
          </div>
          <div className="flex">
            <div className="cursor-pointer  mr-3.5">
              {selectedUser?.isGroup &&
                chatId &&
                getCreatedBy(chatId) === currentUid && (
                  <>
                    <AddNewSpaceModal
                      addmode="add"
                      chatId={chatId}
                      onClose={() => setShowAddMemberModal(false)}
                    />
                  </>
                )}
            </div>

            <div onClick={onClose} className="cursor-pointer">
              <IoMdClose className="text-3xl hover:text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4 min-h-0">
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
                className={`flex mt-2 ${msg.senderId === currentUid ? "justify-end" : "justify-start"}`}
              >
                <div className="inline-flex flex-col max-w-[70%]">
                  <span className="text-gray-400 text-[10px] mb-1">
                    {}
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
        <div className="w-full flex items-center gap-2">
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
          <EditBtn
            label=""
            icon={<IoSend />}
            onClick={handleSendMessage}
            disabled={searchTerm === ""}
          />
        </div>
      </footer>
    </div>
  );
};

export default Conversation;
