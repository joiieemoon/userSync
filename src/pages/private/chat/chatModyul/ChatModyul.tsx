import React, { useState } from "react";
import logo from "../../../../../public/logo.png";
import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import type { RootState } from "../../../../redux/store/store";
import { useSelector } from "react-redux";

const ChatModyul = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
 const { permissions,username } = useSelector(
    (state: RootState) => state.userPermissions,
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
      <div className="hidden md:flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-72 bg-gray-100 rounded-2xl shadow flex flex-col">
          <div className="p-4 flex items-center gap-3  shadow bg-white rounded-tl-2xl rounded-tr-2xl">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <h2 className="text-xl font-semibold">Chats</h2>
          </div>

          <div className="p-4  ">
            <SearchBar  />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white rounded-lg shadow">
            {/*  dynamic chat list */}
            {["JAINIL", "harry", "sumit"].map((user,idx) => (
                <>
              <div
                key={user}
                className="cursor-pointer rounded-md p-3 hover:bg-gray-100 flex bg-gray-100"
              >
                {user}
              </div>
           
              </>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-white rounded-2xl shadow ml-4">
          {/* your chat UI */}
          <h3 className="text-lg font-semibold mb-4">Select a chat</h3>
          <p>Chat content will appear here...</p>
        </main>
      </div>

      {/* Mobile drawer */}
      <Drawer open={isOpen} onClose={handleClose} placement="left" className="md:hidden">
        <DrawerHeader title="Chats" />
        <DrawerItems>
          <div className="p-4">
            <SearchBar />
          </div>
          <div className="space-y-2 overflow-auto max-h-[60vh]">
            {/* dynamic chat list */}
            {["Kaiya George", "Lindsey Curtis", "Zain Geidt"].map((user) => (
              <div
                key={user}
                className="cursor-pointer rounded-md p-3 hover:bg-gray-100"
              >
                {user}
              </div>
            ))}
          </div>
        </DrawerItems>
      </Drawer>
    </>
  );
};

export default ChatModyul;