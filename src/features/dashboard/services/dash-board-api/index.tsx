import { apiClient } from "../../../../lib/api/api-client";
import { ENDPOINTS } from "../../../../lib/api/end-points";
export const getDashboardDataApi = async () => {
  const res = await apiClient.get(ENDPOINTS.DASHBOARD_DATA);
  return res.data.data;
};
