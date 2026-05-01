import axios from "axios";
import { clearPermissions } from "../../../redux/slice";
import { store } from "../../../redux/store";

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

axiosInstance.interceptors.response.use(
    (response) => {

        return response;
    },
    (error) => {
        const status = error?.response?.status;
        console.log(status);

        if (status === 401) {

            store.dispatch(clearPermissions());



            localStorage.removeItem("token");
            localStorage.removeItem("user");
            sessionStorage.clear();
          


            window.location.href = "/signin";
        }
        return Promise.reject(error);
    }

);

export default axiosInstance;