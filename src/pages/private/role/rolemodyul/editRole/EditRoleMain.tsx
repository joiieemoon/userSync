// import React from "react";
import React, { useState,} from "react";
// import useUsers from "../../../hooks/useUser/useUsers";
import Navbar from "../../../../../pages/private/navbar/Navbar";
import { Sidebarmain } from "../../../../../components/sidebar/Sidebar";
import EditRole from "../../../../../modals/addRole/AddRoleModal";

function UsersSkeleton() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="space-y-4 mt-40">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse "
        ></div>
      ))}
    </div>
  );
}
const EditRoleMain = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <Sidebarmain isOpen={isSidebarOpen} />

        {/* Main layout */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          {/* Navbar */}
          <Navbar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />

          {/* Content */}
          <main className="p-8 pt-19 space-y-6">
            {/* <RoleModyul /> */}
            <EditRole />
          </main>
        </div>
      </div>
    </>
  );
};

export default EditRoleMain;
