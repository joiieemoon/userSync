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
  PlusIcon,
} from "../../../../assets/icons";
import { toast } from "react-toastify";
import Pagination from "../../../../components/common/pagination";

import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DeleteModal } from "../../../../components/common/delete-modal";
import Button from "../../../../components/ui/button/Button";

import { usedeleteRoles, useListRoles } from "../../hooks";
import AddEditRoleModal from "../add-edit-role";
import SearchBar from "../../../../components/ui/search";

import { useSelector } from "react-redux";
import { useDebounce } from "../../../../hooks/usedebounce/index.tsx";

import { useAuth } from "../../../auth/hooks/useAuth/index.tsx";
import { getAccess } from "../../../../lib/helper/flate-permission/index.tsx";
const tableHeaders = [
  "id",
  "Role Name",
  "Status",
  "Created At",
  "Updated At",
  "Action",
];

export default function RoleTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { user } = useAuth();

  const [currentid, setcurrentid] = useState<number | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | undefined>();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  const searchText = useMemo(
    () => debouncedSearch.toLowerCase(),
    [debouncedSearch],
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { data, isLoading } = useListRoles({
    page,
    limit: limit,
    search: debouncedSearch,
  });
  const filteredRoles = data?.roles?.filter((role: any) =>
    role.title.toLowerCase().includes(searchText),
  );

  const { mutate: deleteuser, isPending } = usedeleteRoles();

  const pageSize = 5;
  const { permissions } = useSelector((state: RootState) => state.permissions);
  const access = getAccess(permissions || []);

  const canAddRole = access?.role?.add;
  const canEditRole = access?.role?.edit;
  const canDeleteRole = access?.role?.delete;

  const paginatedRoles = debouncedSearch
    ? filteredRoles.slice((page - 1) * pageSize, page * pageSize)
    : filteredRoles;

  const filteredHeaders = tableHeaders.filter((header) => {
    if (header === "Action") {
      return canEditRole || canDeleteRole;
    }
    return true;
  });
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);
  return (
    <>
      <div className="flex justify-between mb-2 p-0">
        <SearchBar value={search} onChange={setSearch} />

        {canAddRole && (
          <div className="flex justify-center items-center mt-2">
            <Button
              size="sm"
              onClick={() => {
                setSelectedId(undefined);
                setIsModalOpen(true);
              }}
            >
              <PlusIcon />
              Add Role
            </Button>
          </div>
        )}
      </div>
      <div className="flex justify-end "></div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}

            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {filteredHeaders.map((header, index) => (
                  <TableCell
                    key={index}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {/* {data?.roles?.map((roles: any) => ( */}
              {paginatedRoles?.map((roles: any) => (
                <TableRow key={roles.id}>
                  {/* User Details */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        {/* <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {roles.title}
                        </span> */}
                        <span className="block font-bold text-gray-500 text-theme-xs dark:text-gray-400">
                          {roles.id}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3   text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2  text-gray-800  ">
                      {roles.title}{" "}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={roles.status === "active" ? "success" : "error"}
                    >
                      {/* {roles.status ? "Active" : "Inactive"}  */}
                      {roles.status}
                    </Badge>
                  </TableCell>

                  {/* Created At */}
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {new Date(roles.createdAt).toLocaleString()}
                  </TableCell>

                  {/* Updated At */}
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {new Date(roles.createdAt).toLocaleString()}
                  </TableCell>

                  {/* Action */}

                  {roles.id !== 1 && (canEditRole || canDeleteRole) && (
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 ">
                      <div className="flex justify-evenly">
                        {canEditRole && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedId(roles.id);
                              setIsModalOpen(true);
                            }}
                            className="bg-transparent hover:bg-white shadow:none"
                          >
                            {" "}
                            <PencilIcon className="text-xl cursor-pointer text-gray-500 font-2xl" />
                          </button>
                        )}
                        {canDeleteRole && (
                          <button
                            type="button"
                            onClick={() => {
                              setIsDeleteOpen(true);
                              setcurrentid(roles.id);
                            }}
                            className="bg-transparent hover:bg-white shadow:none"
                          >
                            <DeleteIcon className="text-xl cursor-pointer text-gray-500" />
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
        page={data?.pagination?.page}
        totalPages={data?.pagination?.totalPages}
        limit={limit}
        onPageChange={(newPage) => setPage(newPage)}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />

      <AddEditRoleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedId(undefined);
        }}
        id={selectedId}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        loading={isPending}
        onConfirm={() => {
          if (!currentid) return;

          deleteuser(currentid, {
            onSuccess: () => {
              setIsDeleteOpen(false);
              setcurrentid(undefined);
            },
            onError: (error: any) => {
              const message = error?.response?.data?.message || "Delete failed";
              toast.error(message);
            },
          });
        }}
      />
    </>
  );
}
