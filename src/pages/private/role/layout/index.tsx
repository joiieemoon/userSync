import React, { useState } from "react";

import { Sidebarmain } from "../../../../components/layout/sidebar";

import Navbar from "../../../../components/layout/navbar";
import RoleModyul from "../role-modyul";
import useTitle from "../../../../hooks/use-title";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../../redux/slice/uiSlice";
const Role = () => {
  const isSidebarOpen = useSelector((state: any) => state.ui.users.sidebarOpen);
  const dispatch = useDispatch();
  const handleToggleSidebar = () => dispatch(toggleSidebar());
  useTitle("User Sync-Roles");

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      {/* Sidebar */}
      <Sidebarmain isOpen={isSidebarOpen} />
      <Navbar toggleSidebar={handleToggleSidebar} isOpen={isSidebarOpen} />
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
