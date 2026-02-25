import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { canPermit } from "../../../../helper/canPermit/canpermit";

import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  where,
  query,
  onSnapshot,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../../components/firebase/firebase";
import useUsers from "../../../../hooks/useUser/useUsers";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import EditBtn from "../../../../components/button/editbutton/Editbtn";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react/components/Spinner";
const RoleModyul = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
const [loading, setLoading] = useState(true);
  const navigation = useNavigate();
  
  const currentUserPermissions = useSelector(
    (state: RootState) => state.userPermissions.permissions,
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "roles"), (snapshot) => {
      const roleList = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          roleName: data.roleName || "",
          permissions: data.permissions || {},
          createdAt:
            data.createdAt instanceof Timestamp
              ? data.createdAt.toDate()
              : null,
        };
      });
      setRoles(roleList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  if (loading)
    return (
      <div className="p-6 flex justify-center items-center h-screen">
        Loading...
        <Spinner color="success" aria-label="Success spinner example" />
      </div>
    );
  const removeRole = async (roleId: string, roleName: string) => {
    try {
      const q = query(collection(db, "Users"), where("role", "==", roleName));
      const snapshot = await getDocs(q);

      snapshot.forEach(async (userDoc) => {
        await updateDoc(userDoc.ref, { role: "No Role" });
      });

      await deleteDoc(doc(db, "roles", roleId));

      toast.success(
        `Role '${roleName}' deleted and users updated to 'No Role'.`,
      );
    } catch (error: any) {
      console.error(error);
      toast.error("Error deleting role: " + error.message);
    }
  };

  const filteredRoles = roles.filter((role) =>
    role.roleName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedRoles = [...filteredRoles].sort((a, b) => {
    const roleA = a.roleName.toLowerCase();
    const roleB = b.roleName.toLowerCase();
    return sortOrder === "asc"
      ? roleA.localeCompare(roleB)
      : roleB.localeCompare(roleA);
  });

  const toggleSortOrder = () =>
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

  return (
    <div className="p-6 mt-10 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-semibold mb-4">Roles</h2>

      <div className="mb-3 flex justify-between items-center">
        <SearchBar
          value={searchTerm}
          onchange={(e) => setSearchTerm(e.target.value)}
        />
        {canPermit(currentUserPermissions, "role", "canAdd") && (
          <EditBtn
            label="Add Role"
            icon={<MdAdd className="text-xl" />}
            onClick={() => navigation("/role/edit")}
          />
        )}
      </div>

      <table className="w-full bg-white rounded-xl shadow-2xl">
        <thead className="bg-amber-300">
          <tr>
            <th className="p-3 text-left">#</th>
            <th
              className="p-3 text-left cursor-pointer flex"
              onClick={toggleSortOrder}
            >
              Role Name
              {sortOrder === "asc" ? (
                <FaSortAlphaDown className="text-xl text-gray-700 ml-1" />
              ) : (
                <FaSortAlphaDownAlt className="text-xl ml-1 text-gray-700" />
              )}
            </th>
            <th className="p-3 text-left">Created At</th>
            <th className="p-3 text-left">Role Permissions</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {sortedRoles.map((role, index) => (
            <tr key={role.id} className="border-b">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{role.roleName}</td>
              <td className="p-2">
                {role.createdAt ? role.createdAt.toLocaleDateString() : "-"}
              </td>
              <td className="p-2">
                {Object.values(role.permissions || {}).reduce(
                  (count: number, module: any) =>
                    count + Object.values(module).filter(Boolean).length,
                  0,
                )}
              </td>
              <td className="p-2 flex gap-2">
                {canPermit(currentUserPermissions, "role", "canEdit") && (
                  <button onClick={() => navigation(`/role/edit/${role.id}`)}>
                    <CiEdit className="text-2xl cursor-pointer" />
                  </button>
                )}
                {canPermit(currentUserPermissions, "role", "canDelete") && (
                  <button onClick={() => removeRole(role.id, role.roleName)}>
                    <MdDeleteOutline className="text-2xl cursor-pointer" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleModyul;
