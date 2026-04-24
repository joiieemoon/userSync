import { apiClient } from "../../../../lib/api/api-client";
import { ENDPOINTS } from "../../../../lib/api/end-points";
import { User } from "../../../auth/types";
export const updateProfileApi = async (data: User) => {
  const res = await apiClient.put(ENDPOINTS.PROFILE, data);
  return res.data.data;
};
export const getProfilebyidApi = async (id: number) => {
  const res = await apiClient.get(`${ENDPOINTS.PROFILE}/${id}`);
  return res.data.data;
};
  