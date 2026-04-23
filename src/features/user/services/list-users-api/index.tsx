import { apiClient } from "../../../../lib/api/api-client";
import { ENDPOINTS } from "../../../../lib/api/end-points";
type PaginationParams = {
  page: number;
  limit: number;
};
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
export const getuserbyidApi = async (id: number) => {
  const res = await apiClient.get(`${ENDPOINTS.USERS}/${id}`);
  return res.data.data.user;
};
export const listusersApi = async (params: PaginationParams) => {
  const query = new URLSearchParams(params as any).toString();

  const res = await apiClient.get(`${ENDPOINTS.USERS}?${query}`);

  return res.data.data;
};
export const deleteuserApi = async (id: string) => {
  const res = await apiClient.delete(`${ENDPOINTS.USERS}/${id}`);
  return res.data;
};
export const updateuserApi = async (id: number, data: User) => {
  const res = await apiClient.put(`${ENDPOINTS.USERS}/${id}`, data);
  return res.data;
};
