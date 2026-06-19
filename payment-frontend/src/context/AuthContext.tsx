import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Read from localStorage so page refresh keeps user logged in
  const [user, setUser] = useState<string | null>(localStorage.getItem("username") || null);
  const navigate = useNavigate();

  const register = async (username: string, password: string): Promise<void> => {
    const res = await api.post("/auth/register", { username, password });
    // Note: the backend register usually returns a success message string, not a token object
    // but we will keep this if the backend returns a token on register
    // Wait, the backend code for register: return ResponseEntity.ok("Registered successfully");
    // So there is no res.data.token on register! The user must login after registering.
    // The previous code had this bug. I will fix it by removing the token set.
    navigate("/login");
  };

  const login = async (username: string, password: string): Promise<void> => {
    const res = await api.post("/auth/login", { username, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);
    setUser(res.data.username);
    navigate("/cart");
  };

  const logout = (): void => {
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
