import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  Spinner,
} from "flowbite-react";
import avtar from "../../../public/avtar.png";
import { RiChatNewLine } from "react-icons/ri";
import { useState } from "react";
import useUsers from "../../hooks/useUser/useUsers";
import SearchBar from "../../components/SearchBar/SearchBar";
import EditBtn from "../../components/button/editbutton/Editbtn";
const AddNewChatModal = () => {
  const { users, loading } = useUsers();
  const [openModal, setOpenModal] = useState(true);
  const [modalSize, setModalSize] = useState<string>("md");
  if (loading)
    return (
      <div className="p-6 flex justify-center items-center">
        Loading...
        <Spinner color="success" aria-label="Success spinner example" />
      </div>
    );
  return (
    <>
      <div className="flex flex-wrap gap-4 ">
        {/* <div className="w-40">
          <Select
            defaultValue="md"
            onChange={(event) => setModalSize(event.target.value)}
          >
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
            <option value="xl">xl</option>
            <option value="2xl">2xl</option>
            <option value="3xl">3xl</option>
            <option value="4xl">4xl</option>
            <option value="5xl">5xl</option>
            <option value="6xl">6xl</option>
            <option value="7xl">7xl</option>
          </Select>
        </div> */}
        {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
        <EditBtn
          onClick={() => setOpenModal(true)}
          label=""
          icon={<RiChatNewLine />}
        />
      </div>
      <Modal
        show={openModal}
        size={modalSize}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader className="dark:bg-white "><span className="text-black">New Chat</span></ModalHeader>
        <SearchBar className="p-4 dark:bg-white" />
        <ModalBody className="dark:bg-white">
          <div className="space-y-6 p-6 overflow-auto h-96 dark:bg-white">
            {users.map((user, idx) => (
              <div
                key={user.uid}
                className="cursor-pointer rounded-md p-3 hover:bg-gray-200 flex items-center gap-2 bg-gray-100"
              >
                <img
                  src={
                    user?.profilePhoto && user.profilePhoto !== ""
                      ? user.profilePhoto
                      : avtar
                  }
                  alt={user.firstName}
                  className="h-6 w-6 rounded-full"
                />
                {user.firstName}
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter className="dark:bg-white">
          <Button onClick={() => setOpenModal(false)} className="text-black bg-amber-300 border-none outline-none">
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
