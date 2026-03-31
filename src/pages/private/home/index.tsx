import React, { useEffect, useState } from "react";
import Navbar from "../../../components/layout/navbar/index.tsx";
import { Sidebarmain } from "../../../components/layout/sidebar/index.tsx";
import { auth } from "../../../services/firebase/firebase.ts";
import { useNavigate } from "react-router-dom";
import Dashboard from "../dashboard/index.tsx";
import Spinnerring from "../../../components/common/spinner/index.tsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../redux/slice/ui-slice";

import { usersService } from "../../../services/rest-api-services/user-services/index.ts";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState(null);
  const isSidebarOpen = useSelector((state: any) => state.ui.users.sidebarOpen);

  const handleToggleSidebar = () => dispatch(toggleSidebar());
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await usersService.getById("36");
        console.log("user data", userData);
        setUserDetails(userData);
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex">
      <Sidebarmain isOpen={isSidebarOpen} className="!bg-white" />

      <div className="flex-1 min-h-screen bg-gray-100 dark:bg-gray-200">
        <Navbar toggleSidebar={handleToggleSidebar} user={userDetails} />
        <Dashboard />
        {userDetails ? (
          <Dashboard />
        ) : (
          <div className="">
            {/* <h1 className="text-center h-screen mt-7 p-7 flex justify-center items-center border  text-5xl">
              <Spinnerring />
            </h1> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
