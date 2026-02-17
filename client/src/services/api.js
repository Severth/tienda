import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5099/api', // Using HTTP to avoid SSL issues
    headers: {
        'Content-Type': 'application/json',
    },
});

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
