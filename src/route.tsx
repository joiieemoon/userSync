import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const AppLayout = lazy(() => import("./layout/AppLayout"));

const AuthLayout = lazy(() => import("./features/auth/AuthPageLayout"));

const Home = lazy(() => import("./pages/Dashboard/Home"));
const UserProfiles = lazy(() => import("./pages/UserProfiles"));
const Blank = lazy(() => import("./pages/Blank"));
const FormElements = lazy(() => import("./pages/Forms/FormElements"));
const BasicTables = lazy(() => import("./pages/Tables/BasicTables"));

const NotFound = lazy(() => import("./pages/OtherPage/NotFound"));

const SignUpForm = lazy(() => import("./features/auth/components/signup-form"));
const SignInForm = lazy(() => import("./features/auth/components/login-form"));
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <UserProfiles /> },
      { path: "blank", element: <Blank /> },
      { path: "form-elements", element: <FormElements /> },
      { path: "basic-tables", element: <BasicTables /> },
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
