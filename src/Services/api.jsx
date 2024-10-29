// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8082/",
  headers: {
    "Content-Type": "application/json",
  },
});
// Add a request interceptor to add the token to each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;
