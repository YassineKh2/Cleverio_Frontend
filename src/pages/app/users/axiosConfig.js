// src/services/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,  // Ensure credentials are sent
    headers: {
        'Content-Type': 'application/json', // adjust if necessary
    }
});

axiosInstance.interceptors.request.use((config) => {
    // Set JWT token if it exists
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
