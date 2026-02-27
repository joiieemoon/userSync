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
import { canPermit } from "../../helper/canPermit/canpermit";
import type { RootState } from "../../redux/store/store";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

 
  const { permissions, username } = useSelector(
    (state: RootState) => state.userPermissions,
  );
  if (!username) return null;
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

            {canPermit(permissions, "user", "canView") && (
              <SidebarItem
                onClick={() => navigate("/users")}
                icon={HiUser}
                className="hover:text-yellow-500 cursor-pointer"
              >
                Users
              </SidebarItem>
            )}

            {canPermit(permissions, "role", "canView") && (
              <SidebarItem
                onClick={() => navigate("/role")}
                icon={HiShoppingBag}
                className="hover:text-red-500 cursor-pointer"
              >
                Role
              </SidebarItem>
            )}

            {canPermit(permissions, "chat", "canView") && (
              <SidebarItem
                onClick={() => navigate("/chat")}
                icon={IoChatbox}
                className="hover:text-pink-400 cursor-pointer"
              >
                Chat
              </SidebarItem>
            )}

            {canPermit(permissions, "campaign", "canView") && (
              <SidebarItem
                onClick={() => navigate("/campaign")}
                icon={MdCampaign}
                className="hover:text-pink-400"
              >
                Campaign
              </SidebarItem>
            )}
          </SidebarItemGroup>

          <SidebarItemGroup className="mt-auto">
            <SidebarItem
              as={Link}
              to={location.pathname === "/profile" ? "/" : "/profile"}
              icon={
                location.pathname === "/profile" ? IoHomeOutline : TbUserEdit
              }
              className="bg-amber-300 text-black font-semibold hover:text-blue-300"
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
