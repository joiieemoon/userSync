import React from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar as FlowbiteNavbar, NavbarBrand, NavbarToggle } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../components/firebase/firebase"; 
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface NavbarProps {
  toggleSidebar: () => void;
}
interface User {
  firstName: string;
  lastname: string;
  email: string;
}

interface NavbarProps {
  toggleSidebar: () => void;
  user: User | null;
}


const Navbar: React.FC<NavbarProps> = ({ toggleSidebar ,user}) => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logged out successfully!", { position: "top-center" });
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Logout failed", { position: "bottom-center" });
    }
  };

  return (
    <FlowbiteNavbar fluid className="bg-white dark:bg-gray-900 text-gray-700 dark:text-white shadow-md px-4 fixed w-full top-0 z-50">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="text-2xl text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
        >
          <HiMenuAlt1 />
        </button>

        <NavbarBrand href="#">
          <span className="text-xl font-semibold dark:text-white">User Sync</span>
        </NavbarBrand>
      </div>

      <div className="flex items-center gap-4 md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}
        >
          <DropdownHeader>
            {/* <span className="block text-sm">{user.?firstname || "gUEST"}</span> */}
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </DropdownHeader>
          <DropdownDivider />
          <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
        </Dropdown>

        <NavbarToggle />
      </div>
    </FlowbiteNavbar>
  );
};

export default Navbar;
