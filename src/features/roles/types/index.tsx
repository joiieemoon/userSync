export type PermissionFlags = {
  list: boolean;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
};

export interface RoleList {
  id: number;
  title: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export type RolePermission = PermissionFlags & {
  moduleId: number;
};

export type RolePayload = {
  title: string;
  status: "active" | "inactive";
  permissions: RolePermission[];
};

export type Role = {
  id: number;
  title: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  permissions: RolePermission[];
};

export type PermissionMap = Record<string, RolePermission>;

export interface ListParams {
  page: number;
  limit: number;
  search?: string;
}

export type AddEditRoleProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: number;
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
