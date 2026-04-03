import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../../redux/store";
import Navbar from "../../../components/layout/navbar";
import { Sidebarmain } from "../../../components/layout/sidebar";
import dashboardBg from "../../../../public/dashboardbg.jpg";
import avatar from "../../../../public/avtar.png";
import useTitle from "../../../hooks/use-title";
import Spinnerring from "../../../components/common/spinner";

import { usersService } from "../../../services/rest-api-services/user-services";

// import withAdminAccess from "../../../components/hoc/with-admin";

import ApexChart from "../../../components/charts";
import WorkerApp from "../../../workers/worker-comp";
// import users from "../users";
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [user, setUser] = useState<any | null>(null);
  const worker = new Worker(
    new URL("../../../workers/example-worker", import.meta.url),
  );
  worker.postMessage(10);
worker.onmessage=function (event){
  console.log(event.data);
}
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await usersService.getUserById(2);
        setUser(userData);
      } catch (err) {
        console.error(err);
      } finally {
        // setLoading(false);
        // return userData;
        console.log("fail to load");
      }
    };

    fetchUser();
  }, []);

  console.log(user);
  useTitle("User Sync-Dashboard");

  if (!user) {
    return <Spinnerring />;
  }

  return (
    <>
      <div className="relative flex min-h-screen overflow-hidden !bg-white">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${dashboardBg})`,
            opacity: 0.15,
          }}
        />

        {/* Sidebar */}
        <Sidebarmain isOpen={isSidebarOpen} />
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Main */}

        {!user ? (
          <div className="flex items-center justify-center min-h-screen ">
            <Spinnerring aria-label="Loading profile" />
          </div>
        ) : (
          <div
            className={`relative flex-1 flex flex-col transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-0"
            }`}
          >
            <main className="flex flex-1 items-center justify-center p-6 pt-24">
              {/* Glass Card */}
              <div className="w-full bg-amber-300  max-w-4xl backdrop-blur-xl  border border-white/20 rounded-3xl shadow-2xl p-12 text-center ">
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <img
                    src={
                      user?.profilePhoto && user.profilePhoto !== ""
                        ? user.profilePhoto
                        : avatar
                    }
                    alt="profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-white/30 shadow-lg"
                  />
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-black mb-3">
                  Welcome, {user?.firstName || "User"}
                </h2>
                <p className="text-black/70 text-lg ">
                  ROLE: {user?.role || "No bio available"} id:{user?.id || ""}
                </p>
                <p className="text-black/70 text-lg mb-10">
                  Email: {user?.email || "N/A"}
                </p>
                <p className="text-black/70 text-lg mb-10">
                  Manage your profile, explore users, and control your dashboard
                  from here.
                </p>
                <WorkerApp />
              </div>
            </main>

            {/* <BarChart /> */}
            <div className="flex justify-center flex-wrap gap-6 p-6">
              <ApexChart />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// export default withAdminAccess(Dashboard);
export default Dashboard;
