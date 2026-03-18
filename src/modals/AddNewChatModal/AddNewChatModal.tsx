import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import avtar from "../../../public/avtar.png";
import SearchBar from "../../components/SearchBar/SearchBar";
import EditBtn from "../../components/button/editbutton/Editbtn";
import CommonModal from "../../components/comman-modal/common-modal";
import { RiChatNewLine } from "react-icons/ri";

import useUsers from "../../hooks/use-user/useUsers";
import useChats from "../../hooks/use-chat/useChat";
import { createChat } from "../../services/createConversation/CreateConversation";
interface User {
  uid: string;
  firstName: string;
  lastName?: string;
  email: string;
  profilePhoto?: string;
}

interface AddNewSpaceModalProps {
  createChat: (
    chatType: "private" | "group",
    participants: string[],
    groupName?: string,
  ) => void;
  onUserSelected?: (user: User) => void;
}

const AddNewSpaceModal: React.FC<AddNewSpaceModalProps> = ({
  onUserSelected,
}) => {
  const { users } = useUsers();
  const { chats, currentUid, existingChatUserIds, loading } = useChats();

  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [groupName, setGroupName] = useState("");

  if (loading) return null;

  const filteredUsers = users
    .filter((u) => u.uid !== currentUid)
    // .filter((u) => !existingChatUserIds.includes(u.uid))
    .filter((u) =>
      [u.firstName, u.email]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );

  const toggleUserSelection = (user: User) => {
    if (selectedUsers.find((u) => u.uid === user.uid)) {
      setSelectedUsers(selectedUsers.filter((u) => u.uid !== user.uid));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleSubmit = () => {
    if (selectedUsers.length === 0) return;

    if (selectedUsers.length === 1) {
      createChat("private", [currentUid, selectedUsers[0].uid], currentUid, "");
      onUserSelected && onUserSelected(selectedUsers[0]);
    } else {
      createChat(
        "group",
        [currentUid, ...selectedUsers.map((u) => u.uid)],
        currentUid,
        "",
        groupName.trim(),
      );
    }

    setSelectedUsers([]);
    setGroupName("");
    setSearchTerm("");
    setOpenModal(false);
  };

  return (
    <>
      <div className="flex justify-start w-full mb-3">
        <EditBtn
          onClick={() => setOpenModal(true)}
          label=""
          icon={<RiChatNewLine />}
        />
      </div>

      <CommonModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={selectedUsers.length > 1 ? "New Group" : "New Chat"}
        submitLabel="Create"
        cancelLabel="Cancel"
        onSubmit={handleSubmit}
        className="max-w-md"
      >
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
        />

        {selectedUsers.length > 1 && (
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            required
          />
        )}

        <div className="mt-2 max-h-64 ">
          {filteredUsers.length === 0 ? (
            <p className="text-center mt-5 text-gray-500">No users found</p>
          ) : (
            <Virtuoso
              style={{ height: "230px" }}
              data={filteredUsers}
              itemContent={(index, user) => {
                const isSelected = selectedUsers.some(
                  (u) => u.uid === user.uid,
                );
                return (
                  <div
                    key={user.uid}
                    onClick={() => toggleUserSelection(user)}
                    className={`cursor-pointer rounded-md p-3 m-2 flex items-center gap-3 ${
                      isSelected
                        ? "bg-amber-200"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <img
                      src={user.profilePhoto || avtar}
                      alt={user.firstName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {user.firstName} {user.lastName || ""}
                      </span>
                      <span className="text-xs text-gray-500">
                        {user.email}
                      </span>
                    </div>
                  </div>
                );
              }}
            />
          )}
        </div>
      </CommonModal>
    </>
  );
};

export default AddNewSpaceModal;
