import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileHeader from "../../../components/profile/profile-header";
import PersonalDetails from "../../../components/profile/profile-personal-details";
import UpdateProfileModal from "../../../modals/update-profile-modal";
import { useAuthListener } from "../../../redux/auth-store";
import type { RootState } from "../../../redux/store/store";
import Navbar from "../../../components/layout/navbar";

import { Sidebarmain } from "../../../components/layout/sidebar";

import useTitle from "../../../hooks/use-title";

const Profile = () => {
  useAuthListener();

  const user = useSelector((state: RootState) => state.auth.user);

  const [open, setOpen] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useTitle("User Sync-Profile");
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      {/* Sidebar */}
      <Sidebarmain isOpen={isSidebarOpen} />
      <Navbar toggleSidebar={toggleSidebar} isOpen={open} />

      {/* Main Layout */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300
          ${isSidebarOpen ? "ml-64" : "ml-0"}
        `}
      >
        {/* Navbar */}

        {/* Content */}
        <main className="p-8 pt-24 space-y-6">
          <ProfileHeader user={user} onEdit={() => setOpen(true)} />

          <PersonalDetails user={user} onEdit={() => setOpen(true)} />
        </main>
      </div>

      {/* Modal */}
      {open && (
        <UpdateProfileModal user={user} onClose={() => setOpen(false)} />
      )}
    </div>
  );
};

export default Profile;
