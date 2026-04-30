
import { apiClient } from "../../../../lib/api/api-client";
import { ENDPOINTS } from "../../../../lib/api/end-points";
import { LoginResponse, SignupResponse } from "../../types";

export const loginApi = async (data: LoginResponse) => {
    const res = await apiClient.post(ENDPOINTS.LOGIN, data);
    return res.data.data;
};

export const signupApi = async (data: SignupResponse) => {
    const res = await apiClient.post(ENDPOINTS.SIGNUp, data);
    return res.data.data;
};
