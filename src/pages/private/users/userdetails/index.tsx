"use client";

import useUsers from "../../../../hooks/use-user";
import { MdAdd } from "react-icons/md";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { useState, useMemo } from "react";
import { auth } from "../../../../services/firebase/firebase.ts";
import SearchBar from "../../../../components/common/search-bar/index.tsx";
import EditBtn from "../../../../components/common/button/edit-button/index.tsx";
import { PaginationMain } from "../../../../components/common/pagination/index.tsx";
import { canPermit } from "../../../../helper/canPermit";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import Spinnerring from "../../../../components/common/spinner/index.tsx";
import UserModal from "../../../../modals/add-edit-user-modal";
import DeleteItemModal from "../../../../components/common/common-delete-modal";
import { usePagination } from "../../../../hooks/use-pagination";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store/store";
import {
  setUserSearch,
  setSortOrder,
} from "../../../../redux/slice/uiSlice.ts";
export default function UsersDetails() {
  const { users, loading } = useUsers();

  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [userToEdit, setUserToEdit] = useState<any>(null);

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const dispatch = useDispatch();

  const { searchTerm, sortOrder } = useSelector(
    (state: RootState) => state.ui.users,
  );
  const currentUid = auth.currentUser?.uid;

  const currentUser = useMemo(
    () => users.find((u) => u.uid === currentUid),
    [users, currentUid],
  );

  const currentUserPermissions = currentUser?.permissions || {};

  const baseUsers = useMemo(
    () => users.filter((u) => u.uid !== currentUid),
    [users, currentUid],
  );

  const {
    currentData: currentUsers,
    currentPage,
    totalPages,
    goToPage,
  } = usePagination({
    data: baseUsers,
    itemsPerPage: 10,
    searchTerm,
    sortField: "firstName",
    sortOrder,
    filterFields: ["firstName", "email", "phone", "role"],
  });

  const toggleSortOrder = () => {
    dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"));
  };
  if (loading) return <Spinnerring />;
  return (
    <div className="p-6 mt-10 rounded-2xl shadow-2xl">
      <h2 className="text-3xl mt-2 font-semibold mb-2">All Users</h2>

      <div className="flex mt-5 justify-between items-center mb-3">
        <SearchBar
          value={searchTerm}
          onChange={(e) => dispatch(setUserSearch(e.target.value))}
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

      <table className="w-full bg-white rounded-xl shadow-2xl">
        <thead className="bg-amber-300">
          <tr>
            {" "}
            <th className="p-3 text-left">#</th>
            <th
              className="p-3 text-left flex cursor-pointer items-center"
              onClick={toggleSortOrder}
            >
              First Name
              {sortOrder === "asc" ? (
                <FaSortAlphaDown className="ml-1" />
              ) : (
                <FaSortAlphaDownAlt className="ml-1" />
              )}
            </th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Created At</th>
            {(canPermit(currentUserPermissions, "user", "canEdit") ||
              canPermit(currentUserPermissions, "user", "canDelete")) && (
              <th className="p-3 text-left">Action</th>
            )}
          </tr>
        </thead>

        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((u, index) => (
              <tr key={u.uid} className="border-t">
                <td className="p-2">{(currentPage - 1) * 5 + index + 1}</td>
                <td className="p-2">{u.firstName}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.phone || "-"}</td>
                <td className="p-2">{u.role || "-"}</td>
                <td className="p-2">{u.createdAt}</td>

                {(canPermit(currentUserPermissions, "user", "canEdit") ||
                  canPermit(currentUserPermissions, "user", "canDelete")) && (
                  <td className="p-2 flex gap-2">
                    {canPermit(currentUserPermissions, "user", "canEdit") && (
                      <MdOutlineEdit
                        className="cursor-pointer text-2xl"
                        onClick={() => setUserToEdit(u)}
                      />
                    )}

                    {canPermit(currentUserPermissions, "user", "canDelete") && (
                      <MdDeleteOutline
                        className="cursor-pointer text-2xl"
                        onClick={() => setUserToDelete(u)}
                      />
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-6 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <PaginationMain
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
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
