import React from "react";
import {
  Sidebar as Flowbitesidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiChartPie, HiUser, HiShoppingBag } from "react-icons/hi";
import { IoChatbox, IoHomeOutline } from "react-icons/io5";
import { MdCampaign } from "react-icons/md";
import { TbUserEdit } from "react-icons/tb";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { canPermit } from "../../../services/can-permission";
import type { RootState } from "../../../redux/store";
import type { SidebarProps } from "../../../types/interfaces";

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { permissions, username } = useSelector(
    (state: RootState) => state.userPermissions,
  );

  // if (!username) return null;

  return (
    <div
      className={`
        fixed top-0 left-0 h-screen w-64
        !bg-white 
        shadow-lg transform transition-transform duration-300 ease-in-out z-20 pt-6
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <Flowbitesidebar className="!bg-white border-r border-gray-200 h-full">
        <SidebarItems className="!bg-white flex flex-col h-full justify-between">
          <SidebarItemGroup className="!bg-white">
            <SidebarItem
              onClick={() => navigate("/dashboard")}
              icon={HiChartPie}
              className={`cursor-pointer !bg-white text-black dark:text-black
              hover:!bg-gray-100 hover:text-blue-700 ${
                location.pathname === "/dashboard" || location.pathname === "/"
                  ? "bg-blue-50 text-blue-600"
                  : ""
              }`}
            >
              Dashboard
            </SidebarItem>

            {/* {canPermit(permissions, "user", "canView") && ( */}
            <SidebarItem
              onClick={() => navigate("/users")}
              icon={HiUser}
              className={`cursor-pointer !bg-white text-black dark:text-black
              hover:!bg-gray-100 hover:text-blue-700 ${
                location.pathname === "/users" ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              Users
            </SidebarItem>
            {/* )} */}

            {/* {canPermit(permissions, "role", "canView") && ( */}
            <SidebarItem
              onClick={() => navigate("/role")}
              icon={HiShoppingBag}
              className={`cursor-pointer !bg-white text-black dark:text-black
              hover:!bg-gray-100 hover:text-blue-700 ${
                location.pathname === "/role" ? "bg-white-50 " : ""
              }`}
            >
              Role
            </SidebarItem>
            {/* )} */}

            <SidebarItem
              onClick={() => navigate("/chat")}
              icon={IoChatbox}
              className={`cursor-pointer !bg-white text-black dark:text-black
              hover:!bg-gray-100 hover:text-blue-700 
                 ${location.pathname === "/chat" ? "bg-blue-50 text-blue-600 " : ""}`}
            >
              Chat
            </SidebarItem>

            {canPermit(permissions, "campaign", "canView") && (
              <SidebarItem
                onClick={() => navigate("/campaign")}
                icon={MdCampaign}
                className={`cursor-pointer !bg-white text-black dark:text-black
              hover:!bg-gray-100 text-black border-none hover:text-purple-500 ${
                location.pathname === "/campaign"
                  ? "bg-blue-50 text-blue-600"
                  : ""
              }`}
              >
                Campaign
              </SidebarItem>
            )}
          </SidebarItemGroup>

          <SidebarItemGroup className="outline-none border-none">
            <SidebarItem
              as={Link}
              to={location.pathname === "/profile" ? "/" : "/profile"}
              icon={
                location.pathname === "/profile" ? IoHomeOutline : TbUserEdit
              }
              className=" !bg-white text-black dark:text-black font-medium
              hover:!bg-gray-100 text-black border-none  "
            >
              {location.pathname === "/profile" ? "Home" : "Edit Profile"}
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Flowbitesidebar>
    </div>
  );
};

export { Sidebar as Sidebarmain };
