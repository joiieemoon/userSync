import axios from "axios";



const axiosInstance = axios.create({
    baseURL: "https://69c505c18a5b6e2dec2ba04e.mockapi.io/posts",
    headers: {
        "Content-Type": "application/json",
    },
});
axiosInstance.interceptors.request.use(
    (config) => {
        const dummyToken = "dummy-token-for-testing";

        if (!config.headers) {
            config.headers = {};
        }

        config.headers.Authorization = `Bearer ${dummyToken}`;
        console.log("Request sent with token:", config.url);
        // console.log(config.headers.Authorization);
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        // console.log("Response received:", response.data);
        return response;
    },
    (error) => {
        console.error("Response error:", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
