import React, { useState, useEffect } from "react";
import { Virtuoso } from "react-virtuoso";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../../../services/firebase/firebase";
import avtar from "../../../../../public/avtar.png";
import SearchBar from "../../../common/search-bar";
import Spinnerring from "../../../common/spinner";

import type { ChatSidebarProps } from "../../../../types/interfaces";
import AddNewSpaceModal from "../../../../modals/add-newchat-modal";
import nogroupchat from "../../../../../public/nogroupchat.png";
import nodirectchat from "../../../../../public/nodirectchat.png";
import {
  Accordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
} from "flowbite-react";

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  users,
  loading,
  currentUid,
  setSelectedUser,
  existingChatUserIds,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const unsubscribers: (() => void)[] = [];

    chats.forEach((chat) => {
      const messagesRef = collection(db, "chats", chat.id, "messages");
      const q = query(messagesRef, orderBy("createdAt", "asc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const unread = snapshot.docs.filter((doc) => {
          const msg = doc.data() as any;
          return (
            msg.senderId !== currentUid &&
            (!msg.seenBy || !msg.seenBy.includes(currentUid))
          );
        }).length;

        setUnreadCounts((prev) => ({ ...prev, [chat.id]: unread }));
      });

      unsubscribers.push(unsubscribe);
    });

    return () => unsubscribers.forEach((unsub) => unsub());
  }, [chats, currentUid]);

  if (loading) return <Spinnerring />;

  const directChats = chats.filter((c) => c.type === "private");
  const groupChats = chats.filter((c) => c.type === "group");
  const directChatUserIds = directChats
    .flatMap((chat) => chat.participants)
    .filter((uid) => uid !== currentUid);

  const filteredUsers = users.filter(
    (u) =>
      u.uid !== currentUid &&
      directChatUserIds.includes(u.uid) &&
      [u.firstName, u.email]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const getChatForUser = (uid: string) =>
    directChats.find(
      (chat) =>
        chat.participants &&
        chat.participants.includes(uid) &&
        chat.participants.includes(currentUid),
    );

  return (
    <div className="w-72 bg-gray-100 rounded-2xl shadow flex flex-col ">
      {/* Top bar */}
      <div className="p-4 flex flex-col items-center justify-between border-b border-gray-300">
        <AddNewSpaceModal
          onCreateSpace={(selectedUsers) => {
            console.log("Creating space with users:", selectedUsers);
          }}
          onUserSelected={(user) => setSelectedUser(user)}
        />
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Accordion collapseAll>
        {/* Direct Messages */}
        <AccordionPanel>
          <AccordionTitle className="font-medium text-sm cursor-pointer">
            Direct Messages
          </AccordionTitle>
          <AccordionContent className="p-0">
            <div className="flex flex-col h-[300px] overflow-y-auto bg-gray-100">
              {filteredUsers.length > 0 ? (
                <Virtuoso
                  style={{ height: "100%" }}
                  data={filteredUsers}
                  itemContent={(index, user) => {
                    const chat = getChatForUser(user.uid);
                    const unreadCount = chat ? unreadCounts[chat.id] || 0 : 0;

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
                            {unreadCount < 11 ? unreadCount : "10+"}
                          </span>
                        )}
                      </div>
                    );
                  }}
                />
              ) : (
                <div className="flex flex-col w-full justify-center items-center bg-gray-100 ">
                  <img src={nodirectchat} alt="no convo" className="" />
                  <div className=" text-gray-500 text-m font-bold">
                    No Direct-Chat yet{" "}
                  </div>
                  <div className=" text-gray-500">
                    {" "}
                    create one to get started.{" "}
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionPanel>

        {/* Group Chats / Spaces */}
        <AccordionPanel>
          <AccordionTitle className="font-medium text-sm cursor-pointer">
            Spaces
          </AccordionTitle>
          <AccordionContent className="p-0">
            <div className="flex flex-col h-[300px] overflow-y-auto bg-gray-100">
              {groupChats.length > 0 ? (
                <Virtuoso
                  style={{ height: "100%" }}
                  data={groupChats}
                  itemContent={(index, chat) => {
                    const unreadCount = unreadCounts[chat.id] || 0;
                    return (
                      <div
                        key={chat.id}
                        onClick={() =>
                          setSelectedUser({
                            uid: chat.id,
                            firstName: chat.groupName || "Group",
                            email: "",
                            isGroup: true,
                          })
                        }
                        className="cursor-pointer rounded-md p-2 m-1 hover:bg-gray-200 flex items-center gap-3 bg-gray-100"
                      >
                        <img
                          src={avtar}
                          alt={chat.groupName || "Group"}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="flex flex-col flex-1">
                          <span className="font-medium text-gray-900">
                            {chat.groupName || "Group"}
                          </span>
                        </div>
                        {unreadCount > 0 && (
                          <span className="text-xs text-white bg-red-500 px-2 rounded-full">
                            {unreadCount < 11 ? unreadCount : "10+"}
                          </span>
                        )}
                      </div>
                    );
                  }}
                />
              ) : (
                <div className="flex flex-col w-full justify-center items-center bg-gray-100 ">
                  <img src={nogroupchat} alt="no convo" className="" />
                  <div className=" text-gray-500 text-m font-bold">
                    No spaces yet{" "}
                  </div>
                  <div className=" text-gray-500">
                    {" "}
                    create one to get started.{" "}
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  );
};

export default ChatSidebar;
