
import { apiClient } from "../../../../lib/api/api-client";
import { ENDPOINTS } from "../../../../lib/api/end-points";
export const loginApi = async (data: {
    email: string;
    password: string;
}) => {
    const res = await apiClient.post(ENDPOINTS.LOGIN, data);
    return res.data.data;
};

export const signupApi = async (data: any) => {
    const res = await apiClient.post(ENDPOINTS.SIGNUp, data);
    return res.data.data;
};