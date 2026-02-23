import React, { useEffect, useState } from "react";
import { MdDelete, MdAdd, MdEdit } from "react-icons/md";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../components/firebase/firebase";
// import AddRoleModal from "../../../../modals/addRoleModal/AddRoleModal";
import EditBtn from "../../../../components/button/editbutton/Editbtn";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
// import { RiUserSettingsLine } from "react-icons/ri";
import SearchBar from "../../../../components/SearchBar/SearchBar";
// import { MdEditSquare } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RoleModyul = () => {
  const [roles, setRoles] = useState<any[]>([]);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setsearchTerm] = useState("");

  const navigation = useNavigate();

  

  const fetchRoles = async () => {
    const querySnapshot = await getDocs(collection(db, "roles"));
    const roleList = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      roleName: docSnap.data().roleName || "",
      permissions: docSnap.data().permissions || {},

      createdAt: docSnap.data().createdAt
        ? docSnap.data().createdAt.toDate()
        : null,
    }));
    setRoles(roleList);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Delete 
  const removeRole = async (roleId: string) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      await deleteDoc(doc(db, "roles", roleId));
      fetchRoles();
    }
  };

  const filterRole = roles.filter((role) =>
    role.roleName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );


  const sortedRoles = [...filterRole].sort((a, b) => {
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

      <div className="mb-3 flex justify-between">
        <SearchBar
          value={searchTerm}
          onchange={(e) => setsearchTerm(e.target.value)}
        />
        <EditBtn
          label="Add Role"
          icon={<MdAdd className="text-xl" />}
          onClick={() => navigation("/role/edit")}
        />
      </div>

      {/* <AddRoleModal
        
        role={editingRole}
       
      /> */}

  
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
            <th className="p-3 text-left">Role Permission</th>

            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {sortedRoles.map((role, index) => (
            <tr key={role.id} className="border-b">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{role.roleName}</td>

              <td>
                {role.createdAt ? role.createdAt.toLocaleDateString() : "-"}
              </td>
              <td>
                {Object.values(role.permissions || {}).reduce(
                  (count: number, module: any) =>
                    count + Object.values(module).filter(Boolean).length,
                  0,
                )}
              </td>

              {/* Delete role */}

              <td className="p-2 flex px-2 cursor-pointer">
                <button onClick={() => navigation(`/role/edit/${role.id}`)}>
                  <CiEdit className="text-2xl cursor-pointer" />
                </button>
                <MdDeleteOutline
                  className="text-2xl ml-2"
                  onClick={() => removeRole(role.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <></>
    </div>
  );
};

export default RoleModyul;
