import { checkIsTokenExpired } from "@/utils/authUtils";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URI;

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 25000,
  timeoutErrorMessage: "Request timed out",
});

api.interceptors.request.use(
  async (req: InternalAxiosRequestConfig) => {
    if (
      req.url?.includes("/auth/login") ||
      req.url?.includes("/auth/register")
    ) {
      return req;
    }

    let token: string | null = localStorage.getItem("accessToken");
    if (!token) {
      if (
        window.location.pathname !== "/user/login" &&
        window.location.pathname !== "/user/register" &&
        window.location.pathname !== "/"
      ) {
        return Promise.reject(401);
      }
    }

    const isExpired = checkIsTokenExpired(token || "");
    if (!isExpired) {
      req.headers["Authorization"] = `Bearer ${token}`;
      return req;
    }

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const response = await axios.post(
          `${baseURL}/auth/refresh`,
          {},
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          },
        );

        const newAccessToken = response.data?.data?.access_token;
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          api.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);
          req.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return req;
        }
      } catch (error) {
        processQueue(error, null);
        localStorage.removeItem("accessToken");
        if (
          window.location.pathname !== "/user/login" &&
          window.location.pathname !== "/user/register" &&
          window.location.pathname !== "/"
        ) {
          window.location.href = "/user/login";
        }
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return new Promise((resolve, reject) => {
      failedQueue.push({
        resolve: (token: string) => {
          req.headers["Authorization"] = `Bearer ${token}`;
          resolve(req);
        },
        reject: (err: any) => reject(err),
      });
    });
  },
  (error: AxiosError) => Promise.reject(error),
);

export default api;
