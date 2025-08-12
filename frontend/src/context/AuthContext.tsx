import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  setAuthData: (token: string, user?: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const login = (userData: User, tokenValue: string) => {
    setUser(userData);
    setToken(tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenValue);
  };

  const setAuthData = (tokenValue: string, userData?: User) => {
    if (userData) {
      login(userData, tokenValue);
    } else {
      setToken(tokenValue);
      localStorage.setItem("token", tokenValue);
      try {
        const payload = JSON.parse(atob(tokenValue.split(".")[1]));
        if (payload) {
          const decodedUser: Partial<User> = {
            id: payload.id,
            nombre: payload.nombre || payload.name || "",
            email: payload.email,
            rol: payload.rol || payload.role || "user",
          };
          if (decodedUser.email || decodedUser.id) {
            const fullUser: User = {
              id: Number(decodedUser.id || 0),
              nombre: decodedUser.nombre || "",
              email: decodedUser.email || "",
              rol: decodedUser.rol || "user",
            };
            setUser(fullUser);
            localStorage.setItem("user", JSON.stringify(fullUser));
          }
        }
      } catch {
        // Ignorar error de decodificación
      }
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!token;

  const value = useMemo(() => ({
    user,
    token,
    login,
    setAuthData,
    logout,
    isAuthenticated,
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

