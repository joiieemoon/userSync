import { useEffect, useState, useMemo } from "react";
import { db } from "../../services/firebase/firebase.ts";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import type { RootState } from "../../redux/store/store";
import { setLoading } from "../../redux/slice/uiSlice";
import { useDispatch, useSelector } from "react-redux";

const useUsers = () => {
  const [rawUsers, setRawUsers] = useState<any[]>([]);
  const [rolesMap, setRolesMap] = useState<Record<string, any>>({});
  const { loading } = useSelector((state: RootState) => state.ui.users);
  const dispatch = useDispatch();


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
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRawUsers(list);
        dispatch(setLoading(false));
      },
      (error) => {
        console.error("Error fetching users:", error);
        dispatch(setLoading(false));
      }
    );

    return () => unsubscribeUsers();
  }, [dispatch]);


  const users = useMemo(() => {
    return rawUsers.map((data) => {
      const createdAt =
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toLocaleDateString()
          : "-";

      const roleKey = data.role?.toLowerCase();
      const roleInfo = rolesMap[roleKey] || { roleName: "No Role", permissions: {} };

      return {
        uid: data.id,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        role: data.role || "",
        createdAt,
        roleName: roleInfo.roleName,
        permissions: roleInfo.permissions,
        profilePhoto: data.profilePhoto || "",
      };
    });
  }, [rawUsers, rolesMap]);

  return { users, loading };
};

export default useUsers;