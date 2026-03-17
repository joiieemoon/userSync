import React, { useState, useEffect } from "react";
import { auth, db } from "../../../../services/firebase/firebase.ts";
import dashboardBg from "../../../../../public/dashboardbg.jpg";
import useUsers from "../../../../hooks/use-user/useUsers.ts";
import useChats from "../../../../hooks/use-chat/useChat";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import ConversationLayout from "../conversation/conversation-layout/ConversationLayout";
import ChatSidebar from "./chat-sidebar";
import Spinnerring from "../../../../components/spinner/Spinnerring.tsx";
import NoConversation from "./no-conversation";

const ChatModyul = () => {
  const currentUid = auth.currentUser?.uid || "";
  const { users, loading } = useUsers();
  const { chats } = useChats();
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatUserIds, setChatUserIds] = useState<string[]>([]);

  useEffect(() => {
    if (!currentUid) return;

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", currentUid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ids = snapshot.docs.map((doc) => {
        const data = doc.data();
        return data.participants.find((p: string) => p !== currentUid);
      });
      setChatUserIds(ids);
    });

    return () => unsubscribe();
  }, [currentUid]);

  if (loading) return <Spinnerring />;

  const filteredUsers = users.filter((u) => chatUserIds.includes(u.uid));

  return (
    <div className="md:flex h-[calc(100vh-80px)]">
      <ChatSidebar
        chats={chats}
        users={filteredUsers}
        loading={loading}
        currentUid={currentUid}
        setSelectedUser={setSelectedUser}
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