import React, { useState } from "react";
import logo from "../../../../../public/logo.png";
import {
  Button,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Spinner,
} from "flowbite-react";
import { Virtuoso } from "react-virtuoso";
import { auth } from "../../../../components/firebase/firebase";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import type { RootState } from "../../../../redux/store/store";
import { useSelector } from "react-redux";
import dashboardBg from "../../../../../public/dashboardbg.jpg";
import avtar from "../../../../../public/avtar.png";
import useUsers from "../../../../hooks/useUser/useUsers";
import AddNewChatModal from "../../../../modals/AddNewChatModal/AddNewChatModal";

const ChatModyul = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const [searchTerm, setsearchTerm] = useState("");
  const currentUid = auth.currentUser?.uid;

  const { users, loading } = useUsers();
  const currentUser = users.find((u) => u.uid === currentUid);

  // const { permissions, username } = useSelector(
  //   (state: RootState) => state.userPermissions,
  // );
  const filteredUsers = users
    .filter((u) => u.uid !== currentUid)
    .filter((u) =>
      [u.firstName, u.email]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  if (loading)
    return (
      <div className="p-6 flex justify-center items-center">
        Loading...
        <Spinner color="success" aria-label="Success spinner example" />
      </div>
    );
  return (
    <>
      {/* Header bar - mobile only: show drawer toggle */}
      <div className="flex items-center justify-between p-4 border-b border-2 md:hidden">
        <div
          className="flex items-center text-2xl font-semibold cursor-pointer"
          onClick={handleOpen}
        >
          <img src={logo} className="w-12 h-12 mr-2" alt="Logo" />
          Chats
        </div>

        <Button onClick={handleOpen} size="sm">
          Show Chats
        </Button>
      </div>

      {/* Desktop layout: sidebar + chat content */}
      <div className="hidden md:flex h-[calc(100vh-80px)]  ">
        {" "}
        {/* Sidebar */}
        <div className="hidden md:flex ">
          <div className="w-72 bg-gray-100 rounded-2xl shadow flex flex-col  ">
            <div className="p-4 flex flex-col items-center justify-between border-b border-gray-300">
              <div className=" w-full mb-3">
                <AddNewChatModal />
              </div>
              <div className="">
                <SearchBar
                  value={searchTerm}
                  onchange={(e) => setsearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-2 bg-white">
              {filteredUsers.length === 0 ? (
                `No users found`
              ) : (
                <Virtuoso
                  style={{ height: "100%" }}
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
                        <span className="text-xs text-gray-500">
                          {/* {user.email} */}
                        </span>
                      </div>
                    </div>
                  )}
                />
              )}
            </div>
          </div>
        </div>
        {/* Main Chat Area */}
        <main className="relative flex-1 p-6 overflow-auto bg-white rounded-2xl shadow ml-4">
          {/* your chat UI */}
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${dashboardBg})`,
              opacity: 0.15,
            }}
          />
          <h3 className="text-lg font-semibold mb-4">Select a chat</h3>
          <p>Chat content will appear here...</p>
          {/* <Droptest/> */}
       
        </main>
      </div>

      {/* Mobile drawer */}
      <Drawer
        open={isOpen}
        onClose={handleClose}
        placement="left"
        className="md:hidden"
      >
        <DrawerHeader title="Chats" />
        <DrawerItems>
          <div className=" ">
            <SearchBar
              value={searchTerm}
              onchange={(e) => setsearchTerm(e.target.value)}
            />
          </div>
          <div className="space-y-2 overflow-auto max-h-[60vh]">
            {/* dynamic chat list */}
            {filteredUsers.length === 0 ? (
              `No users found`
            ) : (
              <Virtuoso
                style={{ height: "80%" }}
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
                      <span className="text-xs text-gray-500">
                        {/* {user.email} */}
                      </span>
                    </div>
                  </div>
                )}
              />
            )}
          </div>
        </DrawerItems>
      </Drawer>
    </>
  );
};

export default ChatModyul;
