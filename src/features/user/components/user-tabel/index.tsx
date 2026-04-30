import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

import Badge from "../../../../components/ui/badge/Badge";
import {
  DeleteIcon,
  EditIcon,
  PencilIcon,
  PlugInIcon,
  PlusIcon,
} from "../../../../assets/icons";

import Pagination from "../../../../components/common/pagination";
import { useDeleteUser } from "../../hooks/uselistusers-api";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { DeleteModal } from "../../../../components/common/delete-modal";
import Button from "../../../../components/ui/button/Button";
import AddEditUserModal from "../add-edit-modal";
import SearchBar from "../../../../components/ui/search";
import { useDebounce } from "../../../../hooks/usedebounce";
import { useAuth } from "../../../auth/hooks/useAuth";
import { User } from "../../types";


import { useUserTable } from "../../hooks/useuser-tabel";

const tableHeaders = [
  "User Details",

  "Email",
  "Role",
  "Status",
  "Created At",
  "Updated At",
  "Action",
];
export default function UserTabel() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const [limit, setLimit] = useState(5);

  const { data, isLoading, filteredUsers, access, isSearching } = useUserTable(
    user,
    search,
    page,
    limit,
  );

  const [currentid, setcurrentid] = useState<number | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [iseditOpen, setiseditOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 700);

  const pageSize = limit;

  // const filteredUserssuper = data?.users?.filter((u) => u.roleId !== 1);

  const paginatedUsers = isSearching
    ? filteredUsers?.slice((page - 1) * limit, page * limit)
    : filteredUsers;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);
  const handleAdd = () => {
    setSelectedId(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const { mutate: deleteuser, isPending } = useDeleteUser();
  const loginuser = user?.id;
  const {
    delete: canDeleteUser,
    edit: canEditUser,
    add: canAddUser,
  } = access?.users || {};
  const filteredHeaders = tableHeaders.filter((header) => {
    if (header === "Action") {
      return canEditUser || canDeleteUser;
    }
    return true;
  });

 
  return (
    <>
      <div className="flex justify-between  ">
        <SearchBar value={search} onChange={setSearch} />

        {canAddUser && (
          <div className="flex justify-center items-center mt-2">
            <Button size="sm" onClick={handleAdd} className="h-8 ">
              {" "}
              <PlusIcon /> Add User
            </Button>
          </div>
        )}
      </div>

      <div className=" rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] max-h-[500px] overflow-y-auto">
        <div className="max-w-full overflow-x-auto">
          <div className="flex justify-end mb-4 "></div>
          <Table>
            {/* Table Header */}

            {/* <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] sticky top-0 border"> */}
            <TableHeader className="sticky top-0 z-20 bg-white dark:bg-white/[0.03] border-b border-gray-100 dark:border-white/[0.05]">
              {/* <TableHeader className="sticky fixed top-0 z-20 bg-white dark:bg-white/[0.03] border-b border-gray-100 dark:border-white/[0.05]"> */}
              {/* <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] sticky top-0 border"> */}
              <TableRow>
                {filteredHeaders.map((header, index) => (
                  <TableCell
                    key={index}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 "
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            {/* <div className="max-h-[500px] overflow-y-auto"></div> */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05] ">
              {paginatedUsers?.map((user: User) => (
                <TableRow key={user.id}>
                  {/* User Details */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {user.username}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Email */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.email}
                  </TableCell>

                  {/* Role */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2">{user.roleTitle}</div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={user.isActive ? "success" : "error"}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>

                  {/* Created At */}
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>

                  {/* Updated At */}
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>

                  {/* Action */}
                  {user.id !== loginuser &&
                    user.roleId !== 1 &&
                    (canEditUser || canDeleteUser) && (
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <div className="flex justify-evenly">
                          {canEditUser && (
                            <button
                              type="button"
                              onClick={() => {
                                setiseditOpen(true);
                                setcurrentid(user.id);
                                handleEdit(user.id);
                              }}
                              className="bg-transparent hover:bg-white shadow:none"
                            >
                              <PencilIcon className="text-xl cursor-pointer " />
                            </button>
                          )}

                          {canDeleteUser && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsOpen(true);
                                setcurrentid(user.id);
                              }}
                              className="bg-transparent hover:bg-white shadow:none"
                            >
                              <DeleteIcon className="text-xl cursor-pointer " />
                            </button>
                          )}
                        </div>
                      </TableCell>
                    )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isLoading ? (
            <>
              <Skeleton height={20} width={200} />
              <Skeleton count={5} />
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <Pagination
        page={page}
        totalPages={
          isSearching
            ? Math.ceil((filteredUsers?.length || 0) / limit)
            : data?.pagination?.totalPages
        }
        limit={limit}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
      <AddEditUserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedId(undefined);
        }}
        id={selectedId}
      />
      <DeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        loading={isPending}
        onConfirm={() => {
          if (!currentid) return;

          deleteuser(currentid, {
            onSuccess: () => {
              setIsOpen(false);
              setcurrentid(undefined);
            },
          });
        }}
      />
    </>
  );
}
