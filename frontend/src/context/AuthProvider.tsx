import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";

type User = {
  id: number;
  nombre: string;
  email: string;
  rol: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  // dos nombres disponibles por compatibilidad (setAuthData se usó antes en tu proyecto)
  login: (userData: User, token: string) => void;
  setAuthData: (token: string, user?: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const login = (userData: User, tokenValue: string) => {
    setUser(userData);
    setToken(tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenValue);
  };

  // alias por compatibilidad con el código que usaba setAuthData
  const setAuthData = (tokenValue: string, userData?: User) => {
    if (userData) {
      login(userData, tokenValue);
    } else {
      setToken(tokenValue);
      localStorage.setItem("token", tokenValue);
      // si sólo viene token, intentamos decodificar user del token (opcional)
      try {
        const payload = JSON.parse(atob(tokenValue.split(".")[1]));
        if (payload) {
          const decodedUser: Partial<User> = {
            id: payload.id,
            nombre: payload.nombre || payload.name || "",
            email: payload.email,
            rol: payload.rol || payload.role || "user",
          };
          // si tenemos al menos email/id, guardamos user mínimo
          if (decodedUser.email || decodedUser.id) {
            const fullUser: User = {
              id: Number(decodedUser.id || 0),
              nombre: decodedUser.nombre || "",
              email: decodedUser.email || "",
              rol: (decodedUser.rol as string) || "user",
            };
            setUser(fullUser);
            localStorage.setItem("user", JSON.stringify(fullUser));
          }
        }
      } catch {
        // no se pudo decodificar, ok
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

  const value = useMemo(
    () => ({ user, token, login, setAuthData, logout, isAuthenticated }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para usar desde componentes
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
