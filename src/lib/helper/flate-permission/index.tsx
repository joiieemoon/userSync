import type {
  RolePermission,
  PermissionMap,
  PermissionWithSlug,
  AccessMap,
} from "../../../features/roles/types";
export const moduleIdMap: Record<number, string> = {
  1: "role",
  2: "users",
};

export const formatPermissionsForUI = (permissions: PermissionWithSlug[] = []) => {
  const result: AccessMap = {};

  permissions.forEach((perm) => {
    const key = perm.moduleSlug?.trim()?.toLowerCase();

    if (!key) return;

    result[key] = {
      view: perm.view === 1,
      add: perm.add === 1,
      edit: perm.edit === 1,
      delete: perm.delete === 1,
      list: perm.list === 1,
    };
  });

  return result;
};
/**
 * Formats permissions object into API-ready array structure using moduleId
 */
export const formatPermissionsForAPI = (
  permissions: PermissionMap = {},
): RolePermission[] => {
  return Object.keys(permissions)
    .map((key) => {
      const moduleId = Object.entries(moduleIdMap).find(
        ([, v]) => v === key,
      )?.[0]; 

      if (!moduleId) return null;

      return {
        moduleId: Number(moduleId),
        list: !!permissions[key]?.list,
        view: !!permissions[key]?.view,
        add: !!permissions[key]?.add,
        edit: !!permissions[key]?.edit,
        delete: !!permissions[key]?.delete,
      };
    })
    .filter(Boolean) as RolePermission[];
};
/**
 * Maps permissions array into module-wise access object
 */

export const getAccess = (
  permissions: PermissionWithSlug[] = [],
): AccessMap => {
  if (!Array.isArray(permissions)) return {};

  return permissions.reduce((acc, item) => {
    acc[item.moduleSlug] = {
      add: !!item.add,
      edit: !!item.edit,
      delete: !!item.delete,
      view: !!item.view,
      list: !!item.list,
    };
    return acc;
  }, {} as AccessMap);
};
