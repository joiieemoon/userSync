import { apiClient } from "../../../lib/api/api-client";

import { ENDPOINTS } from "../../../lib/api/end-points";
import type { PaginationParams } from "../../../components/common/types";
import { RolePayload } from "../types";

export const listrolesApi = async (params: PaginationParams) => {
  const query = new URLSearchParams(params as any).toString();
  const res = await apiClient.get(`${ENDPOINTS.ROLES}?${query}`);
  return res.data.data;
};
export const deleteroleApi = async (id: number) => {
  const res = await apiClient.delete(`${ENDPOINTS.ROLES}/${id}`);
  return res.data;
};
export const updateroleApi = async (id: number, data: RolePayload) => {
  const res = await apiClient.put(`${ENDPOINTS.ROLES}/${id}`, data);
  return res.data;
};
export const getrolebyidApi = async (id: number) => {
  const res = await apiClient.get(`${ENDPOINTS.ROLES}/${id}`);
  return res.data.data;
};
export const createroleApi = async (data: RolePayload) => {
  const res = await apiClient.post(`${ENDPOINTS.ROLES}`, data);
  return res.data;
};
