import axios from 'axios';
import { getToken, clearToken } from '../features/auth/services/token.service';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || '' });

// Attach JWT to outgoing requests
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally (token expired/invalid) -> clear token and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearToken();
      // Best-effort redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
