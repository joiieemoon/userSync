import axios from "axios";
import { clearPermissions } from "../../../redux/slice";
import { store } from "../../../redux/store";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: "http://192.168.1.141:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
});
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (!config.headers) {
            config.headers = {};
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
        const isLoginRequest = error.config.url?.includes("/signin");

        console.log(status);

        if ((status === 401 || status === 403) && !isLoginRequest && !isSessionExpiredShown) {
            isSessionExpiredShown = true;

            const message =
                status === 403
                    ? "Access denied. Please login again"
                    : "Session expired, please login again";

            toast.error(message, {
                toastId: "auth-error"
            });

            store.dispatch(clearPermissions());

            localStorage.removeItem("token");
            localStorage.removeItem("user");
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