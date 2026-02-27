export const canPermit = (
    permissions: any,
    module: string,
    action: "canAdd" | "canEdit" | "canDelete" | "canView"
) => {
    const modulekey=module.toLowerCase();
    const result = permissions?.[modulekey]?.[action] === true;
    console.log(`canPermit -> module: ${module}, action: ${action}, result: ${result}`);
    // return permissions?.[modulekey]?.[action] === true;
    return result;
};
