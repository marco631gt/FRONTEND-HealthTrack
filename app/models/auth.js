// http://localhost:3000/api

import axios from 'axios';
import { getToken } from '../services/storageService';

//Crear la instancia axios
const api = axios.create({
    baseURL: 'https://healthtrack-lw2m.onrender.com/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    async (config) => {
        try {
            const token = await getToken('token');

            if (token !== null) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;