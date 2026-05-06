import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { GridIcon, GroupIcon, UserCircleIcon, UserIcon } from "../assets/icons";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
};

export const useNavItems = () => {
  const { permissions } = useSelector((state: RootState) => state.permissions);

  const canviewUser = permissions?.users?.view;
  const canviewRole = permissions?.role?.view;

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

  return { navItems, othersItems };
};
