export const canPermit = (
    permissions: any,
    module: string,
    action: "canAdd" | "canEdit" | "canDelete" | "canView"
) => {
    const result = permissions?.[module]?.[action] === true;
    // console.log(`canPermit -> module: ${module}, action: ${action}, result: ${result}`);
    return permissions?.[module]?.[action] === true;
};
