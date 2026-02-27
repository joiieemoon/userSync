import React, { useState } from "react";
import useUsers from "../../../../hooks/useUser/useUsers";
import Navbar from "../../navbar/Navbar";
import { Sidebarmain } from "../../../../components/sidebar/Sidebar";
import ChatModyul from "../chatModyul/ChatModyul";
import useTitle from "../../../../hooks/useTitle/useTitle";
const ChatLayout = () => {
  const { users, loading } = useUsers();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useTitle("User Sync-Chat");
  const currentUid = users.find((u) => u.uid === currentUid);
  
  return (
    <>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
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
          <main className="p-10 pt-19 space-y-6">
         

            <ChatModyul/>
          </main>
        </div>
      </div>
    </>
  );
};

export default ChatLayout;
