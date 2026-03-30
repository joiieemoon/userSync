"use client";

import useUsers from "../../../../hooks/use-user";
import { MdAdd } from "react-icons/md";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { useState, useMemo } from "react";
import { auth } from "../../../../services/firebase/firebase.ts";
import SearchBar from "../../../../components/common/search-bar/index.tsx";
import Commanbutton from "../../../../components/common/button";
import { PaginationMain } from "../../../../components/common/pagination/index.tsx";
import { canPermit } from "../../../../services/can-permission/index.ts";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import Spinnerring from "../../../../components/common/spinner/index.tsx";
import UserModal from "../../../../modals/add-edit-user-modal";
import DeleteItemModal from "../../../../components/common/common-delete-modal";
import { usePagination } from "../../../../hooks/use-pagination";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store/index.ts";
import { setSortOrder, setShowModal } from "../../../../redux/slice/ui-slice";
export default function UsersDetails() {
  const { users } = useUsers();

  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [userToEdit, setUserToEdit] = useState<any>(null);

  const [searchTerm, setsearchTerm] = useState();
  const dispatch = useDispatch();
  const { sortOrder, showModal } = useSelector(
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
  // if (loading) return <Spinnerring />;
  return (
    <div className="p-6 mt-10 rounded-2xl shadow-2xl">
      <h2 className="text-3xl mt-2 font-semibold mb-2">All Users</h2>

      <div className="flex mt-5 justify-between items-center mb-3">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
          placeholder="Search users..."
          name="searchUser"
        />

        {canPermit(currentUserPermissions, "user", "canAdd") && (
          <Commanbutton
            label="Add User"
            icon={<MdAdd className="text-xl" />}
            onClick={() => {
              setUserToEdit(null);
              dispatch(setShowModal({ type: "add", value: true }));
            }}
          />
        )}

        <Commanbutton
          label="Add User"
          icon={<MdAdd className="text-xl" />}
          onClick={() => {
            setUserToEdit(null);
            dispatch(setShowModal({ type: "add", value: true }));
          }}
        />
      </div>

      <table className="w-full bg-white rounded-xl shadow-2xl">
        <thead className="bg-amber-300">
          <tr>
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
                        onClick={() => {
                          setUserToEdit(u);
                          dispatch(setShowModal({ type: "edit", value: true }));
                        }}
                      />
                    )}

                    {canPermit(currentUserPermissions, "user", "canDelete") && (
                      <MdDeleteOutline
                        className="cursor-pointer text-2xl"
                        onClick={() => {
                          setUserToDelete(u);
                          dispatch(
                            setShowModal({ type: "delete", value: true }),
                          );
                        }}
                      />
                    )}
                  </td>
                )}

                <MdOutlineEdit
                  className="cursor-pointer text-2xl"
                  onClick={() => {
                    setUserToEdit(u);
                    dispatch(setShowModal({ type: "edit", value: true }));
                  }}
                />
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
        isOpen={showModal.delete}
        onClose={() => {
          setUserToDelete(null);
          dispatch(setShowModal({ type: "delete", value: false }));
        }}
        collectionName="Users"
        item={userToDelete ? { id: userToDelete.uid } : null}
      />

      <UserModal
        isOpen={showModal.add || showModal.edit}
        // isOpen={true}
        onClose={() => {
          dispatch(setShowModal({ type: "add", value: false }));
          dispatch(setShowModal({ type: "edit", value: false }));
          setUserToEdit(null);
        }}
        user={userToEdit}
      />
    </div>
  );
}
