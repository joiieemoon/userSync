import { useEffect, useState } from 'react';
import { db } from "../../components/firebase/firebase";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";

const useUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Users"),
      (snapshot) => {
        const list = snapshot.docs.map((doc) => {
          const data = doc.data();

          // Convert Firestore Timestamp to human-readable string
          const createdAt =
            data.createdAt && data.createdAt instanceof Timestamp
              ? data.createdAt.toDate().toLocaleDateString()
              : "-";

          return {
            uid: doc.id,
            ...data,
            createdAt,
          };
        });

        setUsers(list);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { users, loading };
};

export default useUsers;
