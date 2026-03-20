import React, { useEffect } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar as FlowbiteNavbar,
  NavbarBrand,
} from "flowbite-react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../../services/firebase/firebase.ts";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store/store";

import { BiSolidLogOut } from "react-icons/bi";
import avatar from "../../../../public/avtar.png";
import { setUserPermissions } from "../../../redux/permissionslice";
import { useDispatch } from "react-redux";
import useUsers from "../../../hooks/use-user";
import { setUser } from "../../../redux/store/auth-slice";
import type { NavbarProps } from "../../../types/interfaces";

import { IoMdHome } from "react-icons/io";
const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: RootState) => state.auth.user);

  const { users } = useUsers();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.currentUser) return;

    const currentUser = users.find((u) => u.uid === auth.currentUser.uid);
    if (currentUser) {
      dispatch(
        setUser({
          uid: currentUser.uid,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          profilePhoto: currentUser.profilePhoto,
          role: currentUser.role || "User",
          phone: currentUser.phone,
          bio: currentUser.bio,
        }),
      );
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
        position: "top-center",
      });
    }
  };

  return (
    <FlowbiteNavbar
      fluid
      className={`fixed top-0 z-50 w-full !bg-white text-black   shadow-md px-6 transition-all duration-300
  ${isOpen ? "pl-64" : "pl-6"}`}
    >
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4 border-none ">
        <button
          onClick={toggleSidebar}
          className="text-2xl hover:text-blue-500 transition cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <HiMenuAlt1 />
        </button>

        <NavbarBrand>
          <span className="text-xl font-bold tracking-wide ">User Sync</span>
        </NavbarBrand>
      </div>

      <div className="flex items-center gap-6 cursor-pointer">
        <Dropdown
          className="border-none !bg-white text-black  cursor-pointer "
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User" img={user?.profilePhoto || avatar} rounded />
          }
        >
          <DropdownHeader className="bg-gray-200">
            <span className="block text-sm text-black font-semibold  ">
              {user
                ? `${user.firstName} ${user.lastName} (${user.role})`
                : "Guest"}
            </span>
            <span className="block truncate text-sm text-gray-500">
              {user?.email}
            </span>
          </DropdownHeader>

          <DropdownItem className="!bg-white text-black ">
            {location.pathname === "/profile" ? (
              <div
                onClick={() => navigate("/")}
                className="flex items-center gap-2 hover:text-green-500 w-full cursor-pointer  text-black "
              >
                <IoMdHome className="text-black  " /> Home
              </div>
            ) : (
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-blue-300 text-gray-600 "
              >
                <FaRegUserCircle className="text-xl text-gray-400" />
                Edit Profile
              </Link>
            )}
          </DropdownItem>

          <DropdownDivider />

          <DropdownItem
            onClick={handleLogout}
            className="!bg-white flex items-center "
          >
            <div className="flex items-center gap-2   hover:text-red-500 w-full cursor-pointer text-gray-600">
              <BiSolidLogOut className="text-xl text-gray-400" />
              Sign out
            </div>
          </DropdownItem>
        </Dropdown>
      </div>
    </FlowbiteNavbar>
  );
};

export default Navbar;
