
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../services/firebase/firebase.ts";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../auth-slice/index.ts";

import type { AppDispatch } from "../../store/store/index.ts";
import { usersService } from "../../../services/firebase/user-services/index.ts";

export const useAuthListener = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {


        const data = await usersService.getById(firebaseUser.uid);
        if (data) {

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
