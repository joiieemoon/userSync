import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  
} from "flowbite-react";
import { Virtuoso } from "react-virtuoso";
import avtar from "../../../public/avtar.png";
import { RiChatNewLine } from "react-icons/ri";
import { useState } from "react";
import useUsers from "../../hooks/useUser/useUsers";
import SearchBar from "../../components/SearchBar/SearchBar";
import EditBtn from "../../components/button/editbutton/Editbtn";
import { auth } from "../../components/firebase/firebase.ts";
import Spinnerring from "../../components/spinner/Spinnerring.tsx";

const AddNewChatModal = () => {
  const { users, loading } = useUsers();
  const [openModal, setOpenModal] = useState(false);

  const [searchTerm, setsearchTerm] = useState("");
  const currentUid = auth.currentUser?.uid;

  const currentUser = users.find((u) => u.uid === currentUid);
  const filteredUsers = users
    .filter((u) => u.uid !== currentUid)
    .filter((u) =>
      [u.firstName, u.email]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  if (loading) return  <Spinnerring />;
  return (
    <>
      <div className="flex flex-wrap gap-4 ">
        <EditBtn
          onClick={() => setOpenModal(true)}
          label=""
          icon={<RiChatNewLine />}
        />
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        className="scrollbar-hidden"
      >
        <ModalHeader className="dark:bg-white border-none">
          <span className="text-black">New Chat</span>
        </ModalHeader>
        <div className="bg-white">
          {" "}
          <SearchBar
            value={searchTerm}
            onchange={(e) => setsearchTerm(e.target.value)}
          />
        </div>

        <ModalBody className="dark:bg-white">
          {filteredUsers.length === 0 ? (
            `No users found`
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
        </ModalBody>
        <ModalFooter className="dark:bg-white border-none">
          <Button
            onClick={() => setOpenModal(false)}
            className="text-black bg-amber-300 border-none outline-none"
          >
            Start chat
          </Button>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddNewChatModal;
