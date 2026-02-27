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
// import EditRole from "../src/modals/addRole/AddRoleModal";
import EditRoleMain from "./pages/private/role/rolemodyul/editRole/EditRoleMain";
import ChatLayout from "./pages/private/chat/Layout/ChatLayout";
import { Spinner } from "flowbite-react";
import Errorpage from "./pages/public/404ErrorPage/Errorpage";
// import RoleProtectedRoute from "./routing/RoleProtectedRoute/RoleProtectedRoute";
import type { RootState } from "./redux/store/store";
import { useSelector } from "react-redux";
import RoleProtectedRoute from "./routing/RoleProtectedRoute/RoleProtectedRoute";
// import RoleModyul from "./pages/private/role/rolemodyul/RoleModyul";

const App = () => {
  useAuthListener();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const currentUserPermissions = useSelector(
    (state: RootState) => state.userPermissions.permissions,
  );
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner
          color="success"
          aria-label="Success spinner example"
          className="w-13 h-13"
        />
      </div>
    );
  }
  console.log(currentUserPermissions);
  return (
    <>
      <ToastContainer style={{ zIndex: 99999 }} />

      <Routes>
          {!user ? (
            <>
              <Route
                path="/login"
                element={!user ? <Loginmain /> : <Navigate to="/" replace />}
              />
              <Route
                path="/signup"
                element={!user ? <Signupmain /> : <Navigate to="/" />}
              />
              <Route path="/chat" element={<ChatLayout />} />
            
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
              <Route path="/chat" element={<ChatLayout />} />
            </>
          )}
            
          <Route path="*" element={<Errorpage />} />
        </Routes>
    
    </>
  );
};

export default App;
