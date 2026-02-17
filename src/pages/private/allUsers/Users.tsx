import React, { useState } from "react";
import  useUsers  from "../../../hooks/useUser/useUsers"; // your hook
import UsersDetails from "../../private/allUsers/userdetails/UserDetails";
import Navbar from "../navbar/Navbar";
import { Sidebarmain } from "../../../components/sidebar/Sidebar";

export default function Users() {
  const { users, loading } = useUsers();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) return <div className="p-6">Loading users...</div>;

  return (
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
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Content */}
        <main className="p-8 pt-24 space-y-6">
          <UsersDetails users={users} />
        </main>
      </div>
    </div>
  );
}
