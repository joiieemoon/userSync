import type { PermissionKey } from "../features/roles/types";
//role tabel headers
export const tableHeaders = [
    "id",
    "Role Name",
    "Status",
    "Created At",
    "Updated At",
    "Action",
];
//user-table headers
export const tableHeadersUsers = [
    "User Details",

    "Email",
    "Role",
    "Status",
    "Created At",
    "Updated At",
    "Action",
];
//permission key toggle-switch
 export   const permissionKeys: PermissionKey[] = [
      "list",
      "view",
      "add",
      "edit",
      "delete",
    ];