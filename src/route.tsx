import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const AppLayout = lazy(() => import("./layout/applayout/index.tsx"));

const AuthLayout = lazy(() => import("./features/auth/index.tsx"));

const Home = lazy(() => import("./features/dashboard"));
const UserProfiles = lazy(() => import("./features/profile"));

const NotFound = lazy(() => import("./pages/OtherPage/NotFound"));
import UserTables from "./features/user";
import RoleTables from "./features/roles";
import ProtectedRoute from "./routes/protected-rotes";
const SignUpForm = lazy(() => import("./features/auth/components/signup-form"));
const SignInForm = lazy(() => import("./features/auth/components/login-form"));
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        // element: <ProtectedRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: "profile", element: <UserProfiles /> },

          { path: "user-tables", element: <UserTables /> },
          { path: "role-tables", element: <RoleTables /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
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
