import { useCallback } from "react";
import { Link, useLocation } from "react-router";
import { useSelector } from "react-redux";

import type { RootState } from "../../redux/store";
import {
  GridIcon,
  GroupIcon,
  UserCircleIcon,
  UserIcon,
} from "../../assets/icons";

import { useSidebar } from "../../context/sidebar-context";
// import { getAccess } from "../../lib/helper/flate-permission";
// import Button from "../../components/ui/button";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const { permissions } = useSelector((state: RootState) => state.permissions);

  // const getAccess = (permissions: AccessMap) => {
  //   return permissions;
  // };

  const access = permissions;
  // const access = permissions;
  const canviewUser = access?.users?.view;
  const canviewRole = access?.role?.view;
  console.log(canviewRole);

  const navItems: NavItem[] = [
    {
      icon: <GridIcon />,
      name: "Dashboard",
      path: "/",
    },

    canviewUser && {
      icon: <UserIcon />,
      name: "Users",
      path: "/users",
    },

    canviewRole && {
      icon: <GroupIcon />,
      name: "Roles",
      path: "/roles",
    },
  ].filter(Boolean) as NavItem[];

  const othersItems: NavItem[] = [
    {
      icon: <UserCircleIcon />,
      name: "User Profile",
      path: "/profile",
    },
  ];

  // const [openSubmenu, setOpenSubmenu] = useState<{
  //   type: "main" | "others";
  //   index: number;
  // } | null>(null);

  // const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
  //   {},
  // );

  // const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );

  // useEffect(() => {
  //   ["main", "others"].forEach((menuType) => {
  //     const items = menuType === "main" ? navItems : othersItems;

  //     items.forEach((nav, index) => {
  //       if (nav.subItems) {
  //         nav.subItems.forEach((subItem) => {
  //           if (isActive(subItem.path)) {
  //           }
  //         });
  //       }
  //     });
  //   });
  // }, [location, isActive, navItems]);

  // useEffect(() => {
  //   if (openSubmenu !== null) {
  //     const key = `${openSubmenu.type}-${openSubmenu.index}`;
  //     if (subMenuRefs.current[key]) {
  //       setSubMenuHeight((prevHeights) => ({
  //         ...prevHeights,
  //         [key]: subMenuRefs.current[key]?.scrollHeight || 0,
  //       }));
  //     }
  //   }
  // }, [openSubmenu]);

  // const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
  //   setOpenSubmenu((prevOpenSubmenu) => {
  //     if (
  //       prevOpenSubmenu &&
  //       prevOpenSubmenu.type === menuType &&
  //       prevOpenSubmenu.index === index
  //     ) {
  //       return null;
  //     }
  //     return { type: menuType, index };
  //   });
  // };
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
  // const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
  //   <ul className="flex flex-col gap-4">
  //     {items.map((nav, index) => (
  //       <li key={nav.name}>
  //         {nav.subItems ? (
  //           <Button
  //             onClick={() => handleSubmenuToggle(index, menuType)}
  //             className={`menu-item group ${
  //               openSubmenu?.type === menuType && openSubmenu?.index === index
  //                 ? "menu-item-active"
  //                 : "menu-item-inactive"
  //             } cursor-pointer ${
  //               !isExpanded && !isHovered
  //                 ? "lg:justify-center"
  //                 : "lg:justify-start"
  //             }`}
  //           >
  //             <span
  //               className={`menu-item-icon-size  ${
  //                 openSubmenu?.type === menuType && openSubmenu?.index === index
  //                   ? "menu-item-icon-active"
  //                   : "menu-item-icon-inactive"
  //               }`}
  //             >
  //               {nav.icon}
  //             </span>

  //             {(isExpanded || isHovered || isMobileOpen) && (
  //               <span className="menu-item-text">{nav.name}</span>
  //             )}

  //             {(isExpanded || isHovered || isMobileOpen) && (
  //               <ChevronDownIcon
  //                 className={`ml-auto w-5 h-5 transition-transform duration-200 ${
  //                   openSubmenu?.type === menuType &&
  //                   openSubmenu?.index === index
  //                     ? "rotate-180 text-brand-500"
  //                     : ""
  //                 }`}
  //               />
  //             )}
  //           </Button>
  //         ) : (
  //           nav.path && (
  //             <Link
  //               to={nav.path}
  //               className={`menu-item group ${
  //                 isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
  //               }`}
  //             >
  //               <span
  //                 className={`menu-item-icon-size ${
  //                   isActive(nav.path)
  //                     ? "menu-item-icon-active"
  //                     : "menu-item-icon-inactive"
  //                 }`}
  //               >
  //                 {nav.icon}
  //               </span>

  //               {(isExpanded || isHovered || isMobileOpen) && (
  //                 <span className="menu-item-text">{nav.name}</span>
  //               )}
  //             </Link>
  //           )
  //         )}
  //       </li>
  //     ))}
  //   </ul>
  // );

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
