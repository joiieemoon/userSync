import React, { useState, useEffect, lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./services/firebase/firebase.ts";
const Loginmain = lazy(() =>
  import("./pages/public/login/index.tsx").then((module) => ({
    default: module.Login,
  })),
);

const Signupmain = lazy(() =>
  import("./pages/public/signup/index.tsx").then((module) => ({
    default: module.Signup,
  })),
);
const Home = lazy(() => import("./pages/private/home/index.tsx"));
const Profile = lazy(() => import("./pages/private/profile/index.tsx"));
const Users = lazy(() => import("./pages/private/users/index.tsx"));

const Role = lazy(() => import("./pages/private/role/layout/index.tsx"));
const EditRoleMain = lazy(
  () => import("./pages/private/role/role-modyul/edit-role/index.tsx"),
);
const ChatLayout = lazy(() => import("./pages/private/chat/layout/index.tsx"));
const Errorpage = lazy(() => import("./pages/public/404ErrorPage/index.tsx"));

import type { User } from "firebase/auth";
import Spinnerring from "./components/spinner/index.tsx";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  if (!authReady) {
    return <Spinnerring />;
  }

  return (
    <>
      <ToastContainer style={{ zIndex: 99999 }} />
      <Suspense fallback={<Spinnerring />}>
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<Loginmain />} />
              <Route path="/signup" element={<Signupmain />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/users" element={<Users />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/role" element={<Role />} />
              <Route path="/role/add" element={<EditRoleMain />} />
              <Route path="/role/edit/:id" element={<EditRoleMain />} />
              <Route path="/chat" element={<ChatLayout />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/signup" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Errorpage />} />
            </>
          )}
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
