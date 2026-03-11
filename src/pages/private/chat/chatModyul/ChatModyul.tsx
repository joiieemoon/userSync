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
import { auth } from "../../../../components/firebase/firebase.ts";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import type { RootState } from "../../../../redux/store/store";
import { useSelector } from "react-redux";
import dashboardBg from "../../../../../public/dashboardbg.jpg";
import avtar from "../../../../../public/avtar.png";
import useUsers from "../../../../hooks/useUser/useUsers";
import AddNewChatModal from "../../../../modals/AddNewChatModal/AddNewChatModal";
// import Chatpannel from "../noConversation/NoSelectedChat";
import ConversationLayout from "../Conversation/ConversationLayout";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
import NoConversation from "../noConversation/NoSelectedChat";
import Spinnerring from "../../../../components/spinner/Spinnerring.tsx";

const ChatModyul = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const currentUid = auth.currentUser?.uid;

  const { users, loading } = useUsers();
  const currentUser = users.find((u) => u.uid === currentUid);
  const [selectedUser, setSelectedUser] = useState(null);

  if (loading) {
    return <Spinnerring />;
  }

  const closeChat = () => {
    setSelectedUser(null);
  };
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
      {/* Desktop layout: sidebar + chat content */}
      <div className=" md:flex h-[calc(100vh-80px)]    ">
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
            <Accordion defaultValue="directMessage">
              <AccordionPanel value="directMessage">
                <AccordionTitle className="font-medium text-sm">
                  Direct Message
                </AccordionTitle>
                <AccordionContent className="p-0">
                  <div className="flex flex-col h-[300px] overflow-y-auto bg-white">
                    {filteredUsers && filteredUsers.length > 0 ? (
                      <Virtuoso
                        style={{ height: "100%" }}
                        data={filteredUsers}
                        itemContent={(index, user) => (
                          <div
                            key={user.uid}
                            onClick={() => setSelectedUser(user)}
                            className="cursor-pointer rounded-md p-1 m-2 hover:bg-gray-200 flex items-center gap-3 bg-gray-100"
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
                                {user.email}
                              </span>
                            </div>
                          </div>
                        )}
                      />
                    ) : (
                      <div className="p-4 text-gray-500">No users found</div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>{" "}
            <Accordion defaultValue="SpacesMessage">
              <AccordionPanel value="SpacesMessage">
                <AccordionTitle className="font-medium text-sm">
                  Spaces
                </AccordionTitle>
                <AccordionContent className="p-0">
                  <div className="flex flex-col h-[100px] overflow-y-auto bg-white">
                    <div className="flex w-full pl-5"> create space</div>
                  </div>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>{" "}
            {/* starts open */}
          </div>
        </div>
        {/* Main Chat Area */}
        <main className="relative flex-1 p-6 overflow-auto bg-white rounded-2xl shadow ml-4">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${dashboardBg})`,
              opacity: 0.15,
            }}
          />

          {selectedUser ? (
            <ConversationLayout
              selectedUser={selectedUser}
              onClose={closeChat}
            />
          ) : (
            <NoConversation />
          )}
        </main>
      </div>
    </>
  );
};

export default ChatModyul;
