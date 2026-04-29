import { apiClient } from "../../../../lib/api/api-client";
import { ENDPOINTS } from "../../../../lib/api/end-points";
import { User, PaginationParams } from "../../types";

export const getuserbyidApi = async (id: number) => {
  const res = await apiClient.get(`${ENDPOINTS.USERS}/${id}`);
  return res.data.data.user;
};
export const listusersApi = async (params: PaginationParams) => {
  const query = new URLSearchParams(params as any).toString();

  const res = await apiClient.get(`${ENDPOINTS.USERS}?${query}`);

  return res.data.data;
};
export const deleteuserApi = async (id: number) => {
  const res = await apiClient.delete(`${ENDPOINTS.USERS}/${id}`);
  return res.data;
};
export const updateuserApi = async (id: number, data: User) => {
  const res = await apiClient.put(`${ENDPOINTS.USERS}/${id}`, data);
  return res.data;
};
export const createuserApi = async (data: User) => {
  const res = await apiClient.post(`${ENDPOINTS.USERS}`, data);
  return res.data;
};
