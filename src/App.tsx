import React, { useState, useEffect } from "react";
import Home from "./pages/private/home/Home";
import { Login as Loginmain } from "./pages/public/login/Login";
import { Signup as Signupmain } from "./pages/public/signup/Signup";
import { Route, Routes, Navigate } from "react-router-dom";
// import { auth } from '../../../components/firebase/firebase';
// import { auth } from "../../../components/firebase/firebase";
import { auth } from "../src/components/firebase/firebase";
import { useAuthListener } from "./redux/authstore/useauthListner";
import Profile from "./pages/private/profile/Profile";
import { ToastContainer } from "react-toastify";
import Users from "./pages/private/allUsers/Users";
import Dashboard from "./pages/private/dashboard/Dashboard";
import Role from "./pages/private/role/Role";
import EditRole from "../src/modals/addRole/AddRoleModal";
import EditRoleMain from "./pages/private/role/rolemodyul/editRole/EditRoleMain";

const App = () => {
  useAuthListener();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <ToastContainer style={{ zIndex: 99999 }} />

      <Routes>
        {!user ? (
          <>
            <Route
              path="/login"
              element={!user ? <Loginmain /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signupmain /> : <Navigate to="/" />}
            />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/role" element={<Role />} />
            <Route path="/role/edit" element={<EditRoleMain />} />
            <Route path="/role/edit/:id" element={<EditRoleMain />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
