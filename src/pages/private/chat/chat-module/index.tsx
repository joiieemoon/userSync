
import { auth } from "../../../../services/firebase/firebase";
import dashboardBg from "../../../../../public/dashboardbg.jpg";
import useUsers from "../../../../hooks/use-user";
import useChats from "../../../../hooks/use-chat";

import Conversation from "../../../../components/feature/chat-components/conversation";
import ChatSidebar from "../../../../components/feature/chat-components/chat-sidebar";
import Spinnerring from "../../../../components/common/spinner";
import NoConversation from "../../../../components/feature/chat-components/no-conversation";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedUsers,
  setSelectedUsers,
} from "../../../../redux/slice/ui-slice";
import type { RootState } from "../../../../redux/store";
const ChatModule = () => {
  const currentUid = auth.currentUser?.uid || "";
  const { users, loading } = useUsers();
  const { chats, existingChatUserIds } = useChats();

  const dispatch = useDispatch();

  const selectedUsers = useSelector(
    (state: RootState) => state.ui.users.selectedUsers,
  );

  const selectedUser = selectedUsers[0] || null;
  if (loading) return <Spinnerring />;

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

      <main className="relative flex-1 p-6 overflow-auto bg-white rounded-2xl shadow ml-4">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dashboardBg})`, opacity: 0.15 }}
        />
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
