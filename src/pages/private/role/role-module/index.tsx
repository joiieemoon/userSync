import React, { useEffect, useState } from "react";
import { MdAdd, MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { canPermit } from "../../../../services/can-permission/index.ts";

import SearchBar from "../../../../components/common/search-bar/index.tsx";
import Commanbutton from "../../../../components/common/button/index.tsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "flowbite-react/components/Spinner";
import DeleteItemModal from "../../../../components/common/common-delete-modal/index.tsx";
import { usePagination } from "../../../../hooks/use-pagination/index.ts";
import { PaginationMain } from "../../../../components/common/pagination/index.tsx";
import type { RootState } from "../../../../redux/store/index.ts";
import {
  setSortOrder,
  setLoading,
  setShowModal,
} from "../../../../redux/slice/ui-slice";
import { roleService } from "../../../../services/rest-api-services/role-services/index.ts";
import { usersService } from "../../../../services/rest-api-services/user-services/index.ts";
import { UsersSkeleton } from "../../../../components/feature/role-management/edit-role/index.tsx";
import useDebounce from "../../../../hooks/use-debouce/index.tsx";
const RoleModule = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [roleToDelete, setRoleToDelete] = useState<any | null>(null);
  const [searchTerm, setsearchTerm] = useState();
  const [fetch, setfetch] = useState(false);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const debouncedSearchTerm = useDebounce(searchTerm || "", 500);
  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length > 2) {
      console.log("this is debouced search", debouncedSearchTerm);
      setsearchTerm(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  const currentUserPermissions = useSelector(
    (state: RootState) => state.userPermissions.permissions,
  );
  const { sortOrder, loading, showModal } = useSelector(
    (state: RootState) => state.ui.users,
  );

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setfetch(false);
        dispatch(setLoading(true));
        const roleList = await roleService.getAll();

        setRoles(roleList);
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
        setfetch(true);
      }
    };

    fetchRoles();
  }, []);

  const {
    currentData: currentRoles,
    currentPage,
    totalPages,
    goToPage,
  } = usePagination({
    data: roles,
    itemsPerPage: 10,
    searchTerm: debouncedSearchTerm,
    sortField: "roleName",
    sortOrder,
    filterFields: ["roleName"],
  });

  const toggleSortOrder = () => {
    dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"));
  };
  const removeRole = async (roleId: string, roleName: string) => {
    try {
      const usersSnap = await roleService.getUsersByRole(roleName);

      const updatePromises = usersSnap.map((userDoc) =>
        usersService.updateUser(userDoc.id, { role: "No Role" }),
      );

      await Promise.all(updatePromises);

      await roleService.delete(roleId);

      const updatedRoles = await roleService.getAll();
      setRoles(updatedRoles);
    } catch (error: any) {
      toast.error("Error deleting role: " + error.message);
    }
  };

  if (loading && !fetch)
    return (
      <div className="p-6 flex justify-center items-center h-screen">
        Loading...
        <Spinner color="success" />
      </div>
    );

  return (
    <div className="p-6 mt-10 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-semibold mb-4">Roles</h2>

      <div className="mb-3 flex justify-between items-center">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
        />
        <Commanbutton
          label="Add Role"
          icon={<MdAdd className="text-xl" />}
          onClick={() => navigation("/role/add")}
        />
        {canPermit(currentUserPermissions, "role", "canAdd") && (
          <Commanbutton
            label="Add Role"
            icon={<MdAdd className="text-xl" />}
            onClick={() => navigation("/role/add")}
          />
        )}
      </div>
      {fetch && (
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
                  <FaSortAlphaDown className="ml-1" />
                ) : (
                  <FaSortAlphaDownAlt className="ml-1" />
                )}
              </th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Permissions</th>
              <th className="p-3 text-left">Action</th>
              {(canPermit(currentUserPermissions, "role", "canEdit") ||
                canPermit(currentUserPermissions, "role", "canDelete")) && (
                <th className="p-3 text-left">Action</th>
              )}
            </tr>
          </thead>

          <tbody>
            {loading && !fetch ? (
              <UsersSkeleton />
            ) : currentRoles.length > 0 ? (
              currentRoles.map((role, index) => (
                <tr key={role.id} className="border-b">
                  <td className="p-2">{(currentPage - 1) * 5 + index + 1}</td>
                  <td className="p-2">{role.roleName}</td>
                  <td className="p-2">
                    {/* {role.createdAt ? role.createdAt.toLocaleDateString() : "-"} */}
                    {role.createdAt
                      ? new Date(role.createdAt).toLocaleString()
                      : "-"}
                  </td>
                  <td className="p-2">
                    {Object.values(role.permissions || {}).reduce(
                      (count: number, module: any) =>
                        count + Object.values(module).filter(Boolean).length,
                      0,
                    )}
                  </td>

                  <td>
                    <div className="flex">
                      <MdOutlineEdit
                        className="text-2xl cursor-pointer"
                        onClick={() => navigation(`/role/edit/${role.id}`)}
                      />
                      <MdDeleteOutline
                        className="text-2xl cursor-pointer"
                        onClick={() => {
                          setRoleToDelete(role);
                          dispatch(
                            setShowModal({ type: "delete", value: true }),
                          );
                        }}
                      />
                    </div>{" "}
                  </td>
                  {(canPermit(currentUserPermissions, "role", "canEdit") ||
                    canPermit(currentUserPermissions, "role", "canDelete")) && (
                    <td className="p-2 flex gap-2">
                      {canPermit(currentUserPermissions, "role", "canEdit") && (
                        <MdOutlineEdit
                          className="text-2xl cursor-pointer"
                          onClick={() => navigation(`/role/edit/${role.id}`)}
                        />
                      )}

                      {canPermit(
                        currentUserPermissions,
                        "role",
                        "canDelete",
                      ) && (
                        <MdDeleteOutline
                          className="text-2xl cursor-pointer"
                          onClick={() => {
                            setRoleToDelete(role);
                            dispatch(
                              setShowModal({ type: "delete", value: true }),
                            );
                          }}
                        />
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500">
                  No roles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

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
          setRoleToDelete(null);
          dispatch(setShowModal({ type: "delete", value: false }));
        }}
        onDelete={async () => {
          if (roleToDelete) {
            await removeRole(roleToDelete.id, roleToDelete.roleName);
            dispatch(setShowModal({ type: "delete", value: false }));
          }
        }}
        collectionName="roles"
        item={roleToDelete ? { id: roleToDelete.id } : null}
      />
    </div>
  );
};

export default RoleModule;
