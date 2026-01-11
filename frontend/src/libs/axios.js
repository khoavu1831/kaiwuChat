import axios from 'axios' // axios: thư viện dùng để fetch api
import { useAuthStore } from '../stores/useAuthStore';

const api = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:3000/api" : "/api",
  withCredentials: true,
});

// gắn accessToken vào request header
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    console.log("axios: Bearer successfully");
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// tự động gọi refesh api khi token hết hạn
api.interceptors.response.use((res) => res, async (error) => {
  const originalRequest = error.config;

  // những api không cần kiểm tra
  if (originalRequest.url.includes('/auth/signin') ||
    originalRequest.url.includes('/auth/signup') ||
    originalRequest.url.includes('/auth/refresh')
  ) {
    return Promise.reject(error);
  }

  originalRequest._retryCount = originalRequest._retryCount || 0;

  if (error.response?.status === 403 && originalRequest._retryCount < 4) {
    originalRequest._retryCount += 1;

    console.log("REFRESH count:", originalRequest._retryCount)

    try {
      const res = await api.post('/auth/refresh', { withCredentials: true });
      const newAccessToken = res.data.accessToken;

      useAuthStore.getState().setAccessToken(newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);

    } catch (refreshError) {
      useAuthStore.getState().clearState();
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
});

export default api