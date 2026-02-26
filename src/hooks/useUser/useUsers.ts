import { useEffect, useState } from "react";
import { db } from "../../components/firebase/firebase";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";

const useUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [rolesMap, setRolesMap] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  //
  useEffect(() => {
    const unsubscribeRoles = onSnapshot(collection(db, "roles"), (snapshot) => {
      const map: Record<string, any> = {};

      snapshot.forEach((doc) => {
        const data = doc.data();

        map[data.roleName?.toLowerCase()] = {
          roleName: data.roleName,
          permissions: data.permissions || {},
        };
      });

      setRolesMap(map);
    });

    return () => unsubscribeRoles();
  }, []);

  
  useEffect(() => {
    const unsubscribeUsers = onSnapshot(
      collection(db, "Users"),
      (snapshot) => {
        const list = snapshot.docs.map((doc) => {
          const data = doc.data();

          const createdAt =
            data.createdAt instanceof Timestamp
              ? data.createdAt.toDate().toLocaleDateString()
              : "-";

          //  Match role === roleName
          const roleKey = data.role?.toLowerCase();

          const roleInfo = rolesMap[roleKey] || {
            roleName: "No Role",
            permissions: {},
          };

          return {
            uid: doc.id,
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            phone: data.phone || "",
            role: data.role || "",
            createdAt,
            roleName: roleInfo.roleName,
            permissions: roleInfo.permissions, 
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

    return () => unsubscribeUsers();
  }, [rolesMap]);

  return { users, loading };
};

export default useUsers;
