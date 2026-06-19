import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Read from localStorage so page refresh keeps user logged in
  const [user, setUser] = useState(localStorage.getItem("username") || null);
  const navigate = useNavigate();

  const register = async (username, password) => {
    const res = await api.post("/auth/register", { username, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);
    setUser(res.data.username);
    navigate("/login");
  };

  const login = async (username, password) => {
    const res = await api.post("/auth/login", { username, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);
    setUser(res.data.username);
    navigate("/cart");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
