import React, { useState } from "react";
import Navbar from "../../../../components/layout/navbar";

import { Sidebarmain } from "../../../../components/layout/sidebar";
import ChatModyul from "../chat-modyul";
import useTitle from "../../../../hooks/use-title";

const ChatLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useTitle("User Sync-Chat");

  return (
    <>
      <div className="flex min-h-screen bg-gray-50 ">
        {/* Sidebar */}
        <Sidebarmain isOpen={isSidebarOpen} />
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
        {/* Main layout */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          {/* Content */}
          <main className="p-6  mt-13  space-y-7 h-[calc(100vh-80px)]">
            <ChatModyul />
          </main>
        </div>
      </div>
    </>
  );
};

export default ChatLayout;
