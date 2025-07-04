import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://pulselink-backend.onrender.com/api",
  withCredentials: true,
});
