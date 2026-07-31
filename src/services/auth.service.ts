import axios, { AxiosError } from "axios";
import { TokenService } from "./token.service";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = TokenService.getAccessToken();
    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const originalRequest = error.config as any;
    const status = error.response?.status;

    if ((status === 401 || status === 403) && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = TokenService.getRefreshToken();
      if (!refreshToken) {
        TokenService.clearTokens();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        axios
          .post<{ access: string }>(
            `${API_BASE_URL}/api/token/refresh/`,
            { refresh: refreshToken }
          )
          .then(({ data }) => {
            TokenService.setTokens({
              access_token: data.access,
              refresh_token: refreshToken,
            });
            apiClient.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
            processQueue(null, data.access);

            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
            }
            resolve(apiClient(originalRequest));
          })
          .catch((refreshErr) => {
            processQueue(refreshErr, null);
            TokenService.clearTokens();
            window.location.href = "/login";
            reject(refreshErr);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  }
);

export const AuthService = {
  async signIn(user_name: string, password: string) {
    try {
      const response = await apiClient.post<{ access: string; refresh: string }>("/api/token/", {
        user_name,
        password,
      });
      TokenService.setTokens({
        access_token: response.data.access,
        refresh_token: response.data.refresh,
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.detail || "Invalid username or password.";
    }
  },

  async register(user_name: string, email: string, password: string) {
    try {
      const response = await apiClient.post("/api/account/register/", {
        user_name,
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || "Registration failed. Username may already exist.";
    }
  },
};
