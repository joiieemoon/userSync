import axiosInstance from "../axios-instance";

export const apiClient = {
    get: (url: string) => axiosInstance.get(url),
    post: (url: string, data: any) => axiosInstance.post(url, data),
    put: (url: string, data: any) => axiosInstance.put(url, data),
    delete: (url: string) => axiosInstance.delete(url),
};

