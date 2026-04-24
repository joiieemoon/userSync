export const moduleMap: Record<string, number> = {
  role: 1,
  users: 2,
};
export const formatPermissionsForAPI = (permissions: any = {}) => {
  return Object.keys(permissions)
    .map((key) => {
      const moduleId = moduleMap[key];

      if (!moduleId) return null; // safety check

      return {
        moduleId,
        list: !!permissions[key]?.list,
        view: !!permissions[key]?.view,
        add: !!permissions[key]?.add,
        edit: !!permissions[key]?.edit,
        delete: !!permissions[key]?.delete,
      };
    })
    .filter(Boolean);
};
export const formatPermissionsForUI = (permissions: any[] = []) => {
  const moduleMap: Record<number, string> = {
    1: "role",
    2: "users",
  };

  const result: Record<string, any> = {};

  permissions.forEach((item) => {
    const key = moduleMap[item.moduleId]; // 👈 SAFE & RELIABLE

    if (!key) return;

    result[key] = {
      list: !!item.list,
      view: !!item.view,
      add: !!item.add,
      edit: !!item.edit,
      delete: !!item.delete,
    };
  });

  return result;
};
// export const formatPermissionsForAPI = (permissions: any = {}) => {
//   return Object.keys(permissions).map((key) => ({
//     moduleId: key === "role" ? 1 : 2, // or dynamic map better
//     list: !!permissions[key]?.list,
//     view: !!permissions[key]?.view,
//     add: !!permissions[key]?.add,
//     edit: !!permissions[key]?.edit,
//     delete: !!permissions[key]?.delete,
//   }));
// };
// export const formatPermissionsForUI = (permissions: any[] = []) => {
//   const result: Record<string, any> = {};

//   permissions.forEach((item) => {
//     // const key = item.moduleName?.toLowerCase();
//     // const key = item.moduleName?.trim().toLowerCase();
//     const key = moduleMap[item.moduleId];
//     if (!key) return;

//     result[key] = {
//       list: !!item.list,
//       view: !!item.view,
//       add: !!item.add,
//       edit: !!item.edit,
//       delete: !!item.delete,
//     };
//   });

//   return result;
// };
