import { createContext, useEffect, useState } from "react";
import type {
  AuthContextType,
  LoginResponse,
  SignupResponse,
} from "../../features/auth/types";

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");

    setToken(t ?? null);
    setUser(u ? JSON.parse(u) : null);
  }, []);

  const login = ({ token, user }: LoginResponse) => {
    setToken(token ?? null);
    setUser(user);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  const signUp = ({ token, user }: SignupResponse) => {
    setToken(token);
    setUser(user);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const updateUser = (updatedUser: any) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        signUp,
        updateUser,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
