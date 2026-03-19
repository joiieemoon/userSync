import useUsers from "../../../../hooks/use-user/useUsers.ts";
import { MdAdd } from "react-icons/md";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";

import { useState, useEffect } from "react";
import { auth } from "../../../../services/firebase/firebase.ts";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import EditBtn from "../../../../components/button/editbutton/Editbtn";
import { PaginationMain } from "../../../../components/pagination/Pagination";
import { canPermit } from "../../../../helper/canPermit/canpermit";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import Spinnerring from "../../../../components/spinner/Spinnerring.tsx";
import UserModal from "../../../../modals/add-edit-usermodal/index.tsx";
import DeleteItemModal from "../../../../components/comman-modal/comman-delete-modal/index.tsx";
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

  if (loading) return <Spinnerring />;

  const currentUid = auth.currentUser?.uid;
  const currentUser = users.find((u) => u.uid === currentUid);
  const currentUserPermissions = currentUser?.permissions || {};

  const isAdmin = currentUser?.role === "admin";

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
    <div className="p-6  mt-10 rounded-2xl shadow-2xl">
      <h2 className="text-3xl mt-2 font-semibold mb-2 ">All Users</h2>
      {/* Search + Add User */}
      <div className="flex mt-5 justify-between items-center mb-3">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          name="searchUser"
        />
        {canPermit(currentUserPermissions, "user", "canAdd") && (
          <EditBtn
            label="Add User"
            icon={<MdAdd className="text-xl" />}
            onClick={() => setIsAddUserOpen(true)}
          />
        )}
      </div>
      {/* Users Table */}
      <table className="w-full bg-white rounded-xl shadow-2xl">
        <thead className=" bg-amber-300 rounded-2xl">
          <tr className=" bg-amber-300 rounded-2xl">
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
          {currentUsers.length > 0 ? (
            currentUsers.map((u) => (
              <tr key={u.uid} className="border-t">
                <td className="p-2">{u.firstName}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.phone || "-"}</td>
                <td className="p-2">{u.role || "-"}</td>
                <td className="p-2">{u.createdAt}</td>
                {(canPermit(currentUserPermissions, "user", "canEdit") ||
                  canPermit(currentUserPermissions, "user", "canDelete")) && (
                  <td className="p-2 flex gap-2">
                    {canPermit(currentUserPermissions, "user", "canEdit") && (
                      <div
                        onClick={() => setUserToEdit(u)}
                        className="cursor-pointer"
                      >
                        <MdOutlineEdit className="text-black text-2xl" />
                      </div>
                    )}

                    {canPermit(currentUserPermissions, "user", "canDelete") && (
                      <div
                        onClick={() => setUserToDelete(u)}
                        className="cursor-pointer"
                      >
                        <MdDeleteOutline className="text-black text-2xl " />
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={
                  canPermit(currentUserPermissions, "user", "canEdit") ||
                  canPermit(currentUserPermissions, "user", "canDelete")
                    ? 6
                    : 5
                }
                className="text-center p-6 text-gray-500 font-medium"
              >
                No users found.
              </td>
            </tr>
          )}
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
      <DeleteItemModal
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        collectionName="Users"
        item={userToDelete ? { id: userToDelete.uid } : null}
      />

      <UserModal
        isOpen={isAddUserOpen || !!userToEdit}
        onClose={() => {
          setIsAddUserOpen(false);
          setUserToEdit(null);
        }}
        user={userToEdit}
      />
    </div>
  );
}
