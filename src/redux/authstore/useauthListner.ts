// src/hooks/useAuthListener.ts
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../components/firebase/firebase";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../store/authSlice";
import { doc, getDoc } from "firebase/firestore";
import type { AppDispatch } from "../store/store";

export const useAuthListener = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch Firestore user document
        const snap = await getDoc(doc(db, "Users", firebaseUser.uid));
        if (snap.exists()) {
          const data = snap.data();
          dispatch(
  setUser({
    uid: firebaseUser.uid,
    firstName: data.firstName || "",
    lastName: data.lastname || "",
    email: data.email || "",
    profilePhoto: data.profilePhoto || "",
    phone: data.phone || "",
    role: data.role || "",
    bio: data.bio || "",
  })
);

        }
      } else {
        dispatch(clearUser());  
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};
