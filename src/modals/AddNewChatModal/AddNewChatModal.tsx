import React, { useState } from "react";
import { Virtuoso } from "react-virtuoso";
import avtar from "../../../public/avtar.png";
import { RiChatNewLine } from "react-icons/ri";
import useUsers from "../../hooks/useUser/useUsers";
import SearchBar from "../../components/SearchBar/SearchBar";
import EditBtn from "../../components/button/editbutton/Editbtn";
import { auth } from "../../components/firebase/firebase.ts";
import Spinnerring from "../../components/spinner/Spinnerring.tsx";
import CommonModal from "../../modals/common-modal";

const AddNewChatModal = () => {
  const { users, loading } = useUsers();
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");

  const currentUid = auth.currentUser?.uid;

  const filteredUsers = users
    .filter((u) => u.uid !== currentUid)
    .filter((u) =>
      [u.firstName, u.email]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );

  if (loading) return <Spinnerring />;

  return (
    <>
      <EditBtn
        onClick={() => setOpenModal(true)}
        label=""
        icon={<RiChatNewLine />}
      />

      <CommonModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="New Chat"
        submitLabel="Start Chat"
        cancelLabel="Cancel"
        onSubmit={() => {
          console.log("Start chat");
          setOpenModal(false);
        }}
        className="max-w-md"
      >
        <SearchBar
          value={searchTerm}
          onchange={(e) => setsearchTerm(e.target.value)}
        />

        {filteredUsers.length === 0 ? (
          <p className="text-center mt-5 text-gray-500">No users found</p>
        ) : (
          <Virtuoso
            style={{ height: "300px" }}
            data={filteredUsers}
            itemContent={(index, user) => (
              <div
                key={user.uid}
                className="cursor-pointer rounded-md p-3 m-2 hover:bg-gray-200 flex items-center gap-3 bg-gray-100"
              >
                <img
                  src={
                    user?.profilePhoto && user.profilePhoto !== ""
                      ? user.profilePhoto
                      : avtar
                  }
                  alt={user.firstName}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {user.firstName}
                  </span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              </div>
            )}
          />
        )}
      </CommonModal>
    </>
  );
};

export default AddNewChatModal;
