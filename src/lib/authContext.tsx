"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize token synchronously from localStorage
  const initialToken =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const [token, setToken] = useState<string | null>(initialToken);
  const [isLoading, setIsLoading] = useState<boolean>(initialToken === null);

  const router = useRouter();

  // Sync token with localStorage changes (e.g., external updates)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "access_token") {
        setToken(e.newValue);
        setIsLoading(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Redirect only if not authenticated and not loading
  useEffect(() => {
    if (!isLoading && token === null && typeof window !== "undefined") {
      router.push("/user/login");
    }
  }, [token, isLoading, router]);

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setIsLoading(false);
    router.push("/user/login");
  };

  const value = {
    token,
    setToken,
    isAuthenticated: !!token,
    isLoading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
