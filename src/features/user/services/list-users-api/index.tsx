import { apiClient } from "../../../../lib/api/api-client";
import { ENDPOINTS } from "../../../../lib/api/end-points";
type PaginationParams = {
  page: number;
  limit: number;
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
