import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../components/firebase/firebase";
import { usersData } from "./userdata";

export const seedUsers = async () => {
  try {
    const usersRef = collection(db, "Users");

    for (const user of usersData) {
      await addDoc(usersRef, {
        ...user,
        createdAt: Timestamp.fromDate(new Date(user.createdAt))
      });
    }

    console.log("Users added successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};
