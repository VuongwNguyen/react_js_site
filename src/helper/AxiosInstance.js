import axios from "axios";


const AxiosInstance = (contentType = "application/json") => {
    const axiosInstance = axios.create({
        // baseURL: "http://localhost:5000/",
        baseURL: "https://lobster-app-wos9a.ondigitalocean.app/",
    });
    axiosInstance.interceptors.request.use(
        async (config) => {
            // const token = localStorage.getItem("token");
            // const token = '';
            config.headers = {
                // 'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType,
                'security': 'secure_code'
            };
            return config;
        },
        err => Promise.reject(err)
    );
    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );

    return axiosInstance;
};
export default AxiosInstance;