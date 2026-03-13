import React, { useState } from "react";
import { auth } from "../../../../services/firebase/firebase.ts";
import avtar from "../../../../../public/avtar.png";
import dashboardBg from "../../../../../public/dashboardbg.jpg";
import useUsers from "../../../../hooks/useUser/useUsers";
import NoConversation from "./noConversation/NoSelectedChat.tsx";
import Spinnerring from "../../../../components/spinner/Spinnerring.tsx";

import { Virtuoso } from "react-virtuoso";
import ConversationLayout from "../conversation/conversation-layout/ConversationLayout.tsx";
import ChatSidebar from "./chatsidebar/ChatSidebar.tsx";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../../services/firebase/firebase.ts";
import { useEffect } from "react";
const ChatModyul = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const currentUid = auth.currentUser?.uid;

  const { users, loading } = useUsers();

  const [selectedUser, setSelectedUser] = useState(null);
  const [chatUserIds, setChatUserIds] = useState([]);
  useEffect(() => {
    if (!currentUid) return;

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", currentUid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ids = snapshot.docs.map((doc) => {
        const data = doc.data();
        return data.participants.find((p) => p !== currentUid);
      });

      setChatUserIds(ids);
    });

    return () => unsubscribe();
  }, [currentUid]);
  if (loading) {
    return <Spinnerring />;
  }

  const closeChat = () => {
    setSelectedUser(null);
  };
  const filteredUsers = users
    .filter((u) => chatUserIds.includes(u.uid))
    .filter((u) =>
      [u.firstName, u.email]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );

  return (
    <>
      {/* Desktop layout: sidebar + chat content */}
      <div className=" md:flex h-[calc(100vh-80px)]    ">
        {" "}
        {/* Sidebar */}
        <div className="md:flex">
          <ChatSidebar
            users={filteredUsers}
            loading={loading}
            currentUid={currentUid}
            setSelectedUser={setSelectedUser}
          >
            <div className="flex flex-col h-[300px]">
              {filteredUsers.length > 0 ? (
                <Virtuoso
                  style={{ height: "100%" }}
                  data={filteredUsers}
                  itemContent={(index, user) => (
                    <div
                      key={user.uid}
                      onClick={() => setSelectedUser(user)}
                      className="cursor-pointer rounded-md p-1 m-2 hover:bg-gray-200 flex items-center gap-3 bg-gray-100"
                    >
                      <img
                        src={user?.profilePhoto || avtar}
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {user.firstName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  )}
                />
              ) : (
                <div className="p-4 text-gray-500">No users found</div>
              )}
            </div>
          </ChatSidebar>
        </div>
        {/* Main Chat Area */}
        <main className="relative flex-1 p-6 overflow-auto bg-white rounded-2xl shadow ml-4">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${dashboardBg})`,
              opacity: 0.15,
            }}
          />

          {/* <NoConversation /> */}
          {selectedUser ? (
            <ConversationLayout
              currentUid={currentUid}
              selectedUser={selectedUser}
              onClose={closeChat}
              
            />
          ) : (
            <NoConversation />
          )}
        </main>
      </div>
    </>
  );
};

export default ChatModyul;
