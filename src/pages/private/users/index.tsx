"use client";
import React, { lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../../../components/layout/navbar";
import { Sidebarmain } from "../../../components/layout/sidebar";
import useTitle from "../../../hooks/use-title";
import { toggleSidebar } from "../../../redux/slice/ui-slice";
import useUsers from "../../../hooks/use-user";

// Lazy load UsersDetails
const UsersDetails = lazy(() => import("./userdetails"));

// Skeleton loader
function UsersSkeleton() {
  return (
    <div className="space-y-4 mt-40">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="h-10 bg-gray-200 rounded-lg animate-pulse"
        ></div>
      ))}
    </div>
  );
}

export default function Users() {
  const dispatch = useDispatch();

  const isSidebarOpen = useSelector((state: any) => state.ui.users.sidebarOpen);

  const handleToggleSidebar = () => dispatch(toggleSidebar());

  const { users, loading } = useUsers();
  useTitle("User Sync-Users");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebarmain isOpen={isSidebarOpen} />

      {/* Navbar */}
      <Navbar toggleSidebar={handleToggleSidebar} isOpen={isSidebarOpen} />

      {/* Main Layout */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Content */}
        <main className="p-8 pt-19 space-y-6">
          {loading ? (
            <UsersSkeleton />
          ) : (
            <Suspense fallback={<UsersSkeleton />}>
              <UsersDetails users={users} />
            </Suspense>
          )}
        </main>
      </div>
    </div>
  );
}
