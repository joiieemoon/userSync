import React, { useState, useEffect, lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./components/firebase/firebase.ts";
const Loginmain = lazy(() =>
  import("./pages/public/login/Login").then((module) => ({
    default: module.Login,
  })),
);

const Signupmain = lazy(() =>
  import("./pages/public/signup/Signup").then((module) => ({
    default: module.Signup,
  })),
);
const Home = lazy(() => import("./pages/private/home/Home"));
const Profile = lazy(() => import("./pages/private/profile/Profile"));
const Users = lazy(() => import("./pages/private/allUsers/Users"));

const Role = lazy(() => import("./pages/private/role/Role"));
const EditRoleMain = lazy(
  () => import("./pages/private/role/rolemodyul/editRole/EditRoleMain"),
);
const ChatLayout = lazy(() => import("./pages/private/chat/Layout/ChatLayout"));
const Errorpage = lazy(() => import("./pages/public/404ErrorPage/Errorpage"));

import type { User } from "firebase/auth";
import Spinnerring from "./components/spinner/Spinnerring.tsx";

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
              <Route path="/role/edit" element={<EditRoleMain />} />
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
