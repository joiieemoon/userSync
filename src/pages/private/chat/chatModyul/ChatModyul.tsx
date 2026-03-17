import React, { useState, useEffect } from "react";
import { auth, db } from "../../../../services/firebase/firebase";
import dashboardBg from "../../../../../public/dashboardbg.jpg";
import useUsers from "../../../../hooks/use-user/useUsers";
import useChats from "../../../../hooks/use-chat/useChat";

import ConversationLayout from "../conversation/conversation-layout/ConversationLayout";
import ChatSidebar from "./chat-sidebar";
import Spinnerring from "../../../../components/spinner/Spinnerring";
import NoConversation from "./no-conversation";

const ChatModyul = () => {
  const currentUid = auth.currentUser?.uid || "";
  const { users, loading } = useUsers();
  const { chats, existingChatUserIds } = useChats();
  const [selectedUser, setSelectedUser] = useState<any>(null);

  if (loading) return <Spinnerring />;

  return (
    <div className="md:flex h-[calc(100vh-80px)]">
      <ChatSidebar
        chats={chats}
        users={users}
        loading={loading}
        currentUid={currentUid}
        setSelectedUser={setSelectedUser}
        // exitingChatUserIds={exitingChatUserIds}
      />

      <main className="relative flex-1 p-6 overflow-auto bg-white rounded-2xl shadow ml-4">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dashboardBg})`, opacity: 0.15 }}
        />
        {selectedUser ? (
          <ConversationLayout
            currentUid={currentUid}
            selectedUser={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        ) : (
          <NoConversation />
        )}
      </main>
    </div>
  );
};

export default ChatModyul;
