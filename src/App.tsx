import React, { useState, useEffect } from 'react';
import Home from './pages/private/home/Home';
import { Login as Loginmain } from './pages/public/login/Login';
import { Signup as Signupmain } from './pages/public/signup/Signup';
import { Route, Routes, Navigate } from 'react-router-dom';
// import { auth } from '../../../components/firebase/firebase';
// import { auth } from "../../../components/firebase/firebase";
import { auth } from "../src/components/firebase/firebase"

const App = () => {
  const [user, setUser] = useState(null); 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); 
    });
    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <Routes>
      <Route path='/login' element={!user ? <Loginmain /> : <Navigate to='/' />} />
      <Route path='/signup' element={!user ? <Signupmain /> : <Navigate to='/' />} />
      <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
    </Routes>
  );
};

export default App;
