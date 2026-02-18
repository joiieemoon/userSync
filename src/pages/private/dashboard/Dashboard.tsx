import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store/store";

import Navbar from "../navbar/Navbar";
import  {seedAuthUsers } from "../../../services/seed/seeduser";
import { Sidebarmain } from "../../../components/sidebar/Sidebar";
import dashboardBg from "../../../../public/dashboardbg.jpg";
import avatar from "../../../../public/avtar.png";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative flex min-h-screen overflow-hidden">

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

      {/* Main */}
      <div
        className={`relative flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"
          }`}
      >
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex flex-1 items-center justify-center p-6 pt-24">

          {/* Glass Card */}
          <div className="w-full bg-amber-300  max-w-4xl backdrop-blur-xl  border border-white/20 rounded-3xl shadow-2xl p-12 text-center ">

            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <img
                // src={avatar}
                src={user?.profilePhoto}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white/30 shadow-lg"
              />
            </div>

            {/* Welcome */}
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-3">
              Welcome, {user?.firstName || "User"}
            </h2>

            <p className="text-black/70 text-lg mb-10">
              Manage your profile, explore users, and control your dashboard
              from here.
            </p>

              {/* large datasetpush */}
            {/* upload json data into firestorge  */} 
            {/* <button
              onClick={seedAuthUsers}
              style={{ padding: 10, background: "black", color: "white" }}
            >
              Seed Users
            </button> */}
            
            {/* <div className="flex justify-center">
              <div className="bg-cyan-900  text-white rounded-2xl px-10 py-6 shadow-lg">
                <p className="text-sm opacity-80">User Fields</p>
                <p className="text-3xl font-bold mt-2">
                  {user ? Object.keys(user).length : 0}
                </p>
              </div>
            </div> */}

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
