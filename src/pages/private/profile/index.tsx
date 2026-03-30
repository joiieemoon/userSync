import React, { useState, useEffect } from "react";
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
import { usersService } from "../../../services/rest-api-services/user-services";

const Profile = () => {
  useAuthListener();
  const [user, setUser] = useState<any | null>(null);
  const dispatch = useDispatch();
  const { showModal } = useSelector((state: RootState) => state.ui.users);

  useTitle("User Sync-Profile");

  const isSidebarOpen = useSelector(
    (state: RootState) => state.ui.users.sidebarOpen,
  );

  const handleToggleSidebar = () => dispatch(toggleSidebar());

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await usersService.getUserById(user?.id || 36);
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebarmain isOpen={isSidebarOpen} />
      <Navbar toggleSidebar={handleToggleSidebar} isOpen={isSidebarOpen} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <main className="p-8 pt-24 space-y-6">
          <ProfileHeader
            user={user}
            onEdit={() => dispatch(setShowModal({ type: "edit", value: true }))}
          />
          <PersonalDetails user={user} />
        </main>
      </div>

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
