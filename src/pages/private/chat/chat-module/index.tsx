import { auth } from "../../../../services/firebase/firebase";
import dashboardBg from "../../../../../public/dashboardbg.jpg";

import useChats from "../../../../hooks/use-chat";

import Conversation from "../../../../components/feature/chat-components/conversation";
import ChatSidebar from "../../../../components/feature/chat-components/chat-sidebar";
import Spinnerring from "../../../../components/common/spinner";
import NoConversation from "../../../../components/feature/chat-components/no-conversation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  clearSelectedUsers,
  setSelectedUsers,
} from "../../../../redux/slice/ui-slice";
import type { RootState } from "../../../../redux/store";
import { usersService } from "../../../../services/rest-api-services/user-services";


import { chatsocket } from "../../../../services/socket";
import { useChatSocket } from "../../../../hooks/use-chatsocket";
const ChatModule = () => {
  const currentUid = auth.currentUser?.uid || "";

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setloading] = useState(true);

  const { onlineuserCount } = useChatSocket(currentUid);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await usersService.getAlluser();
        setUsers(data);
        setloading(false);
      } catch (error) {
        console.error("fail to fetch users", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    chatsocket.emit("chat-active", currentUid);

    return () => {
      chatsocket.emit("chat-inactive", currentUid);
    };
  }, []);

  const { chats, existingChatUserIds } = useChats();

  const dispatch = useDispatch();

  const selectedUsers = useSelector(
    (state: RootState) => state.ui.users.selectedUsers,
  );

  const selectedUser = selectedUsers[0] || null;
  if (loading) return <Spinnerring />;
  console.log(onlineuserCount);
  return (
    <div className="md:flex h-[calc(100vh-80px)]">
      <ChatSidebar
        chats={chats}
        users={users}
        loading={loading}
        currentUid={currentUid}
        // setSelectedUser={setSelectedUser}
        setSelectedUser={(user) => dispatch(setSelectedUsers([user]))}
        existingChatUserIds={existingChatUserIds}
      />

      <main className="relative flex-1 p-3 overflow-auto bg-white rounded-2xl shadow ml-4">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dashboardBg})`, opacity: 0.15 }}
        />
        <div className="bg-amber-400 flex justify-center">
          {" "}
          <div className="t">online user:{onlineuserCount}</div>
        </div>

        {selectedUser ? (
          <Conversation
            currentUid={currentUid}
            selectedUser={selectedUser}
            onClose={() => dispatch(clearSelectedUsers())}
          />
        ) : (
          <NoConversation />
        )}
      </main>
    </div>
  );
};

export default ChatModule;
