import axios from "axios";



const axiosInstance = axios.create({
    baseURL: "/api/",
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
        console.log("Request sent with token:", config.url);

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Response received:", response.data);
        return response;
    },
    (error) => {
        console.error("Response error:", error);
        console.error("❌ FULL ERROR:", error.response?.data);
        return Promise.reject(error);
    }

);

export default axiosInstance;