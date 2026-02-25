import useUsers from "../../../../hooks/useUser/useUsers";
import { MdAdd } from "react-icons/md";
import { FaRegEdit, FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useState, useEffect } from "react";
import { auth } from "../../../../components/firebase/firebase";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import EditBtn from "../../../../components/button/editbutton/Editbtn";
import AddNewuserModal from "../../../../modals/addNewuserModal/AddNewuserModal";
import DeleteUser from "../../../../modals/deleteUser/DeleteUser";
import EditUser from "../../../../modals/edituserModal/EditUser";
import { PaginationMain } from "../../../../components/pagination/Pagination";
import { canPermit } from "../../../../helper/canPermit/canpermit";
import { Spinner } from "flowbite-react/components/Spinner";

export default function UsersDetails() {
  const { users, loading } = useUsers();
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  if (loading)
    return (
      <div className="p-6 flex justify-center items-center">
        Loading...
        <Spinner color="success" aria-label="Success spinner example" />
      </div>
    );

  const currentUid = auth.currentUser?.uid;
  const currentUser = users.find((u) => u.uid === currentUid);
  const currentUserPermissions = currentUser?.permissions || {};
  // console.log("Current user permissions:", currentUserPermissions);
  // console.log("Current user object:", currentUser);
  // console.log("Current user permissions:", currentUser?.permissions);
  const isAdmin = currentUser?.role === "admin";

  // Filter users (exclude current user and search)
  const filteredUsers = users
    .filter((u) => u.uid !== currentUid)
    .filter((u) =>
      [u.firstName, u.email, u.phone, u.role]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );

  // Sort users by firstName
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const nameA = a.firstName.toLowerCase();
    const nameB = b.firstName.toLowerCase();
    return sortOrder === "asc"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="p-6 mt-10 rounded-2xl shadow-2xl">
      <h2 className="text-3xl mt-2 font-semibold mb-2 dark:text-white">
        All Users
      </h2>

      {/* Search + Add User */}
      <div className="flex mt-5 justify-between items-center mb-3">
        <SearchBar
          value={searchTerm}
          onchange={(e) => setSearchTerm(e.target.value)}
        />

        {canPermit(currentUserPermissions, "user", "canAdd") && (
          <EditBtn
            label="Add User"
            icon={<MdAdd className="text-xl" />}
            onClick={() => setIsAddUserOpen(true)}
          />
        )}

        <AddNewuserModal
          isOpen={isAddUserOpen}
          onClose={() => setIsAddUserOpen(false)}
        />
      </div>

      {/* Users Table */}
      <table className="w-full bg-white rounded-xl shadow-2xl">
        <thead className=" bg-amber-300  border">
          <tr className="border bg-amber-300">
            <th
              className="p-3 text-left flex cursor-pointer items-center"
              onClick={toggleSortOrder}
            >
              First Name
              {sortOrder === "asc" ? (
                <FaSortAlphaDown className="text-xl text-gray-700 ml-1" />
              ) : (
                <FaSortAlphaDownAlt className="text-xl ml-1 text-gray-700" />
              )}
            </th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left bg-amber-300 ">Created At</th>
            {(canPermit(currentUserPermissions, "user", "canEdit") ||
              canPermit(currentUserPermissions, "user", "canDelete")) && (
              <th className="p-3 text-left">Action</th>
            )}
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((u) => (
            <tr key={u.uid} className="border-t">
              <td className="p-2">{u.firstName}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.phone || "-"}</td>
              <td className="p-2">{u.role || "-"}</td>
              <td className="p-2">{u.createdAt}</td>

              <td className="p-2 flex gap-2">
                {canPermit(currentUserPermissions, "user", "canEdit") && (
                  <button onClick={() => setUserToEdit(u)}>
                    <FaRegEdit className="text-amber-300 text-2xl" />
                  </button>
                )}

                {canPermit(currentUserPermissions, "user", "canDelete") && (
                  <button onClick={() => setUserToDelete(u)}>
                    <AiOutlineUserDelete className="text-red-400 text-2xl" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationMain
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(Number(page))}
        />
      )}

      {/* Modals */}
      <DeleteUser
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        user={userToDelete}
      />
      <EditUser
        isOpen={!!userToEdit}
        onClose={() => setUserToEdit(null)}
        user={userToEdit}
      />
    </div>
  );
}
