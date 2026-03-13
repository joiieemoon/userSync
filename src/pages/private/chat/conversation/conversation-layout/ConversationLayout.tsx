import React, { useState } from "react";

import { IoSend } from "react-icons/io5";
import { Avatar } from "flowbite-react";
import { IoMdClose } from "react-icons/io";
import FormController from "../../../../../components/form-controller";
import EditBtn from "../../../../../components/button/editbutton/Editbtn";
import { createConversation } from "../../../../../services/createConversation/CreateConversation";
import { sendMessage } from "../../../../../services/newMessage/sendMessage";
import useChats from "../../../../../hooks/useChat/useChat";

interface User {
  uid: string;
  firstName: string;
  lastName?: string;
  email: string;
  profilePhoto?: string;
}

interface conversationProps {
  selectedUser: User | null;
  onClose: () => void;
  currentUid: string;
}
const ConversationLayout: React.FC<conversationProps> = ({
  selectedUser,
  onClose,
  currentUid,
}) => {
  const { getLastMessage } = useChats();
  const [searchTerm, setSearchTerm] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!searchTerm.trim()) return;
    console.log(getLastMessage(selectedUser.uid));
    if (chatId) {
      await sendMessage(chatId, currentUid, searchTerm);
      alert(`send message ${searchTerm} to ${selectedUser?.firstName}`);
    } else {
      const result = await createConversation(
        currentUid,
        selectedUser.uid,
        searchTerm,
      );
      setChatId(result.chatId);
      alert(`send message ${searchTerm}`);
    }

    setSearchTerm("");
  };

  return (
    <div className="flex flex-col bg-gray-100 h-[calc(100vh-130px)] relative">
      <header className="flex items-center p-4  shadow  w-full  ">
        <Avatar alt="User" img={selectedUser?.profilePhoto} rounded />
        <div className="ml-3 flex justify-between w-full">
          <h2 className="font-semibold text-lg">
            {selectedUser?.firstName} {selectedUser?.lastName}
          </h2>
          <div
            onClick={onClose}
            className="hover:font-amber-200 cursor-pointer relative"
          >
            <IoMdClose className="text-3xl   hover:text-gray-600 " />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex justify-start">
          <div className="bg-white p-3 rounded-xl shadow max-w-xs">Hello!</div>
        </div>
        <div className="flex justify-end">
          <div className="bg-amber-200 p-3 rounded-xl shadow max-w-xs">
           
            {selectedUser ? getLastMessage(selectedUser.uid) : ""}
          </div>
        </div>
      </main>
      <footer className="p-4 bg-gray-100 shadow flex items-center space-x-2">
        <FormController
          control="input"
          type="text"
          name="search"
          placeholder="Type a message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <EditBtn label="" icon={<IoSend />} onClick={handleSendMessage} />
      </footer>
    </div>
  );
};

export default ConversationLayout;
