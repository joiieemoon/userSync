export type PermissionFlags = {
  list: boolean | number;
  view: boolean | number;
  add: boolean | number;
  edit: boolean | number;
  delete: boolean | number;
};
export type PermissionKey = "list" | "view" | "add" | "edit" | "delete";
export type ModuleKey = "users" | "role";
export type Propstoggleswitch = {
  value: AccessMap;
  onChange: (val: AccessMap) => void;
};
export interface RoleList {
  id: number;
  title: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export type RolePermission = PermissionFlags & {
  moduleSlug: string;
};

export type RolePayload = {
  title: string;
  status: "active" | "inactive";
  permissions: RolePermission[];
};
export type GetRoleByIdResponse = {
  id: number;
  role: {
    title?: string;
    status: "active" | "inactive";
  };
  permissions: PermissionWithSlug[];
};
export type Role = {
  id: number;
  title: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  permissions: RolePermission[];
};
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
  title?: string;
  footer?: React.ReactNode;
}
export type PermissionState = {
  role: string | { title: string; status: "active" | "inactive" };
  permissions: Record<string, PermissionFlags>;
};
export type PermissionMap = Record<string, PermissionFlags>;

export interface ListParams {
  page: number;
  limit: number;
  search?: string;
}

export type AddEditRoleProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: number | undefined;
};

export type PermissionWithSlug = PermissionFlags & {
  moduleSlug: string;
};
export type UpdateRolePayload = {
  title: string;
  status: "active" | "inactive";
  permissions: PermissionFlags[];
};
export type AccessMap = Record<string, PermissionFlags>;
