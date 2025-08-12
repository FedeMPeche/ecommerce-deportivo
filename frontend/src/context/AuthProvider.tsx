import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getToken, logout as authLogout } from "../utils/authService";

interface AuthContextType {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  setAuthData: (token: string, user?: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setToken(storedToken);
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        setUser(payload);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const setAuthData = (newToken: string, newUser?: any) => {
    setToken(newToken);
    setUser(newUser || null);
  };

  const logout = () => {
    authLogout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        setAuthData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir el contexto
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }
  return context;
};