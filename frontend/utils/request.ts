import axios from "axios";
import { API_HOST } from "./helpers";

const request = axios.create({
  baseURL: API_HOST, // our API base URL
});

// Request interceptor for adding the bearer token
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the api instance
export default request;
