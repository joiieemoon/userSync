import axios, { AxiosHeaders } from "axios";
import { clearPermissions } from "../../../redux/slice";
import { store } from "../../../redux/store";
import { toast } from "react-toastify";
import * as Sentry from "@sentry/react";
enum StatusCode {
    NotFound = 404,
  
    Unauthorized = 401,
    Forbidden = 403
}
const axiosInstance = axios.create({
    // baseURL: "http://192.168.1.141:8000/api/",

    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");


        if (!config.headers) {
            config.headers = new AxiosHeaders();
        }


        config.headers.Authorization = `Bearer ${token}`;


        return config;
    },
    (error) => Promise.reject(error)
);


let isSessionExpiredShown = false;

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        console.log(status);
        console.log(error);
        const isLoginRequest = error.config.url?.includes("/signin");
        Sentry.captureException(error);
        console.log(status);

        if ((status === StatusCode.Unauthorized || status === StatusCode.Forbidden) && !isLoginRequest && !isSessionExpiredShown) {
            isSessionExpiredShown = true;

            const message =
                status === StatusCode.Forbidden
                    ? "Access denied. Please login again"
                    : "Session expired, please login again";

            toast.error(message, {
                toastId: "auth-error"
            });

            store.dispatch(clearPermissions());

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            Sentry.setUser(null);
            sessionStorage.clear();

            setTimeout(() => {
                window.location.href = "/signin";
                isSessionExpiredShown = false;
            }, 1500);
        }

        return Promise.reject(error);
    }
);
    

export default axiosInstance;