export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phone: string;
    roleId: number;
    roleTitle: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export type PaginationParams = {
    page: number;
    limit: number;
};