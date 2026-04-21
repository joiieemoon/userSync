// api/auth.api.ts

import { apiClient } from "../api-client";
import { ENDPOINTS } from "../end-points";
export const loginApi = async (data: {
    email: string;
    password: string;
}) => {
    const res = await apiClient.post(ENDPOINTS.LOGIN, data);
    return res.data.data;
};  