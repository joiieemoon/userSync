import { createContext, useEffect, useState } from "react";
import type {
  AuthContextType,
  LoginResponse,
  SignupResponse,
} from "../../features/auth/types";
import { User } from "../../features/user/types";

import type { AuthProviderProps } from "../../components/common/types";
import * as Sentry from "@sentry/react";
export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");

    setToken(t ?? null);
    setUser(u ? JSON.parse(u) : null);
  }, []);

  const login = ({ token, user }: LoginResponse) => {
    setToken(token ?? null);
    setUser(user);
    Sentry.setUser({
      id: user.id,
      email: user.email,
    });
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    Sentry.setUser(null);
    localStorage.removeItem("persist:root");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  const signUp = ({ token, user }: SignupResponse) => {
    setToken(token);
    setUser(user);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const updateUser = (updatedUser: User) => {
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
