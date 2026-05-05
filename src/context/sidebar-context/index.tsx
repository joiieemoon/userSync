import { createContext, useContext, useState, useEffect } from "react";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useDispatch } from "react-redux";
import { useGetRoleById } from "../../features/roles/hooks";
import { setPermissions } from "../../redux/slice";
import type { PermissionState } from "../../redux/slice";
import type {
  PermissionFlags,
  RolePermission,
} from "../../features/roles/types";
type SidebarContextType = {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isHovered: boolean;
  activeItem: string | null;
  openSubmenu: string | null;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setIsHovered: (isHovered: boolean) => void;
  setActiveItem: (item: string | null) => void;
  toggleSubmenu: (item: string) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
};

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { data } = useGetRoleById(user?.roleId || 0);

  useEffect(() => {
    if (data) {
      const permissionData: PermissionState = {
        role: data.role.title || "",
        permissions: data.permissions.reduce(
          (acc: Record<string, PermissionFlags>, perm: RolePermission) => {
acc[perm.moduleSlug] = {
              list: perm.list,
              view: perm.view,
              add: perm.add,
              edit: perm.edit,
              delete: perm.delete,
            };
            return acc;
          },
          {} as Record<string, PermissionFlags>,
        ),
      };
      dispatch(setPermissions(permissionData));
    }
  }, [data, dispatch]);

  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const toggleSubmenu = (item: string) => {
    setOpenSubmenu((prev) => (prev === item ? null : item));
  };

  return (
    <SidebarContext.Provider
      value={{
        isExpanded: isMobile ? false : isExpanded,
        isMobileOpen,
        isHovered,
        activeItem,
        openSubmenu,
        toggleSidebar,
        toggleMobileSidebar,
        setIsHovered,
        setActiveItem,
        toggleSubmenu,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
