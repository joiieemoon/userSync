import React from "react";
import {
  Sidebar as Flowbitesidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiChartPie, HiUser, HiShoppingBag } from "react-icons/hi";
import { IoChatbox } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

import { MdCampaign } from "react-icons/md";
// import { FaRegUserCircle } from "react-icons/fa";
import { TbUserEdit } from "react-icons/tb";
interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={`
        fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900
        shadow-lg transform transition-transform duration-300 ease-in-out z-20 pt-6
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <Flowbitesidebar>
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem
              href="dashboard"
              icon={HiChartPie}
              className="hover:text-cyan-500"
            >
              Dashboard
            </SidebarItem>
            <SidebarItem
              href="users"
              icon={HiUser}
              className="hover:text-yellow-500"
            >
              Users
            </SidebarItem>
            <SidebarItem
              href="role"
              icon={HiShoppingBag}
              className="hover:text-red-500"
            >
              Role
            </SidebarItem>
            <SidebarItem
              href="#"
              icon={IoChatbox}
              className="hover:text-pink-400"
            >
              Chat
            </SidebarItem>
            <SidebarItem
              href="#"
              icon={MdCampaign}
              className="hover:text-pink-400"
            >
              Campaign
            </SidebarItem>
          </SidebarItemGroup>

          <SidebarItemGroup className="bottom-0 ">
            <SidebarItem className="bg-amber-300 text-black">
              {location.pathname === "/profile" ? (
                <div
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 hover:text-blue-300 w-full cursor-pointer font-semibold text-black"
                >
                  <IoHomeOutline className="text-2xl" /> Home
                </div>
              ) : (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-black hover:text-blue-300 font-semibold"
                >
                  <TbUserEdit className="text-2xl" />
                  Edit Profile
                </Link>
              )}
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Flowbitesidebar>
    </div>
  );
};

export { Sidebar as Sidebarmain };
