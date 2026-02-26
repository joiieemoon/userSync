import React, { useState } from "react";
import { useSelector } from "react-redux";

import ProfileHeader from "../../../components/profile/profileHeader/ProfileHeader";
import PersonalDetails from "../../../components/profile/profilepersonaldetails/Personaldetails";
import UpdateProfileModal from "../../../modals/updateprofile/UpdateprofileModal";

import { useAuthListener } from "../../../redux/authstore/useauthListner";
import type { RootState } from "../../../redux/store/store";

import Navbar from "../navbar/Navbar";
import { Sidebarmain } from "../../../components/sidebar/Sidebar";

const Profile = () => {
  useAuthListener();

  const user = useSelector((state: RootState) => state.auth.user);

  const [open, setOpen] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebarmain isOpen={isSidebarOpen} />
      <Navbar toggleSidebar={toggleSidebar} />

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
