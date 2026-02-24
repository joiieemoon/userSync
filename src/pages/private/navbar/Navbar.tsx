import React, { useState, useEffect } from "react";
import { HiMenuAlt1, HiBell, HiMoon, HiSun } from "react-icons/hi";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar as FlowbiteNavbar,
  NavbarBrand,
} from "flowbite-react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../../components/firebase/firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store/store";
import { IoHomeOutline } from "react-icons/io5";
import { DarkThemeToggle } from "flowbite-react";
import { setUserPermissions } from "../../../redux/permissionslice/permissionslice";
import { useDispatch } from "react-redux";
import useUsers from "../../../hooks/useUser/useUsers";
interface NavbarProps {
  toggleSidebar: () => void;
  isOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: RootState) => state.auth.user);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const { users } = useUsers(); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.currentUser) return;

    
    const currentUser = users.find((u) => u.uid === auth.currentUser.uid);
    if (currentUser) {
      dispatch(
        setUserPermissions({
          username: currentUser.firstName,
          permissions: currentUser.permissions,
        }),
      );
    }
  }, [users, dispatch]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully!", {
        position: "top-center",
      });
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Logout failed", {
        position: "bottom-center",
      });
    }
  };

  return (
    <FlowbiteNavbar
      fluid
      className={`fixed top-0 z-50 w-full bg-white dark:bg-gray-900 text-gray-700 dark:text-white  shadow-md px-6 transition-all duration-300
        ${isOpen ? "pl-64" : "pl-6"}`}
      style={{ height: "64px" }}
    >
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4 border-none">
        <button
          onClick={toggleSidebar}
          className="text-2xl hover:text-blue-500 transition"
          aria-label="Toggle sidebar"
        >
          <HiMenuAlt1 />
        </button>

        <NavbarBrand>
          <span className="text-xl font-bold tracking-wide">User Sync</span>
        </NavbarBrand>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <div className="relative cursor-pointer">
          <HiBell className="text-2xl hover:text-blue-500 transition" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-2xl hover:text-yellow-400 transition"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <HiSun /> : <HiMoon />}
        </button>

        {/* Profile Dropdown */}
        <Dropdown
          className="border-none"
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User" img={user?.profilePhoto || undefined} rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm font-semibold">
              {user
                ? `${user.firstName} ${user.lastName} (${user.role})`
                : "Guest"}
            </span>
            <span className="block truncate text-sm text-gray-500">
              {user?.email}
            </span>
          </DropdownHeader>

          <DropdownItem>
            {location.pathname === "/profile" ? (
              <div
                onClick={() => navigate("/")}
                className="flex items-center gap-2 hover:text-green-500 w-full cursor-pointer"
              >
                <IoHomeOutline /> Home
              </div>
            ) : (
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-blue-300"
              >
                <FaRegUserCircle />
                Edit Profile
              </Link>
            )}
          </DropdownItem>

          <DropdownDivider />

          <DropdownItem onClick={handleLogout}>
            <div className="flex items-center gap-2 hover:text-red-500 w-full cursor-pointer">
              <RiLogoutBoxLine />
              Sign out
            </div>
          </DropdownItem>
        </Dropdown>
      </div>
    </FlowbiteNavbar>
  );
};

export default Navbar;
