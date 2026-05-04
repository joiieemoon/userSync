import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { useAuth } from "./features/auth/hooks/useAuth";

// layouts
const AppLayout = lazy(() => import("./layout/index.tsx"));
const AuthLayout = lazy(() => import("./layout/index.tsx"));
// pages
const Home = lazy(() => import("./features/dashboard"));
const UserProfiles = lazy(() => import("./features/profile"));
const NotFound = lazy(() => import("./layout/index.tsx"));
const UserTables = lazy(() => import("./features/user"));
const RoleTables = lazy(() => import("./features/roles"));
const SignUpForm = lazy(() => import("./features/auth/components/signup-form"));
const SignInForm = lazy(() => import("./features/auth/components/login-form"));

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

const PublicCheck = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthCheck>
        <AppLayout />
      </AuthCheck>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <UserProfiles /> },
      { path: "users", element: <UserTables /> },
      { path: "roles", element: <RoleTables /> },
    ],
  },
  {
    path: "/",
    element: (
      <PublicCheck>
        <AuthLayout />
      </PublicCheck>
    ),
    children: [
      { path: "signin", element: <SignInForm /> },
      { path: "signup", element: <SignUpForm /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
