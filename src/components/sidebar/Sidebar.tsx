import React from "react";
import {
  Sidebar as Flowbitesidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiChartPie, HiUser, HiShoppingBag } from "react-icons/hi";
import { IoChatbox } from "react-icons/io5";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`
        fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900
        shadow-lg transform transition-transform duration-300 ease-in-out z-30 pt-6
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <Flowbitesidebar aria-label="Sidebar with logo branding example">
        <SidebarItems>
          <SidebarItemGroup  >
            <SidebarItem href="#" icon={HiChartPie} className="hover:text-cyan-500">
              Dashboard
            </SidebarItem>
            <SidebarItem href="#" icon={HiUser} className="hover:text-yellow-500">
              Users
            </SidebarItem>
            <SidebarItem href="#" icon={HiShoppingBag} className="hover:text-red-500">
              Role
            </SidebarItem>
            <SidebarItem href="#" icon={IoChatbox} className="hover:text-pink-400">
              Chat
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Flowbitesidebar>
    </div>
  );
};

export { Sidebar as Sidebarmain };
