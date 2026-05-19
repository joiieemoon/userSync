import { useCallback } from "react";
import { Link, useLocation } from "react-router";


import { useSidebar } from "../../context/sidebar-context";
import { useNavItems } from "../../constant/route";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const { navItems, othersItems } = useNavItems();
  
 


  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav) => (
        <li key={nav.name}>
          <Link
            to={nav.path!}
            className={`menu-item group ${
              isActive(nav.path!) ? "menu-item-active" : "menu-item-inactive"
            }`}
          >
            <span className="menu-item-icon-size">{nav.icon}</span>

            {(isExpanded || isHovered || isMobileOpen) && (
              <span className="menu-item-text">{nav.name}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
              ? "w-[290px]"
              : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          <img src="/images/logo/logo.svg" alt="Logo" width={150} height={40} />
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto no-scrollbar">
        <nav className="mb-6">
          {renderMenuItems(navItems)}

          <h2 className="mt-6 text-xs text-gray-400">Others</h2>

          {/* {renderMenuItems(othersItems, "others")} */}
          {renderMenuItems(othersItems)}
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
