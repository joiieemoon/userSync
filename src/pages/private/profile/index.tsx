import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileHeader from "../../../components/feature/user-management/profile/profile-header";
import PersonalDetails from "../../../components/feature/user-management/profile/profile-personal-details";
import UpdateProfileModal from "../../../modals/update-profile-modal";
import { useAuthListener } from "../../../redux/slice/auth-listner";
import type { RootState } from "../../../redux/store";
import Navbar from "../../../components/layout/navbar";
import { setShowModal, toggleSidebar } from "../../../redux/slice/ui-slice";
import { Sidebarmain } from "../../../components/layout/sidebar";

import useTitle from "../../../hooks/use-title";

const Profile = () => {
  useAuthListener();

  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();
  const { showModal } = useSelector((state: RootState) => state.ui.users);

  useTitle("User Sync-Profile");

  const isSidebarOpen = useSelector(
    (state: RootState) => state.ui.users.sidebarOpen,
  );
  const handleToggleSidebar = () => dispatch(toggleSidebar());
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

      <Navbar toggleSidebar={handleToggleSidebar} isOpen={isSidebarOpen} />
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
          <ProfileHeader
            user={user}
            onEdit={() => dispatch(setShowModal({ type: "edit", value: true }))}
          />
          <PersonalDetails user={user} />
        </main>
      </div>

      {/* Modal */}

      {showModal.edit && (
        <UpdateProfileModal
          user={user}
          onClose={() => dispatch(setShowModal({ type: "edit", value: false }))}
        />
      )}
    </div>
  );
};

export default Profile;
