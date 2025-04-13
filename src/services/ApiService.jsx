import axios from "axios";
import config from "../config/config";
import toast from "react-hot-toast";

const ApiService = axios.create({
  baseURL: config.API,
  headers: { "Content-Type": "application/json" },
});

ApiService.interceptors.request.use(
  (config) => {
    if (config.authentication) {
      const token = sessionStorage.getItem("token");
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error?.status == 401) {
      toast.error(
        error?.response?.data?.Error ||
          error.message ||
          "Something went wrong! Try again later"
      );
      sessionStorage.clear();

      setTimeout(() => {
        window.location.href = "http://localhost:5173";
      }, 2000);
    }
    return Promise.reject(error);
  }
);

export default ApiService;
