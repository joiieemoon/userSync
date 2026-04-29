export type RolePermission = {
  moduleId: number;
  list: boolean;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
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
