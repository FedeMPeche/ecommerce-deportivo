import axios from "axios";

const API_URL = "http://localhost:3001/api/auth"; // backend en local

export const registerUser = async (name: string, email: string, password: string) => {
  const res = await axios.post(`${API_URL}/register`, { name, email, password });
  return res.data; // { message, token?, user? }
};

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  if (res.data.token) {
    saveToken(res.data.token);
  }
  return res.data; // { token, user? }
};

// === utils para token ===
export function saveToken(token: string) {
  localStorage.setItem("token", token);
  try {
    const payload = parseJwt(token);
    if (payload) {
      localStorage.setItem("user", JSON.stringify(payload));
    }
  } catch {
    // token inválido
  }
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const isAuthenticated = () => {
  return !!getToken();
};


function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

