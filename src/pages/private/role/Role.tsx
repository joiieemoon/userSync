import React, { useState } from "react";
import { Sidebarmain } from "../../../components/sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import RoleModyul from "./rolemodyul/RoleModyul";
import useTitle from "../../../hooks/use-title/useTitle";

const Role = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useTitle("User Sync-Roles");
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex min-h-screen bg-gray-50 ">
      {/* Sidebar */}
      <Sidebarmain isOpen={isSidebarOpen} />
      <Navbar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
      {/* Main layout */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Navbar */}

        {/* Content */}
        <main className="p-8 pt-19 space-y-6">
          <RoleModyul />
        </main>
      </div>
    </div>
  );
};

export default Role;
