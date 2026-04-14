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
  () => import("./components/feature/role-management/edit-role"),
);
const ChatLayout = lazy(() => import("./pages/private/chat/layout/index.tsx"));
const Errorpage = lazy(() => import("./pages/public/404ErrorPage/index.tsx"));
import * as Sentry from "@sentry/react";
import type { User } from "firebase/auth";
import Spinnerring from "./components/common/spinner";
import { connectSocket } from "./services/socket/index.ts";

Sentry.init({
  dsn: "https://d5b76cdbde50d6cd3eb140e55d705627@o4511212434948096.ingest.us.sentry.io/4511212435800064",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true, 
  integrations: [
    // send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],  
  // Enable logs to be sent to Sentry
  enableLogs: true,

});


const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' })
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);
useEffect(() => {
    const initSocket = async () => {
        if (user) {
            const token = await user.getIdToken(); 
            connectSocket(token);
            console.log(" Socket initialized with token");
        }
    };

    initSocket();
}, [user]);
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
          