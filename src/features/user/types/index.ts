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
    password?: string;
}
export interface updateUser {
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
    password?: string;
    role?: string;
}
export type PaginationParams = {
    page: number;
    limit: number;
};