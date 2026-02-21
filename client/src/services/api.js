import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5099/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

console.log('API Base URL:', api.defaults.baseURL);

// Interceptor to add Token to every request
api.interceptors.request.use((config) => {
    const user = localStorage.getItem('user');
    if (user) {
        const { token } = JSON.parse(user);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
