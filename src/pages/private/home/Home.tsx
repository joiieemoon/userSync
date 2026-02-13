import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { Sidebarmain } from "../../../components/sidebar/Sidebar";
import { auth, db } from "../../../components/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        }
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try{
      await auth.signOut();
       navigate("/login");
    }
    catch(error){
      console.log(error);
    }
    
  }

  return (
    <div className="flex">
      <Sidebarmain isOpen={isSidebarOpen} />

      <div className="flex-1 min-h-screen bg-gray-100 dark:bg-gray-200">
        <Navbar toggleSidebar={toggleSidebar} user={userDetails} />

        {userDetails ? (
          <main className="p-4">
            <h1 className="text-2xl p-6 font-bold text-center mt-7">
              Dashboard
            </h1>
            <h1 className="text-3xl">Welcome {userDetails.firstName}</h1>
            <h1 className="text-3xl">lastname {userDetails.lastname}</h1>
            <h1 className="text-3xl">Email: {userDetails.email}</h1>
            <h1 className="text-3xl">Password: {userDetails.password}</h1>
            <button className="bg-cyan-400" onClick={handleLogout}>logout</button>
          </main>
        ) : (
          <h1 className="text-center mt-7 p-7 text-5xl">Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
