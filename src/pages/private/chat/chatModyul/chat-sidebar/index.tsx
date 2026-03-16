import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import avtar from "../../../../../../public/avtar.png";
import SearchBar from "../../../../../components/SearchBar/SearchBar";
import AddNewChatModal from "../../../../../modals/AddNewChatModal/AddNewChatModal";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
import Spinnerring from "../../../../../components/spinner/Spinnerring";
import type { ChatSidebarProps } from "../../conversation/Conversation";

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  users,
  loading,
  currentUid,
  setSelectedUser,
  unreadCounts,
}) => {
  const [searchTerm, setsearchTerm] = useState("");

  if (loading) return <Spinnerring />;

  const filteredUsers = users
    .filter((u) => u.uid !== currentUid)
    .filter((u) =>
      [u.firstName, u.email]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );

  return (
    <div className="w-72 bg-gray-100 rounded-2xl shadow flex flex-col">
      <div className="p-4 flex flex-col items-center justify-between border-b border-gray-300">
        <AddNewChatModal setSelectedUser={setSelectedUser} />
        <SearchBar
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
        />
      </div>

      <Accordion collapseAll>
        <AccordionPanel>
          <AccordionTitle className="font-medium text-sm cursor-pointer">
            Direct Message
          </AccordionTitle>
          <AccordionContent className="p-0">
            <div className="flex flex-col h-[300px] overflow-y-auto bg-white">
              {filteredUsers.length > 0 ? (
                <Virtuoso
                  style={{ height: "100%" }}
                  data={filteredUsers}
                  itemContent={(index, user) => {
                    const chat = chats.find(
                      (c) =>
                        c.participants.includes(user.uid) &&
                        c.participants.includes(currentUid),
                    );
                    const chatId = chat?.id || "";
                    const unreadCount = unreadCounts?.[chatId] || 0;

                    return (
                      <div
                        key={user.uid}
                        onClick={() => setSelectedUser(user)}
                        className="cursor-pointer rounded-md p-2 m-1 hover:bg-gray-200 flex items-center gap-3 bg-gray-100"
                      >
                        <img
                          src={user.profilePhoto || avtar}
                          alt={user.firstName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="flex flex-col flex-1">
                          <span className="font-medium text-gray-900">
                            {user.firstName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {user.email}
                          </span>
                        </div>
                        {unreadCount > 0 && (
                          <span className="text-xs text-white bg-red-500 px-2 rounded-full">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    );
                  }}
                />
              ) : (
                <div className="p-4 text-gray-500">No users found</div>
              )}
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  );
};

export default ChatSidebar;
