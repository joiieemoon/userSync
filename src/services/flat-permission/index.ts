
export const flattenPermissions = (permissions: any) => {
  const flat: Record<string, boolean> = {};
  if (!permissions) return flat;

  for (const key of ["role", "user", "chat"]) {
    if (permissions[key]) {
      for (const perm of ["canAdd", "canDelete", "canEdit", "canView"]) {
        flat[`permissions_${key}_${perm}`] = permissions[key][perm] ?? false;
      }
    }
  }
  return flat;
};


export const nestPermissions = (data: any) => {
  const permissions: any = { role: {}, user: {}, chat: {} };
  for (const key of ["role", "user", "chat"]) {
    for (const perm of ["canAdd", "canDelete", "canEdit", "canView"]) {
      const flatKey = `permissions_${key}_${perm}`;
      permissions[key][perm] = data[flatKey] ?? false;
      delete data[flatKey]; 
    }
  }
  return permissions;
};