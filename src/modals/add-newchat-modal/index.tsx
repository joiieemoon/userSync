import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import avtar from "../../../public/avtar.png";
import SearchBar from "../../components/common/search-bar";

import EditBtn from "../../components/common/button/edit-button";

import CommonModal from "../../components/common/common-modal";

import { RiChatNewLine } from "react-icons/ri";
import type { AddNewSpaceModalProps, User } from "../../types/interfaces";
import useUsers from "../../hooks/use-user";
import useChats from "../../hooks/use-chat";
import {
  addMembersToGroup,
  createChat,
} from "../../services/create-conversation";
import FormController from "../../components/common/input/form-controller";
import { MdGroupAdd } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedUsers,
  addSelectedUser,
  removeSelectedUser,
  clearSelectedUsers,
} from "../../redux/slice/uiSlice";
import type { RootState } from "../../redux/store/store";

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

  const dispatch = useDispatch();
  const selectedUsers = useSelector(
    (state: RootState) => state.ui.users.selectedUsers,
  );
  const [groupName, setGroupName] = useState("");
  const [groupNameError, setGroupNameError] = useState(false);
  const [mode, setMode] = useState<"chat" | "group" | "addmember">("chat");
  useEffect(() => {
    if (openModal) {
      setSearchTerm("");
    }
  }, [openModal]);

  const filteredUsers = useMemo(() => {
    return users
      .filter((u) => u.uid !== currentUid)
      .filter((u) =>
        [u.firstName, u.email]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      );
  }, [users, currentUid, searchTerm]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const nameA = a.firstName.toLowerCase();
      const nameB = b.firstName.toLowerCase();

      return nameA.localeCompare(nameB);
    });
  }, [filteredUsers]);

  const toggleUserSelection = useCallback(
    (user: User) => {
      if (mode === "chat") {
        dispatch(setSelectedUsers([user]));
        return;
      }

      if (selectedUsers.find((u) => u.uid === user.uid)) {
        dispatch(removeSelectedUser(user.uid));
      } else {
        dispatch(addSelectedUser(user));
      }
    },
    [mode, selectedUsers, dispatch],
  );
  const handleSubmit = async () => {
    if (selectedUsers.length === 0) return;

    try {
      if (addmode === "add") {
        await addMembersToGroup(
          chatId,
          selectedUsers.map((u) => u.uid),
          currentUid,
        );
      } else if (mode === "group") {
        if (!groupName.trim()) {
          setGroupNameError(true);
          return;
        }

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
        const user = selectedUsers[0];

        const existingChat = chats.find(
          (chat) =>
            !chat.isGroup &&
            chat.participants.includes(currentUid!) &&
            chat.participants.includes(user.uid),
        );

        if (existingChat) {
          onUserSelected?.({
            ...user,
            chatId: existingChat.id,
          });
        } else {
          const result = await createChat(
            "private",
            [currentUid, user.uid],
            currentUid,
            "",
          );

          if (result?.chatId) {
            onUserSelected?.({
              ...user,
              chatId: result.chatId,
            });
          }
        }
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      dispatch(clearSelectedUsers());
      setGroupName("");
      setSearchTerm("");
      setGroupNameError(false);
      setOpenModal(false);
    }
  };
  if (loading) return null;

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
          setOpenModal(false);
          dispatch(clearSelectedUsers());
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

export default React.memo(AddNewSpaceModal);
