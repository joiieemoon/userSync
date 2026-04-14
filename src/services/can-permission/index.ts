export const canPermit = (
    permissions: any,
    module: string,
    action: "canAdd" | "canEdit" | "canDelete" | "canView"
) => {
    const modulekey=module.toLowerCase();
    const result = permissions?.[modulekey]?.[action] === true;
  
    return result;
};
