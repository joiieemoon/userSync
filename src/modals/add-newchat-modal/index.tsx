import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import avtar from "../../../public/avtar.png";
import SearchBar from "../../components/search-bar";
import EditBtn from "../../components/button/edit-button";
import CommonModal from "../../components/comman-modal/common-modal";
import { RiChatNewLine } from "react-icons/ri";
import type { AddNewSpaceModalProps, User } from "../../types/interfaces";
import useUsers from "../../hooks/use-user";
import useChats from "../../hooks/use-chat";
import {
  addMembersToGroup,
  createChat,
} from "../../services/create-conversation";
import FormController from "../../components/form-controller";
import { MdGroupAdd } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
const AddNewSpaceModal: React.FC<AddNewSpaceModalProps> = ({
  onUserSelected,
  modeselect,
  addmode,
  chatId,
}) => {
  const { users } = useUsers();
  const { chats, currentUid, existingChatUserIds, loading } = useChats();

  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [groupName, setGroupName] = useState("");
  const [groupNameError, setGroupNameError] = useState(false);
  const [mode, setMode] = useState<"chat" | "group" | "addmember">("chat");
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

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const nameA = a.firstName.toLowerCase();
    const nameB = b.firstName.toLowerCase();

    return nameA.localeCompare(nameB);
  });
  const toggleUserSelection = (user: User) => {
    if (mode === "chat") {
      setSelectedUsers([user]);
      return;
    }

    if (selectedUsers.find((u) => u.uid === user.uid)) {
      setSelectedUsers(selectedUsers.filter((u) => u.uid !== user.uid));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };
  const handleSubmit = async () => {
    if (selectedUsers.length === 0) return;

    if (mode === "group") {
      if (!groupName.trim()) {
        setGroupNameError(true);
        return;
      }
    }

    try {
      if (addmode === "add") {
        await addMembersToGroup(
          chatId,
          selectedUsers.map((u) => u.uid),
          currentUid,
        );
        return;
      }

      if (mode === "group") {
        const result = await createChat(
          "group",
          [currentUid, ...selectedUsers.map((u) => u.uid)],
          currentUid,
          "",
          groupName.trim(),
        );

        if (result?.chatId) {
          onUserSelected?.({
            uid: result.chatId,
            firstName: groupName.trim(),
            isGroup: true,
            chatId: result.chatId,
            createdBy: currentUid,
          });
        }
      } else {
        const result = await createChat(
          "private",
          [currentUid, selectedUsers[0].uid],
          currentUid,
          "",
        );

        if (result?.chatId) {
          onUserSelected?.({
            ...selectedUsers[0],
            chatId: result.chatId,
          });
        }
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setSelectedUsers([]);
      setGroupName("");
      setSearchTerm("");
      setGroupNameError(false);
      setOpenModal(false);
    }
  };

  return (
    <>
      <div className="flex justify-evenly w-full mb-3">
        {addmode === "add" ? (
          <EditBtn
            onClick={() => {
              setMode("addmember");
              setOpenModal(true);
            }}
            label=""
            icon={<AiOutlineUsergroupAdd />}
          />
        ) : (
          <>
            <EditBtn
              onClick={() => {
                setMode("chat");
                setOpenModal(true);
              }}
              label=""
              icon={<RiChatNewLine />}
            />

            <EditBtn
              onClick={() => {
                setMode("group");
                setOpenModal(true);
              }}
              label=""
              icon={<MdGroupAdd />}
            />
          </>
        )}
      </div>

      <CommonModal
        isOpen={openModal}
        onClose={() => {
          (setOpenModal(false), setSelectedUsers([]));
        }}
        title={
          addmode === "add"
            ? "Add Member"
            : mode === "group"
              ? "New Group"
              : "New Chat"
        }
        submitLabel={addmode === "add" ? "Add" : "Create"}
        cancelLabel="Cancel"
        onSubmit={handleSubmit}
        className="max-w-md"
        submitDisabled={
          mode === "group"
            ? selectedUsers.length === 0
            : selectedUsers.length === 0
        }
      >
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
        />
        <div className=" mt-2">
          {" "}
          {addmode !== "add" && mode === "group" && (
            <FormController
              control="input"
              type="text"
              label="Group Name"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
                if (groupNameError && e.target.value.trim() !== "") {
                  setGroupNameError(false);
                }
              }}
              error={groupNameError}
              errorMessage="Group name is required"
            />
          )}
        </div>

        <div className="mt-2 max-h-64 ">
          {/* {filteredUsers.length === 0 ? ( */}
          {sortedUsers.length === 0 ? (
            <p className="text-center mt-5 text-gray-500">No users found</p>
          ) : (
            <Virtuoso
              style={{ height: "230px" }}
              // data={filteredUsers}
              data={sortedUsers}
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
