import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../components/firebase/firebase";
import { usersData } from "./userdata";

export const seedAuthUsers = async () => {
  for (const user of usersData) {
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      await setDoc(doc(db, "users", cred.user.uid), {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        bio: user.bio || "",
        profilePhoto: "",
        createdAt: Timestamp.fromDate(new Date(user.createdAt))
      });

      console.log("Created:", user.email);
    } catch (e) {
      console.log("Skip:", user.email, e.code);
    }
  }
};
