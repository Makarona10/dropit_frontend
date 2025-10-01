"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/useApi";
import axios from "axios";
import { checkIsTokenExpired } from "@/utils/authUtils";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<any>;
  isAuthenticated: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { api } = useApi();
  const baseURL = process.env.NEXT_PUBLIC_SERVER_URI;

  const isAuthenticated = async (): Promise<boolean> => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return false;
    }
    const isTokenExpired = checkIsTokenExpired(accessToken);
    if (!isTokenExpired) {
      return true;
    }

    const res = await refreshUser();
    return res === 200;
  };

  const getUser = async () => {
    try {
      const res = await api("/user/me", "get");
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const res = await axios.post(
        baseURL + "/auth/refresh",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      if (res.data.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.data.accessToken);
      }

      return res.status;
    } catch (err) {
      return 401;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api("/auth/login", "post", { email, password });
      const accessToken = response.data?.data?.access_token;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      await refreshUser();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api("/auth/logout", "post");
      localStorage.removeItem("accessToken");
    } catch (err) {
    } finally {
      router.push("/user/login");
    }
    setUser(null);
  };

  useEffect(() => {
    refreshUser().then(() => {
      getUser();
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, refreshUser, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
